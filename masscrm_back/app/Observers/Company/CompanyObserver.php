<?php

namespace App\Observers\Company;

use App\Models\ActivityLog\ActivityLogCompany;
use App\Models\Company\Company;
use Carbon\Carbon;
use Carbon\Exceptions\InvalidFormatException;
use ReflectionClass;

class CompanyObserver
{
    private const NAME_FIELDS = [
        Company::NAME_FIELD,
        Company::WEBSITE_FIELD,
        Company::LINKEDIN_FIELD,
        Company::STO_FULL_NAME_FIELD,
        Company::TYPE_FIELD,
        Company::FOUNDED_FIELD,
        Company::MIN_EMPLOYEES_FIELD,
        Company::MAX_EMPLOYEES_FIELD,
        Company::COMMENT_FIELD
    ];

    public function updated(Company $company): void
    {
        foreach ($company->getChanges() as $key => $value) {
            if (in_array($key, self::NAME_FIELDS, true)) {
                $activityType = $company->getOriginal($key) === null
                    ? ActivityLogCompany::ADDED_NEW_VALUE_FIELD_EVENT
                    : ActivityLogCompany::UPDATE_VALUE_FIELD_EVENT;

                $dataOld = $company->getOriginal($key) instanceof Carbon ?
                    $company->getOriginal($key)->format(Company::DATE_FORMAT) :
                    $company->getOriginal($key);

                (new ActivityLogCompany())
                    ->setUserId($company->getUserId())
                    ->setActivityType($activityType)
                    ->setCompanyId($company->getId())
                    ->setModelName((new ReflectionClass($company))->getShortName())
                    ->setModelField($key)
                    ->setDataOld($dataOld)
                    ->setDataNew($value)
                    ->setLogInfo($company->toJson())
                    ->save();
            }
        }
    }
}