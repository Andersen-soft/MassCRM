<?php

declare(strict_types=1);

namespace App\Commands\ActivityLog\Company\Handlers;

namespace App\Services\ActivityLog;

use App\Models\ActivityLog\ActivityLogCompany;
use App\Models\Company\CompanyVacancy;
use App\Repositories\ActivityLog\ActivityLogCompanyRepository;
use Illuminate\Database\Eloquent\Builder;

class ActivityLogCompanyService
{
    private ActivityLogCompanyRepository $activityLogCompanyRepository;

    public function __construct(ActivityLogCompanyRepository $activityLogCompanyRepository)
    {
        $this->activityLogCompanyRepository = $activityLogCompanyRepository;
    }

    public function getActivityLogCompany(int $companyId, array $search = []): Builder
    {
        return $this->activityLogCompanyRepository->getActivityLog($companyId, $search);
    }

    public function checkIsVacancyCreated(ActivityLogCompany $activityLogContact): bool
    {
        if ($activityLogContact->activity_type === ActivityLogCompany::ADDED_NEW_VALUE_FIELD_EVENT &&
            $activityLogContact->model_name === CompanyVacancy::COMPANY_VACANCY &&
            $activityLogContact->model_field === CompanyVacancy::VACANCY) {
            return true;
        }

        return false;
    }

    public function checkIsVacancyUpdated(ActivityLogCompany $activityLogContact): bool
    {
        if ($activityLogContact->activity_type === ActivityLogCompany::UPDATE_VALUE_FIELD_EVENT &&
            $activityLogContact->model_name === CompanyVacancy::COMPANY_VACANCY &&
            $activityLogContact->model_field === CompanyVacancy::FIELD_ACTIVE) {
            return true;
        }

        return false;
    }
}
