<?php declare(strict_types=1);

namespace App\Observers\Company;

use App\Models\ActivityLog\ActivityLogCompany;
use App\Models\Company\Company;
use App\Models\Company\CompanyVacancy;
use ReflectionClass;

class CompanyVacancyObserver
{
    private const NAME_FIELDS = [CompanyVacancy::VACANCY, CompanyVacancy::SKILLS];

    public function created(CompanyVacancy $companyVacancy): void
    {
        /** @var Company $company */
        $company = $companyVacancy->company;




        if ($company->getUpdatedAt()->diffInSeconds($company->getCreatedAt()) < 5) {
            return;
        }

        foreach (self::NAME_FIELDS as $item) {
            (new ActivityLogCompany())
                ->setCompanyId($company->getId())
                ->setUserId($company->getUserId())
                ->setActivityType(ActivityLogCompany::ADDED_NEW_VALUE_FIELD_EVENT)
                ->setModelName((new ReflectionClass($companyVacancy))->getShortName())
                ->setModelField($item)
                ->setDataNew($companyVacancy->{$item})
                ->setLogInfo($companyVacancy->getRawOriginal())
                ->setAdditionalInfoForData($companyVacancy->getVacancy())
                ->save();
        }
    }

    public function updated(CompanyVacancy $companyVacancy): void
    {
        /** @var Company $company */
        $company = $companyVacancy->company;

        foreach ($companyVacancy->getChanges() as $key => $value) {
            if (in_array($key, self::NAME_FIELDS, true)) {
                (new ActivityLogCompany())
                    ->setCompanyId($companyVacancy->getCompanyId())
                    ->setUserId($company->getUserId())
                    ->setActivityType(ActivityLogCompany::UPDATE_VALUE_FIELD_EVENT)
                    ->setModelName((new ReflectionClass($companyVacancy))->getShortName())
                    ->setModelField($key)
                    ->setDataOld($companyVacancy->getOriginal($key))
                    ->setDataNew($value)
                    ->setAdditionalInfoForData($companyVacancy->getVacancy())
                    ->setLogInfo($companyVacancy->getRawOriginal())
                    ->save();
            }
        }
    }

    public function deleting(CompanyVacancy $companyVacancy): void
    {
        /** @var Company $company */
        $company = $companyVacancy->company;

        (new ActivityLogCompany())
            ->setCompanyId($companyVacancy->getCompanyId())
            ->setUserId($company->getUserId())
            ->setActivityType(ActivityLogCompany::DELETE_VALUE_FIELD_EVENT)
            ->setModelName((new ReflectionClass($companyVacancy))->getShortName())
            ->setModelField(CompanyVacancy::VACANCY)
            ->setDataOld($companyVacancy->getOriginal(CompanyVacancy::VACANCY))
            ->setLogInfo($companyVacancy->getRawOriginal())
            ->save();
    }
}
