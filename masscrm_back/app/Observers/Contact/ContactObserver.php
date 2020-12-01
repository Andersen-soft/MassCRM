<?php

declare(strict_types=1);

namespace App\Observers\Contact;

use App\Models\Company\Company;
use App\Models\Contact\Contact;
use App\Models\ActivityLog\ActivityLogContact;
use App\Repositories\Company\CompanyRepository;
use Carbon\Carbon;
use ReflectionClass;

class ContactObserver
{
    private CompanyRepository $companyRepository;
    private const IGNORE_FIELDS_NAME = [
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

    public function updated(Contact $contact): void
    {
        foreach ($contact->getChanges() as $key => $value) {
            if (in_array($key, self::IGNORE_FIELDS_NAME, true)) {
                continue;
            }

            $activityType = $contact->getOriginal($key) === null
                ? ActivityLogContact::ADDED_NEW_VALUE_FIELD_EVENT
                : ActivityLogContact::UPDATE_VALUE_FIELD_EVENT;

            $dataOld = $contact->getOriginal($key) instanceof Carbon ?
                $contact->getOriginal($key)->format(Company::DATE_FORMAT) :
                $contact->getOriginal($key);

            if ($key === 'company_id') {
                $dataOld = !empty($contact->getOriginal($key))
                    ? $this->getCompanyName($contact->getOriginal($key))
                    : null;

                $value = !empty($value)
                    ? $this->getCompanyName($value)
                    : null;
            }

            (new ActivityLogContact())
                ->setContactId($contact->getId())
                ->setUserId($contact->getUserId())
                ->setActivityType($activityType)
                ->setModelName((new ReflectionClass($contact))->getShortName())
                ->setModelField($key)
                ->setDataNew((string) $value)
                ->setDataOld((string) $dataOld)
                ->setLogInfo($contact->getRawOriginal())
                ->save();
        }
    }

    private function getCompanyName(int $companyId): ?string
    {
        $company = $this->companyRepository->getCompanyById($companyId);

        if ($company) {
            return $company->getName();
        }

        return null;
    }
}
