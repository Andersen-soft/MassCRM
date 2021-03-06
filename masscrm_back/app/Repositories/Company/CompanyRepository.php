<?php

declare(strict_types=1);

namespace App\Repositories\Company;

use App\Helpers\Url;
use App\Models\BaseModel;
use App\Models\Company\Company;
use App\Models\Company\CompanySubsidiary;
use App\Models\Company\CompanyVacancy;
use App\Models\Contact\Contact;
use App\Repositories\FilterRepository;
use Illuminate\Database\Eloquent\Builder;

class CompanyRepository
{
    private FilterRepository $filter;

    public function __construct(FilterRepository $filter)
    {
        $this->filter = $filter;
    }

    private function getRelationTablesQuery(Builder $query): Builder
    {
        return $query->leftJoin('companies_industries', 'companies_industries.company_id', '=', 'companies.id')
            ->leftJoin('industries', 'industries.id', '=', 'companies_industries.industry_id')
            ->leftJoin('company_vacancies', 'company_vacancies.company_id', '=', 'companies.id')
            ->leftJoin('company_subsidiaries', 'company_subsidiaries.parent_id', '=', 'companies.id');
    }

    public function getCompanyList(array $search, array $sort): Builder
    {
        $query = Company::query()
            ->with(['vacancies', 'industries', 'companySubsidiary'])->select(['companies.*']);

        $query = $this->getRelationTablesQuery($query);
        $query = $this->setParamsSearch($search, $query);
        $query = $this->setParamSort($sort, $query);

        return $query->groupBy('companies.id');
    }

    private function setParamSort(array $sort, Builder $query): Builder
    {
        if (empty($sort)) {
            return $query;
        }

        return $query->orderBy($sort['field_name'], $sort['type_sort']);
    }

    private function setParamsSearch(array $search, Builder $query): Builder
    {
        if (empty($search)) {
            return $query;
        }

        foreach ($search as $field => $value) {
            $filterConfig = BaseModel::getFilterConfig($field, Company::COMPANY_FIELD);
            if (empty($filterConfig) || !isset($filterConfig[BaseModel::TYPE_FILTER])) {
                continue;
            }
            $query = $this->filter->baseFilter($query, $filterConfig, $value);
        }

        return $query;
    }

    public function checkUniqueCompany(string $name = null, string $website = null, string $linkedIn = null): ?Company
    {
        $query = Company::query();
        if ($name) {
            $query->where('name', 'ILIKE', $name);
        }
        if ($website) {
            $website = Url::getSecondAndFirstDomainsString($website);
            $query->where('website', '~*', Url::getWebsiteMatchString($website));
        }
        if ($linkedIn) {
            $query->orWhere('linkedin', 'ILIKE', $linkedIn);
        }

        return $query->first();
    }

    public function getNotUniqueCompanyForDelete(string $name = null, int $id): array
    {
        if (empty($name)) {
            return [];
        }

        $query = Company::query()->where('id', '!=', $id)->where('name', 'ILIKE', $name);

        return $query->get()->all();
    }

    public function deleteById(int $id): void
    {
        $company = Company::query()->find($id);
        if ($company instanceof Company) {
            $company->delete();
        }
    }

    public function getCompanyById(int $company): ?Company
    {
        return Company::query()->find($company);
    }

    public function getCompanyByName(string $name): ?Company
    {
        return Company::query()
            ->where('name', '=', $name)
            ->first();
    }

    public function getCompanyFromTypeAndName(string $name, string $type): ?Company
    {
        return Company::query()->select('id')
            ->where('type', 'ILIKE', $type)
            ->where('name', 'ILIKE', $name)
            ->first();
    }

    public function checkTypeCompany(int $id, string $type): ?Company
    {
        $company = Company::query()->select('*')->find($id);

        if ($company && $company->type !== $type) {
            return $company;
        }

        return null;
    }

    public function deleteCompanyFromSubsidiary(int $companyId): void
    {
        CompanySubsidiary::query()
            ->where('parent_id', '=', $companyId)
            ->orWhere('child_id', '=', $companyId)
            ->delete();
    }

    public function getCompanyForTransfer(): ?Company
    {
        return Company::query()->select('*')->where('is_upload_collection', '=', false)
            ->orderBy('id')
            ->first();
    }

    public function hasVacanciesByJobLocation(Company $company, $status, ?Contact $contact): bool
    {
        return $company->vacancies()
            ->where(CompanyVacancy::FIELD_ACTIVE, $status)
            ->where('job_country', $contact->country ?? null)
            ->where('job_city', $contact->city ?? null)
            ->where('job_region', $contact->region ?? null)
            ->exists();
    }
}
