<?php

namespace App\Repositories\Company;

use App\Models\Company\Company;
use App\Models\Company\CompanyVacancy;

class VacancyRepository
{
    public function getFirstVacancyFromName(Company $company, string $name): ?CompanyVacancy
    {
        $query = CompanyVacancy::query()
            ->where('vacancy', 'ILIKE', $name)
            ->where('company_id', '=', $company->id)
        ;

        return $query->first();
    }
}