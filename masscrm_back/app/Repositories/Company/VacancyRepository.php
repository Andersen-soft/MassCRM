<?php

declare(strict_types=1);

namespace App\Repositories\Company;

use App\Models\Company\Company;
use App\Models\Company\CompanyVacancy;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\LazyCollection;

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

    public function getAllActiveVacancies(): Collection
    {
        return CompanyVacancy::query()
            ->where('active', 1)
            ->get();
    }

    public function deactivateVacanciesByDate(int $daysToDeactivate): LazyCollection
    {
        $vacancies = CompanyVacancy::query()
            ->where(CompanyVacancy::FIELD_ACTIVE, true)
            ->whereDate(CompanyVacancy::UPDATED_AT, '<', Carbon::now()->subDays($daysToDeactivate)->toDateString())
            ->cursor()
            ->eager();

        $vacancies->each(function (CompanyVacancy $companyVacancy) {
            $companyVacancy->scopeWithoutTimestamps()->update(
                [CompanyVacancy::FIELD_ACTIVE => CompanyVacancy::IN_ACTIVE]
            );
        });

        return $vacancies;
    }
}
