<?php

declare(strict_types=1);

namespace App\Repositories\Company;

use App\Models\BaseModel;
use App\Models\Company\Company;
use App\Models\Company\CompanyVacancy;
use App\Models\Contact\Contact;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\LazyCollection;

class VacancyRepository
{
    public function getFirstVacancyFromName(Company $company, string $name, array $location): ?CompanyVacancy
    {
        $query = CompanyVacancy::query()
            ->where('vacancy', 'ILIKE', $name)
            ->where('company_id', '=', $company->id)
            ->where('job_country', $location['job_country'] ?? null)
            ->where('job_city', $location['job_city'] ?? null)
            ->where('job_region', $location['job_region'] ?? null);

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

    public function getVacancyForReportPageStatistic(Contact $contact, string $vacancyName): ?CompanyVacancy
    {
        $vacancy = CompanyVacancy::query()
            ->where(CompanyVacancy::COMPANY_ID, $contact->company_id)
            ->where(CompanyVacancy::JOB_COUNTRY, $contact->country)
            ->where(CompanyVacancy::VACANCY, $vacancyName)
            ->whereDate(BaseModel::UPDATED_AT_FIELD, Carbon::today());

        if ($contact->city !== null) {
            $vacancy->where(CompanyVacancy::JOB_CITY, $contact->city);
        }

        return  $vacancy->first();
    }
}
