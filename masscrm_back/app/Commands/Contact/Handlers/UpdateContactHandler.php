<?php

namespace App\Commands\Contact\Handlers;

use App\Commands\Contact\UpdateContactCommand;
use App\Exceptions\Custom\NotFoundException;
use App\Exceptions\Validation\ValidationRequestException;
use App\Http\Transformers\Contact\ContactTransform;
use App\Models\Company\Company;
use App\Models\Contact\Contact;
use App\Models\Contact\ContactColleagues;
use App\Models\Contact\ContactEmails;
use App\Models\Contact\ContactPhones;
use App\Models\Contact\ContactSocialNetworks;
use App\Exceptions\Permission\DeniedExecuteException;
use App\Models\User\User;
use Carbon\Carbon;
use App\Repositories\Contact\{
    ContactEmailsRepository,
    ContactRepository,
    ContactSocialNetworksRepository,
    ContactColleaguesRepository
};
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Lang;

class UpdateContactHandler
{
    protected ContactEmailsRepository $contactEmailRepository;
    protected ContactSocialNetworksRepository $contactSocialNetworksRepository;
    private ContactRepository $contactRepository;
    private ContactColleaguesRepository $contactColleaguesRepository;

    public function __construct(
        ContactEmailsRepository $contactEmailRepository,
        ContactSocialNetworksRepository $contactSocialNetworksRepository,
        ContactRepository $contactRepository,
        ContactColleaguesRepository $contactColleaguesRepository
    ) {
        $this->contactEmailRepository = $contactEmailRepository;
        $this->contactSocialNetworksRepository = $contactSocialNetworksRepository;
        $this->contactRepository = $contactRepository;
        $this->contactColleaguesRepository = $contactColleaguesRepository;
    }

    public function handle(UpdateContactCommand $command)
    {
        $contact = Contact::find($command->getContactId());
        if (!$contact instanceof Contact) {
            throw new NotFoundException('Contact value(' . $command->getContactId() . ') not found');
        }

        if (!$command->getUser()->hasRole(User::USER_ROLE_MANAGER)
            && $contact->getUserId() !== $command->getUser()->getId()
        ) {
            throw (new DeniedExecuteException('Permission denied', JsonResponse::HTTP_FORBIDDEN))
                ->setData($contact)
                ->setModelTransform(new ContactTransform());
        }

        $contact->user()->associate($command->getUser());
        $contactFields = $command->getContactFields();
        $company = Company::find($command->getCompanyId());
        if ($command->getCompanyId()) {
            if (!$company instanceof Company) {
                throw new NotFoundException('Company value(' . $command->getCompanyId() . ') not found');
            }
            $contactFields['company_id'] = $command->getCompanyId();
        }
        $this->updateEmails($contact, $command->getEmails(), $command->isRequiresValidation());
        $this->updatePhones($contact, $command->getPhones());
        $this->updateSocialNetworks($contact, $command->getSocialNetworks());
        $contact->setUpdatedAt(Carbon::now());
        $contact->update($contactFields);
        $this->updateColleagues($contact, $command->getColleagues());

        return $contact;
    }

    public function updateSocialNetworks(Contact $contact, array $socialNetworks): Contact
    {
        $contactSocial = $contact->contactSocialNetworks()->pluck('link', 'id')->toArray();
        foreach ($socialNetworks as $key => $socialNetwork) {
            $pos = array_search($socialNetwork, $contactSocial);
            if ($pos !== false) {
                unset($contactSocial[$pos]);
                continue;
            }
            if ($this->contactSocialNetworksRepository->checkUniqueness($socialNetwork)) {
                throw new ValidationRequestException([
                    'social_networks.' . $key => 'The ' . $socialNetwork . ' has already been taken.'
                ]);
            }
            (new ContactSocialNetworks(['contact_id' => $contact->getId()]))
                ->setLink(strtolower($socialNetwork))
                ->save();
        }
        if (!empty($contactSocial)) {
            ContactSocialNetworks::destroy(array_keys($contactSocial));
        }

        return $contact;
    }

    public function updateEmails(Contact $contact, array $emails, bool $verification = null): Contact
    {
        if (empty($emails)) {
            return $contact;
        }

        $contactEmails = $contact->contactEmails()->pluck('email', 'id')->toArray();
        foreach ($emails as $key => $email) {
            $pos = array_search($email, $contactEmails);
            if ($pos !== false) {
                unset($contactEmails[$pos]);
                continue;
            }
            if ($this->contactEmailRepository->checkUniqueness($email)) {
                throw new ValidationRequestException([
                    'emails.' . $key => 'The ' . $email . ' has already been taken.'
                ]);
            }
            (new ContactEmails(['contact_id' => $contact->getId()]))
                ->setEmail(strtolower($email))
                ->save();
        }

        if (!empty($contactEmails)) {
            ContactEmails::destroy(array_keys($contactEmails));
        }

        return $contact;
    }

    public function updatePhones(Contact $contact, array $phones): Contact
    {
        $contactPhones = $contact->contactPhones()->pluck('phone', 'id')->toArray();
        foreach ($phones as $key => $phone) {
            $pos = array_search($phone, $contactPhones, true);
            if ($pos !== false) {
                unset($contactPhones[$pos]);
                continue;
            }
            (new ContactPhones(['contact_id' => $contact->getId()]))
                ->setPhone($phone)
                ->save();
        }

        if (!empty($contactPhones)) {
            ContactPhones::destroy(array_keys($contactPhones));
        }

        return $contact;
    }

    public function updateColleagues(Contact $contact, array $colleagues): void
    {
        $contactColleagues = $contact->contactColleagues()->pluck('link', 'id')->toArray();
        foreach ($colleagues as $key => $colleague) {
            if ($this->contactColleaguesRepository->checkUniqueness($colleague)) {
                throw new ValidationRequestException([
                    'colleagues.' . $key . 'link' => Lang::get('validation.colleague_link_already_exist')
                ]);
            }

            $contactColleague = new ContactColleagues(['contact_id' => $contact->getId()]);
            if (isset($colleague['id'])) {
                $contactColleague = ContactColleagues::find($colleague['id']);
                unset($contactColleagues[$colleague['id']]);
            }

            $contactLink = $this->contactRepository->getContactFromLinkLinkedIn($colleague['link']);
            $contactColleague->setFullName($colleague['full_name']);
            if ($contactLink) {
                $contactColleague->contractRelation()->associate($contactLink);
                $contactColleague->setLink(null);
            } else {
                $contactColleague->setLink($colleague['link']);
            }

            $contactColleague->save();
        }

        if (!empty($contactColleagues)) {
            ContactColleagues::destroy(array_keys($contactColleagues));
        }
    }
}
