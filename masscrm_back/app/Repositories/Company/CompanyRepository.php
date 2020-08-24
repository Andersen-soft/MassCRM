<?php

namespace App\Repositories\Company;

use App\Models\BaseModel;
use App\Models\Company\Company;
use App\Models\Contact\Contact;
use App\Models\User\User;
use App\Repositories\FilterRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
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

    public function getCompanyList(array $search, array $sort, int $limit = 10, User $user = null): LengthAwarePaginator
    {
        $query = Company::query()
            ->with(['vacancies', 'industries', 'companySubsidiary'])->select(['companies.*']);
        $query = $this->getRelationTablesQuery($query);
        if ($user) {
            $query->where('companies.user_id', $user->getId());
        }
        $query = $this->setParamsSearch($search, $query);
        $query = $this->setParamSort($sort, $query);

        return $query->groupBy('companies.id')->paginate($limit);
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

    public function checkUniqueCompany(string $name, string $website = null, string $linkedin = null): ?Company
    {
        $query = Company::query()->where('name', 'ILIKE', $name);
        if ($website) {
            $query->orWhere('website', 'ILIKE', $website);
        }
        if ($linkedin) {
            $query->orWhere('linkedin', 'ILIKE', $linkedin);
        }

        return $query->first();
    }

    public function deleteById(int $id): void
    {
        $company = Company::query()->find($id);
        if ($company instanceof Company) {
            $company->delete();
        }
    }

    public function getCompanyId(int $company): ?Company
    {
        return Company::query()->find($company);
    }
}
