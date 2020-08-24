<?php

namespace App\Services\Parsers\Import;

use App\Commands\Import\ImportContactsDto;
use App\Exceptions\Custom\ImportContactsException;
use App\Models\CampaignStatus;
use App\Models\Company\Company;
use App\Models\Contact\Contact;
use App\Models\Contact\ContactCampaigns;
use App\Models\Contact\ContactEmails;
use App\Models\User\User;
use App\Repositories\Contact\ContactRepository;
use App\Services\Location\LocationService;
use App\Services\Parsers\ParserMain;
use Illuminate\Support\Collection;

class ParserImportContactService extends ParserMain
{
    protected ContactRepository $contactRepository;
    protected LocationService $locationService;

    public function __construct(
        LocationService $locationService,
        ContactRepository $contactRepository
    ) {
        $this->locationService = $locationService;
        $this->contactRepository = $contactRepository;
    }

    public function create(
        array $arrayRow,
        User $user,
        ImportContactsDto $importContactsData,
        Company $company = null,
        int $id = null
    ): Contact {
        $params = [
            'origin' => $importContactsData->getCommand()->getOrigin(),
            'responsible' => $user->getFullNameAttribute()
        ];
        if ($id) {
            $params['id'] = $id;
        }
        $contact = new Contact($params);

        $contact->user()->associate($user);
        $fields = $importContactsData->getCommand()->getFields();
        $this->addMainFieldToContact($contact, $arrayRow, $fields);
        if ($company instanceof Company) {
            $contact->company()->associate($company);
        }
        $contact->save();
        $this->addComments($contact, $arrayRow, $fields, $importContactsData->getCommand()->getComment());
        $this->addAssociate($contact, $arrayRow, $fields);
        $this->addSequences($contact, $arrayRow, $fields);

        return $contact;
    }

    public function getUnique(array $fields, array $row): ?Contact
    {
        $emails = [];
        $linkedin = null;
        $socialNetwork = [];
        foreach ($fields as $key => $field) {
            switch ($field) {
                case 'email':
                    $emails[] = strtolower($row[$key]);
                    break;
                case 'c_linkedin':
                    $linkedin = strtolower($row[$key]);
                    break;
                case 'c_social':
                    $socialNetwork[] = strtolower($row[$key]);
                    break;
                default:
                    break;
            }
        }

        return $this->contactRepository->checkUniqueContact($emails, $linkedin, $socialNetwork);
    }

    private function addMainFieldToContact(Contact &$contact, array $arrayRow, array $fields): void
    {
        foreach ($fields as $key => $value) {
            if (!isset($arrayRow[$key]) || is_null($arrayRow[$key])) {
                continue;
            }
            if (
            in_array($value, [Contact::COUNTRY_FIELD, Contact::REGION_FIELD])
            ) {
                $value = $this->locationService->isLocation($value);
                if (!$value) {
                    throw new ImportContactsException('Invalid country or city');
                }
            }

            $contact->setValue($value !== '' ? $value : null, $arrayRow[$key]);
        }
    }

    private function addComments(Contact &$contact, array $arrayRow, array $fields, string $com = null): void
    {
        $comments = [];
        if ($com) {
            $comments[] = $com;
        }
        foreach ($fields as $key => $value) {
            if (
                $value !== 'c_comment'
                || !isset($arrayRow[$key])
                || is_null($arrayRow[$key])
            ) {
                continue;
            }
            $comments[] = $arrayRow[$key];
        }

        if (!empty($comments)) {
            $contact->setComment(implode(";\n", $comments))->save();
        }
    }

    private function addAssociate(Contact &$contact, array $arrayRow, array $fields): void
    {
        foreach ($fields as $key => $value) {
            if (!isset($arrayRow[$key]) || is_null($arrayRow[$key])) {
                continue;
            }

            $contact->createAssociate($value, $arrayRow[$key]);
        }
    }

    private function addSequences(Contact &$contact, array $arrayRow, array $fields): void
    {
        $sequenceIndex = array_search(ContactCampaigns::SEQUENCE_FIELD, $fields);
        $stateIndex = array_search(CampaignStatus::STATUS_FIELD, $fields);
        if (
            $stateIndex === false
            || $sequenceIndex === false
            || !isset($arrayRow[$sequenceIndex])
            || !isset($arrayRow[$stateIndex])
        ) {
            return;
        }
        $seq = $this->getSequences($arrayRow[$sequenceIndex], $arrayRow[$stateIndex]);
        if (!empty($seq)) {
            $contact->sequences()->saveMany($seq);
        }
    }

    public function replace(
        Contact $contact,
        User $user,
        ImportContactsDto $importContactsData,
        array $row,
        array $fields,
        Company $company = null
    ): void {
        $id = $contact->getId();
        $contactEmailsOld = $this->getContactEmails($fields, $row, $contact);
        $this->contactRepository->deleteById($id);
        $contact = $this->create($row, $user, $importContactsData, $company);
        if (empty($contactEmailsOld)) {
            return;
        }

        $this->mergeEmails($contact, $contactEmailsOld);
    }

    private function getContactEmails(array $fields, array $row, Contact $contact): Collection
    {
        $contactLink = $this->getValue($fields, $row, Contact::CONTACT_PREFIX . Contact::LINKEDIN_FIELD);
        $contactEmails = [];
        if (
            $contactLink !== ''
            && strtolower($contact->getLinkedin()) === strtolower($contactLink)
        ) {
            $contactEmails = clone $contact->contactEmails;
        }

        return $contactEmails;
    }

    private function mergeEmails(Contact $contact, Collection $contactEmailsOld): void
    {
        $newEmails = $contact->contactEmails()->pluck('email')->toArray();
        /** @var $email ContactEmails */
        foreach ($contactEmailsOld as $email) {
            if (in_array($email->getEmail(), $newEmails)) {
                continue;
            }
            $contact->contactEmails()->create([
                'email' => $email->getEmail(),
                'verification' => $email->isVerification()
            ]);
        }
    }

    public function merge(
        Contact $contact,
        array $row,
        array $fields,
        Company $company = null
    ): void {
        $contactEmailsOld = $this->getContactEmails($fields, $row, $contact);

        $this->addMainFieldToContact($contact, $row, $fields);
        if ($company instanceof Company && is_null($contact->getCompanyId())) {
            $contact->company()->associate($company);
        }

        $contactComment = $this->getValue($fields, $row, Contact::CONTACT_PREFIX . Contact::COMMENT_FIELD);
        if ($contact->getComment() !== $contactComment) {
            $this->addComments($contact, $row, $fields, $contact->getComment());
        }

        $this->mergeSequences($contact, $row, $fields);
        $this->mergePhone($contact, $row, $fields);
        $this->mergeEmails($contact, $contactEmailsOld);
    }

    private function mergeSequences(Contact $contact, array $row, array $fields): void
    {
        $ids = $contact->sequences()->pluck('id')->toArray();
        if (!empty($ids)) {
            ContactCampaigns::destroy($ids);
        }
        $this->addSequences($contact, $row, $fields);

        if (empty($contactEmailsOld)) {
            return;
        }
    }

    private function mergePhone(Contact $contact, array $row, array $fields): void
    {
        $phones = $contact->contactPhones()->pluck('phone')->toArray();
        $contactPhone = $this->getValue($fields, $row, 'phone');
        if ($contactPhone !== '' && !in_array($contactPhone, $phones)) {
            $contact->contactPhones()->create(['phone' => $contactPhone]);
        }
    }
}
