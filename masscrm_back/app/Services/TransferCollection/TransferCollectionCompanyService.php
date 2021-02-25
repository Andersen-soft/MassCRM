<?php declare(strict_types=1);

namespace App\Services\TransferCollection;

use App\Models\Company\Fields\CompanyFields;
use App\Models\Industry;
use App\Repositories\Company\CompanyRepository;
use App\Models\Company\Company;

class TransferCollectionCompanyService
{
    public const RELATION_VACANCIES = 'vacancies';
    public const RELATION_INDUSTRIES = 'industries';

    private CompanyRepository $companyRepository;

    public function __construct(CompanyRepository $companyRepository)
    {
        $this->companyRepository = $companyRepository;
    }

    /**
     * @param array $relations
     * @param bool $fresh
     */
    public function transfer(array $relations = [], bool $fresh = false): void
    {
        if ($fresh) {
            Company::query()->update([CompanyFields::IS_UPLOAD_COLLECTION_FIELD => false]);
        }

        do {
            /** @var Company $company */
            $company = $this->companyRepository->getCompanyForTransfer();
            if (null !== $company) {
                $this->updateCollectionCompany($company, $relations);
            }
        } while ($company);
    }

    public function getVacancies(Company $company): array
    {
        $vacancies = collect();

        if (empty($company->vacancies)) {
            return $vacancies->toArray();
        }

        $vacancies = $company->vacancies()->get();
        $vacancies->transform(function ($item) {
           return [
               'id' => $item->id,
               'active' => $item->active,
               'job' => $item->vacancy,
               'skills' => $item->skills,
               'link' => $item->link,
           ];
        });

        return $vacancies->toArray();
    }

    public function getIndustries(Company $company): array
    {
        $industries = [];

        if (empty($company->industries)) {
            return $industries;
        }

        /** @var Industry $industry */
        foreach ($company->industries()->get() as $industry) {
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

        if (empty($company->companySubsidiary)) {
            return $subsidiaries;
        }

        /** @var Company $subsidiary */
        foreach ($company->companySubsidiary as $subsidiary) {
            $subsidiaries[] = [
                'id' => $subsidiary->id,
                'name' => $subsidiary->name,
            ];
        }

        return $subsidiaries;
    }

    public function updateCollectionCompany(Company $company, $relations = []): void
    {
        if (empty($relations)) {
            $company->industries_collection = $this->getIndustries($company);
            $company->vacancies_collection = $this->getVacancies($company);
            $company->is_upload_collection = true;
            $company->save();
            return;
        }

        if (in_array(self::RELATION_VACANCIES, $relations, true)) {
            $company->vacancies_collection = $this->getVacancies($company);
        }

        if (in_array(self::RELATION_INDUSTRIES, $relations, true)) {
            $company->industries_collection = $this->getIndustries($company);
        }

        $company->is_upload_collection = true;
        $company->save();
    }
}
