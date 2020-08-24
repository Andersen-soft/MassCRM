<?php

namespace App\Observers\Contact;

use App\Models\Contact\Contact;
use App\Models\Contact\ContactSocialNetworks;
use App\Models\ActivityLog\ActivityLogContact;
use ReflectionClass;

class ContactSocialNetworksObserver
{
    private const FIELD_LINK = 'link';
    private const NAME_FIELDS = [self::FIELD_LINK];

    public function created(ContactSocialNetworks $contactSocialNetworks): void
    {
        /** @var Contact $contact */
        $contact = $contactSocialNetworks->contact;

        if ($contact->getUpdatedAt()->diffInSeconds($contact->getCreatedAt()) < 5) {
            return;
        }

        foreach(self::NAME_FIELDS as $item) {
            (new ActivityLogContact())
                ->setUserId($contact->getUserId())
                ->setActivityType(ActivityLogContact::ADDED_NEW_VALUE_FIELD_EVENT)
                ->setContactId($contact->getId())
                ->setModelName((new ReflectionClass($contactSocialNetworks))->getShortName())
                ->setModelField($item)
                ->setDataNew($contactSocialNetworks->{$item})
                ->setLogInfo($contactSocialNetworks->toJson())
                ->save();
        }
    }

    public function updated(ContactSocialNetworks $contactSocialNetworks): void
    {
        /** @var Contact $contact */
        $contact = $contactSocialNetworks->contact;

        foreach ($contactSocialNetworks->getChanges() as $key => $value) {
            if (in_array($key, self::NAME_FIELDS, true)) {
                (new ActivityLogContact())
                    ->setUserId($contact->getUserId())
                    ->setActivityType(ActivityLogContact::UPDATE_VALUE_FIELD_EVENT)
                    ->setContactId($contact->getId())
                    ->setModelName((new ReflectionClass($contactSocialNetworks))->getShortName())
                    ->setModelField($key)
                    ->setDataNew($contactSocialNetworks->{$key})
                    ->setDataOld($contactSocialNetworks->getOriginal($key))
                    ->setLogInfo($contactSocialNetworks->toJson())
                    ->save();
            }
        }
    }

    public function deleting(ContactSocialNetworks $contactSocialNetworks): void
    {
        /** @var Contact $contact */
        $contact = $contactSocialNetworks->contact;

        (new ActivityLogContact())
            ->setUserId($contact->getUserId())
            ->setActivityType(ActivityLogContact::DELETE_VALUE_FIELD_EVENT)
            ->setContactId($contact->getId())
            ->setModelName((new ReflectionClass($contactSocialNetworks))->getShortName())
            ->setModelField(self::FIELD_LINK)
            ->setDataOld($contactSocialNetworks->getOriginal(self::FIELD_LINK))
            ->setLogInfo($contactSocialNetworks->toJson())
            ->save();
    }
}