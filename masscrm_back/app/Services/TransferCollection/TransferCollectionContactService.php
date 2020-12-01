<?php declare(strict_types=1);

namespace App\Services\TransferCollection;

use App\Models\Contact\ContactCampaigns;
use App\Models\Contact\ContactColleagues;
use App\Models\Contact\ContactEmails;
use App\Models\Contact\ContactMails;
use App\Models\Contact\ContactNotes;
use App\Models\Contact\ContactPhones;
use App\Models\Contact\ContactSale;
use App\Models\Contact\ContactSocialNetworks;
use App\Repositories\Contact\ContactRepository;
use App\Models\Contact\Contact;

class TransferCollectionContactService
{
    private ContactRepository $contactRepository;

    public function __construct(ContactRepository $contactRepository)
    {
        $this->contactRepository = $contactRepository;
    }

    public function transfer(): void
    {
        do {
            /** @var Contact $contact */
            $contact = $this->contactRepository->getContactForTransfer();
            if (null !== $contact) {
                $this->updateCollectionContact($contact);
            }
        } while ($contact);
    }

    public function getEmails(Contact $contact): array
    {
        $emails = [];

        if (empty($contact->contactEmails)) {
            return $emails;
        }

        /** @var ContactEmails $contactEmail */
        foreach ($contact->contactEmails as $contactEmail) {
            $emails[] = [
                'id' => $contactEmail->id,
                'email' => $contactEmail->email,
                'verification' => $contactEmail->verification,
            ];
        }

        return $emails;
    }

    public function getPhones(Contact $contact): array
    {
        $phones = [];

        if (empty($contact->contactPhones)) {
            return $phones;
        }

        /** @var ContactPhones $contactPhone */
        foreach ($contact->contactPhones as $contactPhone) {
            $phones[] = [
                'id' => $contactPhone->id,
                'phone' => $contactPhone->phone,
            ];
        }

        return $phones;
    }

    public function getSocialNetworks(Contact $contact): array
    {
        $socialNetworks = [];

        if (empty($contact->contactSocialNetworks)) {
            return $socialNetworks;
        }

        /** @var ContactSocialNetworks $contactSocialNetwork */
        foreach ($contact->contactSocialNetworks as $contactSocialNetwork) {
            $socialNetworks[] = [
                'id' => $contactSocialNetwork->id,
                'link' => $contactSocialNetwork->link,
            ];
        }

        return $socialNetworks;
    }

    public function getColleagues(Contact $contact): array
    {
        $colleague = [];

        if (empty($contact->contactColleagues)) {
            return $colleague;
        }

        /** @var ContactColleagues $contactColleague */
        foreach ($contact->contactColleagues as $contactColleague) {
            $colleague[] = [
                'id' => $contactColleague->id,
                'link' => $contactColleague->link,
                'contact_id_relation' => $contactColleague->contact_id_relation,
                'full_name' => $contactColleague->full_name
            ];
        }

        return $colleague;
    }

    public function getSequence(Contact $contact): array
    {
        $sequence = [];

        if (empty($contact->sequences)) {
            return $sequence;
        }

        /** @var ContactCampaigns $contactSequence */
        foreach ($contact->sequences as $contactSequence) {
            $sequence[] = [
                'id' => $contactSequence->id,
                'sequence' => $contactSequence->sequence,
                'status' => $contactSequence->status->name
            ];
        }

        return $sequence;
    }

    public function getMail(Contact $contact): array
    {
        $mail = [];

        if (empty($contact->mails)) {
            return $mail;
        }

        /** @var ContactMails $contactMail */
        foreach ($contact->mails as $contactMail) {
            $mail[] = [
                'id' => $contactMail->id,
                'message' => $contactMail->message,
            ];
        }

        return $mail;
    }

    public function getNote(Contact $contact): array
    {
        $note = [];

        if (empty($contact->notes)) {
            return $note;
        }

        /** @var ContactNotes $contactNote  */
        foreach ($contact->notes as $contactNote) {
            $note[] = [
                'id' => $contactNote->id,
                'message' => $contactNote->message,
            ];
        }

        return $note;
    }

    public function getSale(Contact $contact): array
    {
        $sale = [];

        if (empty($contact->sales)) {
            return $sale;
        }

        /** @var ContactSale $contactSale */
        foreach ($contact->sales as $contactSale) {
            $sale[] = [
                'id' => $contactSale->id,
                'link' => $contactSale->link,
                'status' => $contactSale->status->name,
                'source' => $contactSale->source->name,
                'project_c1' => $contactSale->project_c1,
                'create_at' => $contactSale->created_at,
            ];
        }

        return $sale;
    }

    public function updateCollectionContact(Contact $contact): void
    {
        $contact->phone_collection = $this->getPhones($contact);
        $contact->email_collection = $this->getEmails($contact);
        $contact->social_network_collection = $this->getSocialNetworks($contact);
        $contact->colleague_collection = $this->getColleagues($contact);
        $contact->sequence_collection = $this->getSequence($contact);
        $contact->mail_collection = $this->getMail($contact);
        $contact->note_collection = $this->getNote($contact);
        $contact->sale_collection = $this->getSale($contact);
        $contact->is_upload_collection = true;

        $contact->save();
    }
}
