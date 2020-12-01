<?php declare(strict_types=1);

namespace App\Observers\Company;

use App\Models\ActivityLog\ActivityLogCompany;
use App\Models\Company\Company;
use App\Models\Industry;
use App\Models\Company\CompanyIndustry;
use ReflectionClass;

class CompanyIndustryObserver
{
    public function created(CompanyIndustry $companyIndustry): void
    {
        /** @var Company $company */
        $company = $companyIndustry->company;
        /** @var Industry $industry */
        $industry = $companyIndustry->industry;

        if ($company->getUpdatedAt()->diffInSeconds($company->getCreatedAt()) < 5) {
            return;
        }

        (new ActivityLogCompany())
            ->setCompanyId($company->getId())
            ->setUserId($company->getUserId())
            ->setActivityType(ActivityLogCompany::ADDED_NEW_VALUE_FIELD_EVENT)
            ->setModelName((new ReflectionClass($companyIndustry))->getShortName())
            ->setModelField(CompanyIndustry::INDUSTRY_FIELD)
            ->setDataNew($industry->getName())
            ->setLogInfo($industry->getRawOriginal())
            ->save();
    }

    public function deleting(CompanyIndustry $companyIndustry): void
    {
        /** @var Company $company */
        $company = $companyIndustry->company;

        /** @var Industry $industry */
        $industry = $companyIndustry->industry;

        if ($company->getUpdatedAt()->diffInSeconds($company->getCreatedAt()) < 5) {
            return;
        }

        (new ActivityLogCompany())
            ->setCompanyId($company->getId())
            ->setUserId($company->getUserId())
            ->setActivityType(ActivityLogCompany::DELETE_VALUE_FIELD_EVENT)
            ->setModelName((new ReflectionClass($companyIndustry))->getShortName())
            ->setModelField(CompanyIndustry::INDUSTRY_FIELD)
            ->setDataOld($industry->getName())
            ->setLogInfo($industry->getRawOriginal())
            ->save();
    }
}
