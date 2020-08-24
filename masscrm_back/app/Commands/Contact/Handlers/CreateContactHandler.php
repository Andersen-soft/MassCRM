<?php

namespace App\Commands\Contact\Handlers;

use App\Commands\Contact\CreateContactCommand;
use App\Models\Company\Company;
use App\Repositories\Contact\ContactRepository;
use App\Models\Contact\{
    Contact,
    ContactColleagues,
    ContactEmails,
    ContactPhones,
    ContactSocialNetworks
};

class CreateContactHandler
{
    private ContactRepository $contactRepository;

    public function __construct(ContactRepository $contactRepository)
    {
        $this->contactRepository = $contactRepository;
    }

    public function handle(CreateContactCommand $command): Contact
    {
        $contact = $this->createContact($command->getContactFields());
        $contact->user()->associate($command->getUser());
        $this->addCompany($contact, $command->getCompanyId());
        $contact->save();

        $this->addColleagues($contact, $command->getColleagues());
        $this->addPhones($contact, $command->getPhones());
        $this->addEmails($contact, $command->getEmails(), $command->isRequiresValidation());
        $this->addSocialNetworks($contact, $command->getSocialNetworks());

        return $contact;
    }

    private function createContact(array $fields): Contact
    {
        $contact = new Contact();
        if (!empty($fields)) {
            foreach ($fields as $key => $value) {
                $contact->setValue($key, $value);
            }
        }

        return $contact;
    }

    private function addEmails(Contact $contact, array $emails, bool $verification): Contact
    {
        $emailsToSave = [];
        foreach ($emails as $key => $email) {
            $contactEmail = (new ContactEmails())
                ->setEmail(strtolower($email));
            if (!$key) {
                $contactEmail->setVerification($verification);
            }
            $emailsToSave[] = $contactEmail;
        }
        $contact->contactEmails()->saveMany($emailsToSave);

        return $contact;
    }

    private function addPhones(Contact $contact, array $phones): Contact
    {
        $phonesToSave = [];
        foreach ($phones as $key => $phone) {
            $phonesToSave[] = (new ContactPhones())->setPhone($phone);
        }

        $contact->contactPhones()->saveMany($phonesToSave);

        return $contact;
    }

    private function addSocialNetworks(Contact $contact, array $socialNetworks): Contact
    {
        if (empty($socialNetworks)) {
            return $contact;
        }

        $socialNetworksToSave = [];
        foreach ($socialNetworks as $social) {
            $socialNetworksToSave[] = (new ContactSocialNetworks())->setLink(strtolower($social));
        }
        $contact->contactSocialNetworks()->saveMany($socialNetworksToSave);

        return $contact;
    }

    private function addCompany(Contact $contact, int $companyId = null): Contact
    {
        if (!$companyId) {
            return $contact;
        }

        $company = Company::find($companyId);
        if ($company instanceof Company) {
            $contact->company()->associate($company);
        }

        return $contact;
    }

    private function addColleagues(Contact $contact, array $colleagues): void
    {
        if (empty($colleagues)) {
            return;
        }

        $colleaguesToSave = [];
        foreach ($colleagues as $key => $colleague) {
            $contactLink = $this->contactRepository->getContactFromLinkLinkedIn($colleague['link']);
            $newColleague = (new ContactColleagues())
                ->setFullName($colleague['full_name']);
                if ($contactLink) {
                    $newColleague->contractRelation()->associate($contactLink);
                } else {
                    $newColleague->setLink($colleague['link']);
                }
            $colleaguesToSave[] = $newColleague;
        }

        $contact->contactColleagues()->saveMany($colleaguesToSave);
    }
}
