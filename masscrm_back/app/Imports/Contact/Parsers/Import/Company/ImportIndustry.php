<?php declare(strict_types=1);

namespace App\Imports\Contact\Parsers\Import\Company;

use App\Repositories\ActivityLog\ActivityLogCompanyRepository;
use App\Repositories\Contact\ContactRepository;
use App\Repositories\Industry\IndustryRepository;
use App\Models\Company\Company;

class ImportIndustry
{
    private IndustryRepository $industryRepository;
    private ContactRepository $contactRepository;
    private ActivityLogCompanyRepository $activityLogCompanyRepository;

    public function __construct(
        IndustryRepository $industryRepository,
        ContactRepository $contactRepository,
        ActivityLogCompanyRepository $activityLogCompanyRepository
    )
    {
        $this->industryRepository = $industryRepository;
        $this->contactRepository = $contactRepository;
        $this->activityLogCompanyRepository = $activityLogCompanyRepository;
    }

    public function merge(Company $company, array $row): void
    {
        if (empty($row['companyIndustries']['industry'])) {
            return;
        }

        $activityLogCompany = $this->activityLogCompanyRepository->getActivityLogForCheckIndustry($company->id);

        if (!$activityLogCompany) {
            $this->industryRepository->deleteIndustryFromCompany($company->id);
        }

        $idsIndustries = [];

        foreach ($row['companyIndustries']['industry'] as $key => $item) {
            $industry = $this->industryRepository->getIndustryFromName($item);

            if (!$industry) {
                $industry = $this->industryRepository->createIndustry($item);
            } else {
                if (!$activityLogCompany) {
                    $industry->update(['name' => $item]);
                }
            }

            $idsIndustries[] = $industry->id;
        }

        if (!empty($idsIndustries) && !$activityLogCompany) {
            $company->industries()->sync(array_unique($idsIndustries));
        }
    }

    public function replace(Company $company, array $row): void
    {
        if (!isset($row['companyIndustries'])) {
            return;
        }

        $idsIndustries = [];
        $nameIndustries = $row['companyIndustries']['industry'];

        foreach ($nameIndustries as $item) {
            $industry =  $this->industryRepository->getIndustryFromName($item);

            if (!$industry) {
                $industry = $this->industryRepository->createIndustry($item);
            }

            $idsIndustries[] = $industry->id;
        }

        $company->industries()->sync($idsIndustries);
    }

    public function create(Company $company, array $row): void
    {
        $activityLogCompany = $this->activityLogCompanyRepository->getActivityLogForCheckIndustry($company->id);

        if (!$activityLogCompany) {
            $this->replace($company, $row);
        }
    }
}
