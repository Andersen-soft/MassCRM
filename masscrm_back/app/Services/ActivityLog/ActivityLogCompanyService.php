<?php

declare(strict_types=1);

namespace App\Commands\ActivityLog\Company\Handlers;

namespace App\Services\ActivityLog;

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
}
