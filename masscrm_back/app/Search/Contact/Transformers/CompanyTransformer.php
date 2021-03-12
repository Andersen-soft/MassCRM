<?php

namespace App\Search\Contact\Transformers;

use App\Models\Company\Company;
use App\Models\Company\CompanySubsidiary;
use App\Models\Company\CompanyVacancy;
use App\Models\Company\Fields\CompanyFields;
use App\Models\Industry;
use App\Search\SearchableTransform;

class CompanyTransformer extends SearchableTransform
{
    protected array $data = [];

    public function transform(Company $company): array
    {
        $this->data = [
            CompanyFields::ID_FIELD => $company->getId(),
            CompanyFields::NAME_FIELD => $company->getName(),
            CompanyFields::WEBSITE_FIELD => $company->getWebsite(),
            CompanyFields::STO_FULL_NAME_FIELD => $company->getStoFullName(),
            CompanyFields::COMPANY_SIZE_FIELD => [
                'gte' => (int)$company->getMinEmployees(),
                'lte' => (int)$company->getMinEmployees() === self::MIX_MAX_COMPANY_SIZE
                    ? (int)$company->getMinEmployees() + 1
                    : $company->getMaxEmployees()
            ],

            // Dates
            CompanyFields::CREATED_AT => $company->getCreatedAt()->format(self::DATE_FORMAT),
            CompanyFields::FOUNDED_FIELD => $company->getFounded() ? $company->getFounded()->format(self::DATE_FORMAT) : null,
        ];
        $this->addIndustries($company);
        $this->addVacancies($company);
        $this->addSubsidiaries($company);

        return $this->data;
    }

    protected function addIndustries(Company $company): void
    {
        $this->data[CompanyFields::INDUSTRIES_COllECTION_FIELD] = $company->industries()->pluck(Industry::NAME_FIELD);
    }

    protected function addVacancies(Company $company): void
    {
        $vacancies = $company->vacancies();

        if (!$vacancies->count()) {
            return;
        }

        $this->data[Company::VACANCIES_COllECTION_FIELD] = [
            CompanyVacancy::JOBS => $vacancies->pluck(CompanyVacancy::VACANCY),
            CompanyVacancy::SKILLS => $vacancies->pluck(CompanyVacancy::SKILLS),
            CompanyVacancy::LINK => $vacancies->pluck(CompanyVacancy::LINK),
        ];
    }

    protected function addSubsidiaries(Company $company): void
    {

        $subsidiaries = $company->companySubsidiary();

        if (!$subsidiaries->count()) {
            return;
        }

        $rows = $subsidiaries->pluck(CompanyFields::NAME_FIELD);

        if ($company->isSubsidiary()) {
            $this->data[Company::SUBSIDIARIES_COllECTION_FIELD] = [
                CompanySubsidiary::SUBSIDIARY => $rows
            ];
        } else {
            $this->data[Company::SUBSIDIARIES_COllECTION_FIELD] = [
                CompanySubsidiary::HOLDING => $rows
            ];
        }
    }
}
