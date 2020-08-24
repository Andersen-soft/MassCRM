<?php

namespace App\Observers\Contact;

use App\Models\ActivityLog\ActivityLogContact;
use App\Models\Contact\Contact;
use App\Models\Contact\ContactCampaigns;
use App\Repositories\CampaignStatus\CampaignStatusRepository;
use ReflectionClass;

class ContactCampaignsObserver
{
    private const NAME_FIELDS = [ContactCampaigns::SEQUENCE_FIELD, ContactCampaigns::STATUS_ID_FIELD];
    private CampaignStatusRepository $campaignStatusRepository;

    public function __construct(CampaignStatusRepository $campaignStatusRepository)
    {
        $this->campaignStatusRepository = $campaignStatusRepository;
    }

    public function created(ContactCampaigns $contactCampaigns): void
    {
        /** @var Contact $contact */
        $contact = $contactCampaigns->contact;

        if ($contact->getUpdatedAt()->diffInSeconds($contact->getCreatedAt()) < 5) {
            return;
        }

        foreach(self::NAME_FIELDS as $key => $item) {
            if ($key === ContactCampaigns::STATUS_ID_FIELD) {
                (new ActivityLogContact())
                    ->setUserId($contact->getUserId())
                    ->setActivityType(ActivityLogContact::ADDED_NEW_VALUE_FIELD_EVENT)
                    ->setContactId($contact->getId())
                    ->setModelName((new ReflectionClass($contactCampaigns))->getShortName())
                    ->setModelField(ContactCampaigns::SEQUENCE_FIELD)
                    ->setDataNew($contactCampaigns->status->getName())
                    ->setLogInfo($contactCampaigns->toJson())
                    ->setAdditionalInfoForData($contactCampaigns->getSequence())
                    ->save();
            }

            (new ActivityLogContact())
                ->setUserId($contact->getUserId())
                ->setActivityType(ActivityLogContact::ADDED_NEW_VALUE_FIELD_EVENT)
                ->setContactId($contact->getId())
                ->setModelName((new ReflectionClass($contactCampaigns))->getShortName())
                ->setModelField($key)
                ->setDataNew($contactCampaigns->{$key})
                ->setLogInfo($contactCampaigns->toJson())
                ->save();
        }
    }

    public function updated(ContactCampaigns $contactCampaigns): void
    {
        /** @var Contact $contact */
        $contact = $contactCampaigns->contact;

        foreach ($contactCampaigns->getChanges() as $key => $value) {
            if (!in_array($key, self::NAME_FIELDS, true)) {
                continue;
            }
            if ($key === ContactCampaigns::STATUS_ID_FIELD) {
                $campaignStatus = $this->campaignStatusRepository->getCampaignStatusFromId(
                    $contactCampaigns->getOriginal(ContactCampaigns::STATUS_ID_FIELD)
                );

                (new ActivityLogContact())
                    ->setUserId($contact->getUserId())
                    ->setActivityType(ActivityLogContact::UPDATE_VALUE_FIELD_EVENT)
                    ->setContactId($contact->getId())
                    ->setModelName((new ReflectionClass($contactCampaigns))->getShortName())
                    ->setModelField(ContactCampaigns::STATUS_ID_FIELD)
                    ->setDataNew($contactCampaigns->status->getName())
                    ->setDataOld($campaignStatus ? $campaignStatus->getName () : null)
                    ->setLogInfo($contactCampaigns->toJson())
                    ->setAdditionalInfoForData($contactCampaigns->getSequence())
                    ->save();
            } else {
                (new ActivityLogContact())
                    ->setUserId($contact->getUserId())
                    ->setActivityType(ActivityLogContact::UPDATE_VALUE_FIELD_EVENT)
                    ->setContactId($contact->getId())
                    ->setModelName((new ReflectionClass($contactCampaigns))->getShortName())
                    ->setModelField($key)
                    ->setDataNew($contactCampaigns->{$key})
                    ->setDataOld($contactCampaigns->getOriginal($key))
                    ->setLogInfo($contactCampaigns->toJson())
                    ->setAdditionalInfoForData($contactCampaigns->getSequence())
                    ->save();
            }
        }
    }

    public function deleting(ContactCampaigns $contactCampaigns): void
    {
        /** @var Contact $contact */
        $contact = $contactCampaigns->contact;

        (new ActivityLogContact())
            ->setUserId($contact->getUserId())
            ->setActivityType(ActivityLogContact::DELETE_VALUE_FIELD_EVENT)
            ->setContactId($contact->getId())
            ->setModelName((new ReflectionClass($contactCampaigns))->getShortName())
            ->setModelField(ContactCampaigns::SEQUENCE_FIELD)
            ->setDataOld($contactCampaigns->getOriginal(ContactCampaigns::SEQUENCE_FIELD))
            ->setLogInfo($contactCampaigns->toJson())
            ->save();
    }
}