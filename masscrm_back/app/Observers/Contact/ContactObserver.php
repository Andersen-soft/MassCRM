<?php

declare(strict_types=1);

namespace App\Observers\Contact;

use App\Models\ActivityLog\AbstractActivityLog;
use App\Models\ActivityLog\ActivityLogContact;
use App\Models\Contact\Contact;
use App\Repositories\Company\CompanyRepository;
use App\Services\ActivityLog\ActivityLog;

class ContactObserver
{
    use ActivityLog;

    private CompanyRepository $companyRepository;
    private $activeLogClass = ActivityLogContact::class;

    private static array $ignoreFieldLog = [
        Contact::USER_ID_FIELD,
        Contact::CREATED_AT_FIELD,
        Contact::UPDATED_AT_FIELD,
        Contact::EMAIL_COLLECTION_FIELD,
        Contact::PHONE_COLLECTION_FIELD,
        Contact::SOCIAL_NETWORK_COLLECTION_FIELD,
        Contact::COLLEAGUE_COLLECTION_FIELD,
        Contact::SEQUENCE_COLLECTION_FIELD,
        Contact::MAIL_COLLECTION_FIELD,
        Contact::NOTE_COLLECTION_FIELD,
        Contact::SALE_COLLECTION_FIELD,
        Contact::IN_BLACKLIST_FIELD,
        Contact::IS_UPLOAD_COLLECTION_FIELD
    ];

    public function __construct(CompanyRepository $companyRepository)
    {
        $this->companyRepository = $companyRepository;
    }

    public function created(Contact $contact): void
    {
        ($this->createLog(
            $contact,
            AbstractActivityLog::CREATED_BASE_MODEL_EVENT,
            AbstractActivityLog::ID_FIELD,
            $this->baseContactData($contact),
        ))->save();
    }

    public function deleted(Contact $contact): void
    {
        ($this->createLog(
            $contact,
            AbstractActivityLog::DELETED_BASE_MODEL_EVENT,
            AbstractActivityLog::ID_FIELD,
            null,
            $this->baseContactData($contact)
        ))->save();
    }

    protected function baseContactData(Contact $contact): string
    {
        return $contact->getFullName() ?? ($contact->getFirstName() . ' ' . $contact->getLastName());
    }

    public function updated(Contact $contact): void
    {
        $activityLogs = [];
        foreach ($contact->getChanges() as $key => $value) {
            if ($this->isIgnoreField($key)) {
                continue;
            }

            $dataOld = $this->prepareData($contact, $key);
            if ($key === 'company_id') {
                $dataOld = !empty($contact->getOriginal($key))
                    ? $this->encodeCompanyLogData($contact->getOriginal($key))
                    : null;
                $value = !empty($value)
                    ? $this->encodeCompanyLogData($value)
                    : null;
            }

            $activityType = $this->getActivityType($contact, $key);
            $activityLogs[] = $this->prepareToUpdateEvent(
                self::createLog($contact, $activityType, $key, (string)$value, $dataOld),
                json_encode(static::prepareModelForLog($contact))
            );
        }
        $this->saveMany($activityLogs);
    }

    private function encodeCompanyLogData($companyId): ?string
    {
        $company = $this->companyRepository->getCompanyById($companyId);

        if (!$company) {
            return null;
        }

        return json_encode([
            'id' => $company->id,
            'name' => str_replace("'", "''", $company->name)
        ]);
    }
}
