<?php

namespace App\Services\TransferCollection;

use App\Models\Company\CompanyIndustry;
use App\Models\Company\CompanySubsidiary;
use App\Models\Company\CompanyVacancy;
use App\Models\Contact\Contact;
use App\Models\Industry;
use App\Repositories\Company\CompanyRepository;
use App\Models\Company\Company;

class TransferCollectionCompanyService
{
    private CompanyRepository $companyRepository;

    public function __construct(CompanyRepository $companyRepository)
    {
        $this->companyRepository = $companyRepository;
    }

    public function transfer(): void
    {
        do{
            /** @var Company $company*/
            $company = $this->companyRepository->getCompanyForTransfer();
            if ($company) {
                $this->updateCollectionCompany($company);
            }

        } while ($company);
    }

    public function getVacancies(Company $company): array
    {
        $vacancies = [];

        if (!$company->vacancies) {
            return $vacancies;
        }

        /** @var CompanyVacancy $companyVacancy */
        foreach ($company->vacancies as $companyVacancy)
        {
            $vacancies[] = [
                'id' => $companyVacancy->id,
                'job' => $companyVacancy->vacancy,
                'skills' => $companyVacancy->skills,
                'link' => $companyVacancy->link,
            ];
        }

        return $vacancies;
    }

    public function getIndustries(Company $company): array
    {
        $industries = [];

        if (!$company->industries) {
            return $industries;
        }

        /** @var Industry $industry */
        foreach ($company->industries as $industry)
        {
            $industries[] = [
                'id' => $industry->id,
                'name' => $industry->name,
            ];
        }

        return $industries;
    }

    public function getSubsidiaries(Company $company): array
    {
        $subsidiaries = [];

        if (!$company->companySubsidiary) {
            return $subsidiaries;
        }

        /** @var Company $subsidiary */
        foreach ($company->companySubsidiary as $subsidiary)
        {
            $subsidiaries[] = [
                'id' => $subsidiary->id,
                'name' => $subsidiary->name,
            ];
        }

        return $subsidiaries;
    }

    public function updateCollectionCompany(Company $company): void
    {
        $company->industries_collection = $this->getIndustries($company);
        $company->vacancies_collection = $this->getVacancies($company);
        $company->is_upload_collection = true;
        $company->save();
    }
}
