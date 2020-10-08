<?php

namespace App\Services\Parsers\Import\Company;

use App\Models\Company\Company;
use App\Models\Company\CompanyVacancy;
use App\Repositories\Company\VacancyRepository;

class ImportVacancy
{
    private VacancyRepository $vacancyRepository;

    public function __construct(VacancyRepository $vacancyRepository)
    {
        $this->vacancyRepository = $vacancyRepository;
    }

    public function merge(Company $company, array $row): void
    {
        if (empty($row['companyVacancies'])) {
            return;
        }

        $vacancies = $row['companyVacancies'];

        foreach ($vacancies['vacancy'] as $key => $item) {
            $vacancy = $this->vacancyRepository->getFirstVacancyFromName($company, $item['job']);
            if ($vacancy) {
                $this->updateVacancy($vacancy, $item);
            } else {
                $this->createVacancy($company, $item);
            }
        }
    }

    public function replace(Company $company, array $row): void
    {
        if (empty($row['companyVacancies'])) {
            return;
        }

        $vacancies = $row['companyVacancies'];
        $company->vacancies()->delete();

        foreach ($vacancies['vacancy'] as $key => $item) {
            $this->createVacancy($company, $item);
        }
    }

    public function create(Company $company, array $row): void
    {
       $this->replace($company, $row);
    }

    private function createVacancy(Company $company, array $job): void
    {
        $vacancy = new CompanyVacancy();
        $vacancy->vacancy = $job['job'];
        $vacancy->skills = !empty($job['job_skills']) ? $job['job_skills'] : null;
        $vacancy->link = !empty($job['job_urls']) ? $job['job_urls'] : null;

        $company->vacancies()->save($vacancy);
    }

    private function updateVacancy(CompanyVacancy $vacancy, array $vacancies): void
    {
        if (!$vacancy->skills) {
            $vacancy->skills = !empty($vacancies['job_skills']) ? $vacancies['job_skills'] : null;
        }
        if (!$vacancy->link) {
            $vacancy->link = !empty($vacancies['job_urls']) ? $vacancies['job_urls'] : null;
        }

        $vacancy->save();
    }
}
