<?php declare(strict_types=1);

namespace App\Imports\Contact\Parsers\Import\Company;

use App\Helpers\Url;
use App\Models\Company\Company;
use App\Models\Company\CompanyVacancy;
use App\Models\User\User;
use App\Repositories\Company\VacancyRepository;

class ImportVacancy
{
    private VacancyRepository $vacancyRepository;
    private Url $urlHelper;

    public function __construct(VacancyRepository $vacancyRepository, Url $urlHelper)
    {
        $this->vacancyRepository = $vacancyRepository;
        $this->urlHelper = $urlHelper;
    }

    public function merge(Company $company, array $row, User $user): void
    {
        if (empty($row['companyVacancies'])) {
            return;
        }

        $vacancies = $row['companyVacancies'];

        foreach ($vacancies['vacancy'] as $key => $item) {
            if (!empty($item['job'])) {
                $vacancy = $this->vacancyRepository->getFirstVacancyFromName($company, $item['job']);
                if ($vacancy) {
                    if ($user->hasRole(User::USER_ROLE_NC2)) {
                        $item[CompanyVacancy::FIELD_ACTIVE] = CompanyVacancy::ACTIVE;
                    }
                    $this->updateVacancy($vacancy, $item);
                } else {
                    $this->createVacancy($company, $item);
                }
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
            if (!empty($item['job'])) {
                $this->createVacancy($company, $item);
            }
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
        $vacancy->link = !empty($job['job_urls']) ? $this->urlHelper->getUrlWithSchema($job['job_urls']) : null;

        $company->vacancies()->save($vacancy);
    }

    private function updateVacancy(CompanyVacancy $vacancy, array $vacancies): void
    {
        if (!$vacancy->skills) {
            $vacancy->skills = !empty($vacancies['job_skills']) ? $vacancies['job_skills'] : null;
        }

        if (!$vacancy->link) {
            $vacancy->link = !empty($vacancies['job_urls']) ?
                $this->urlHelper->getUrlWithSchema($vacancies['job_urls']) :
                null;
        }

        if (isset($vacancies[CompanyVacancy::FIELD_ACTIVE])) {
            $vacancy->{CompanyVacancy::FIELD_ACTIVE} = $vacancies[CompanyVacancy::FIELD_ACTIVE];
        }

        $vacancy->save();
    }
}
