<?php declare(strict_types=1);

namespace App\Observers\Company;

use App\Models\ActivityLog\ActivityLogCompany;
use App\Models\Company\CompanyVacancy;
use App\Services\ActivityLog\ActivityLog;

class CompanyVacancyObserver
{
    use ActivityLog;

    private $activeLogClass = ActivityLogCompany::class;

    private static array $updateFieldLog = [CompanyVacancy::VACANCY, CompanyVacancy::SKILLS, CompanyVacancy::LINK, CompanyVacancy::FIELD_ACTIVE];

    public function created(CompanyVacancy $companyVacancy): void
    {
        $this->createEvent($companyVacancy, CompanyVacancy::VACANCY);
    }

    public function updated(CompanyVacancy $companyVacancy): void
    {
        $this->updateEvent($companyVacancy, CompanyVacancy::VACANCY);
    }

    public function deleting(CompanyVacancy $companyVacancy): void
    {
        $this->deleteEvent($companyVacancy, CompanyVacancy::VACANCY);
    }
}
