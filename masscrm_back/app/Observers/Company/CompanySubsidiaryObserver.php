<?php declare(strict_types=1);

namespace App\Observers\Company;

use App\Models\ActivityLog\ActivityLogCompany;
use App\Models\Company\Company;
use App\Models\Company\CompanySubsidiary;
use ReflectionClass;

class CompanySubsidiaryObserver
{
    public function created(CompanySubsidiary $companySubsidiary): void
    {
        /** @var Company $company */
        $company = $companySubsidiary->company;

        /** @var Company $companyChild */
        $companyChild = $companySubsidiary->companyChild;

        if ($company->getUpdatedAt()->diffInSeconds($company->getCreatedAt()) < 5) {
            return;
        }

        (new ActivityLogCompany())
            ->setCompanyId($company->getId())
            ->setUserId($company->getUserId())
            ->setActivityType(ActivityLogCompany::ADDED_NEW_VALUE_FIELD_EVENT)
            ->setModelName((new ReflectionClass($companySubsidiary))->getShortName())
            ->setModelField(CompanySubsidiary::SUBSIDIARIES_FIELD)
            ->setDataNew($companyChild->getName())
            ->setLogInfo($companyChild->getRawOriginal())
            ->save();
    }

    public function deleting(CompanySubsidiary $companySubsidiary): void
    {
        /** @var Company $company */
        $company = $companySubsidiary->company;

        /** @var Company $companyChild */
        $companyChild = $companySubsidiary->companyChild;

        (new ActivityLogCompany())
            ->setCompanyId($company->getId())
            ->setUserId($company->getUserId())
            ->setActivityType(ActivityLogCompany::DELETE_VALUE_FIELD_EVENT)
            ->setModelName((new ReflectionClass($companySubsidiary))->getShortName())
            ->setModelField(CompanySubsidiary::SUBSIDIARIES_FIELD)
            ->setDataOld($companyChild->getName())
            ->setLogInfo($companyChild->getRawOriginal())
            ->save();
    }
}
