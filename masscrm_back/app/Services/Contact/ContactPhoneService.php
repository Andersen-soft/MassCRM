<?php

namespace App\Services\Contact;

use App\Models\Contact\Contact;
use App\Models\Contact\ContactPhones;
use App\Services\TransferCollection\TransferCollectionContactService;

class ContactPhoneService
{
    private TransferCollectionContactService $transferCollectionContactService;

    public function __construct(TransferCollectionContactService $transferCollectionContactService)
    {
        $this->transferCollectionContactService = $transferCollectionContactService;
    }

    public function updatePhones(Contact $contact, ?array $phones): void
    {
        if (!isset($phones)) {
            return;
        }

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

        $contact->phone_collection = $this->transferCollectionContactService->getPhones($contact);
        $contact->save();
    }
}
