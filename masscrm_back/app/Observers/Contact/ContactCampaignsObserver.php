<?php declare(strict_types=1);

namespace App\Observers\Contact;

use App\Models\ActivityLog\ActivityLogContact;
use App\Models\Contact\ContactCampaigns;
use App\Repositories\CampaignStatus\CampaignStatusRepository;
use App\Services\ActivityLog\ActivityLog;

class ContactCampaignsObserver
{
    use ActivityLog;

    private $activeLogClass = ActivityLogContact::class;

    private static array $ignoreFieldLog = [ContactCampaigns::SEQUENCE_FIELD, ContactCampaigns::STATUS_ID_FIELD];
    private CampaignStatusRepository $campaignStatusRepository;

    public function __construct(CampaignStatusRepository $campaignStatusRepository)
    {
        $this->campaignStatusRepository = $campaignStatusRepository;
    }

    public function created(ContactCampaigns $contactCampaigns): void
    {
        $this->createEvent($contactCampaigns, ContactCampaigns::SEQUENCE_FIELD);
    }

    public function updated(ContactCampaigns $contactCampaigns): void
    {
        $activityLogs = [];
        foreach ($contactCampaigns->getChanges() as $key => $value) {
            if ($this->isIgnoreField($key)) {
                continue;
            }

            $modelField = $key;
            $dateNew = (string)$contactCampaigns->{$key};
            $dataOld = (string)$contactCampaigns->getOriginal($key);
            if ($key === ContactCampaigns::STATUS_ID_FIELD) {
                $campaignStatus = $this->campaignStatusRepository->getCampaignStatusFromId(
                    $contactCampaigns->getOriginal(ContactCampaigns::STATUS_ID_FIELD)
                );
                $modelField = ContactCampaigns::STATUS_ID_FIELD;
                $dateNew = $contactCampaigns->status->getName();
                $dataOld = $campaignStatus ? $campaignStatus->getName() : null;
            }

            $log = self::createLog($contactCampaigns, ActivityLogContact::ADDED_NEW_VALUE_FIELD_EVENT, $modelField, $dateNew, $dataOld);
            $log->setAdditionalInfoForData($contactCampaigns->getSequence());
            $activityLogs[] = $this->prepareToUpdateEvent(
                $log,
                json_encode(static::prepareModelForLog($contactCampaigns))
            );
        }
        $this->saveMany($activityLogs);
    }

    public function deleted(ContactCampaigns $contactCampaigns): void
    {
        $this->deleteEvent($contactCampaigns, ContactCampaigns::SEQUENCE_FIELD);
    }
}
