<?php declare(strict_types=1);

namespace App\Imports\Contact\Parsers\Import\Contact;

use App\Models\Company\Company;
use App\Models\Contact\Contact;
use App\Models\User\User;
use App\Repositories\Contact\ContactRepository;

class ImportContactService
{
    private ContactRepository $contactRepository;
    private ImportCampaign $parserImportCampaign;
    private ImportColleague $parserImportColleague;
    private ImportContact $parserImportContact;
    private ImportContactSocialNetwork $parserImportContactSocialNetwork;
    private ImportEmail $parserImportEmail;
    private ImportMail $parserImportMail;
    private ImportNote $parserImportNote;
    private ImportPhone $parserImportPhone;

    public function __construct(
        ContactRepository $contactRepository,
        ImportCampaign $parserImportCampaign,
        ImportColleague $parserImportColleague,
        ImportContact $parserImportContact,
        ImportContactSocialNetwork $parserImportContactSocialNetwork,
        ImportEmail $parserImportEmail,
        ImportMail $parserImportMail,
        ImportNote $parserImportNote,
        ImportPhone $parserImportPhone
    )
    {
        $this->contactRepository = $contactRepository;
        $this->parserImportCampaign = $parserImportCampaign;
        $this->parserImportColleague = $parserImportColleague;
        $this->parserImportContact = $parserImportContact;
        $this->parserImportContactSocialNetwork = $parserImportContactSocialNetwork;
        $this->parserImportEmail = $parserImportEmail;
        $this->parserImportMail = $parserImportMail;
        $this->parserImportNote = $parserImportNote;
        $this->parserImportPhone = $parserImportPhone;
    }

    public function replace(
        Contact $contact,
        array $row,
        User $user,
        int $responsible,
        ?Company $company,
        ?array $origin,
        ?string $comment
    ): Contact
    {
        $contact = $this->parserImportContact->replace($contact, $row, $user, $responsible, $company, $origin, $comment);
        $this->parserImportCampaign->replace($contact, $row);
        $this->parserImportColleague->replace($contact, $row);
        $this->parserImportContactSocialNetwork->replace($contact, $row);
        $this->parserImportEmail->replace($contact, $row);
        $this->parserImportMail->replace($contact, $row);
        $this->parserImportNote->replace($contact, $row);
        $this->parserImportPhone->replace($contact, $row);

        return $contact;
    }

    public function create(
        array $row,
        User $user,
        int $responsible,
        ?Company $company,
        ?array $origin,
        ?string $comment
    ): ?Contact
    {
        $contact = $this->parserImportContact->create($row, $user, $responsible, $company, $origin, $comment);
        if ($contact) {
            $this->parserImportCampaign->create($contact, $row);
            $this->parserImportColleague->create($contact, $row);
            $this->parserImportContactSocialNetwork->create($contact, $row);
            $this->parserImportEmail->create($contact, $row);
            $this->parserImportMail->create($contact, $row);
            $this->parserImportNote->create($contact, $row);
            $this->parserImportPhone->create($contact, $row);
        }

        return $contact;
    }

    public function merge(
        Contact $contact,
        array $row,
        User $user,
        int $responsible,
        ?Company $company,
        ?array $origin,
        ?string $comment
    ): Contact
    {
        if ($user->hasRole(User::USER_ROLE_NC2)) {
            $contact = $this->parserImportContact->replace($contact, $row, $user, $responsible, $company, $origin, $comment);
        } else {
            $contact = $this->parserImportContact->merge($contact, $row, $user, $responsible, $company, $origin, $comment);
        }

        $this->parserImportCampaign->merge($contact, $row);
        $this->parserImportColleague->merge($contact, $row);
        $this->parserImportContactSocialNetwork->merge($contact, $row);
        $this->parserImportEmail->merge($contact, $row);
        $this->parserImportMail->merge($contact, $row);
        $this->parserImportNote->merge($contact, $row);
        $this->parserImportPhone->merge($contact, $row);

        return $contact;
    }

    public function getUnique(array $fields, array $row): ?Contact
    {
        $emails = [];
        $linkedIn = null;
        foreach ($fields as $key => $field) {
            switch ($field) {
                case 'c_linkedin':
                    $linkedIn = $row['contact']['linkedin'];
                    break;
                case 'email':
                    $emails = $row['contactEmail']['email'];
                    break;
                default:
                    break;
            }
        }

        if (!empty($emails) || $linkedIn) {
            $contact = $this->contactRepository->checkUniqueContact($emails, $linkedIn);
            $this->checkExistingFirstAndLastName($contact, $row);

            return $contact;
        }

        return null;
    }

    public function checkExistingFirstAndLastName(?Contact $contact, array $row): void
    {
        if ($contact){
            if ($contact->first_name === null && array_key_exists('first_name', $row['contact'])) {
                $contact->setFirstName($row['contact']['first_name']);
            }
            if ($contact->last_name === null && array_key_exists('last_name', $row['contact'])) {
                $contact->setLastName($row['contact']['last_name']);
            }
        }
    }
}
