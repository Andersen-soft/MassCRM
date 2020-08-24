<?php

namespace App\Commands\ActivityLog\Company\Handlers;

use App\Commands\ActivityLog\Company\ShowActivityLogCompanyCommand;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use App\Repositories\ActivityLog\ActivityLogCompanyRepository;

class ShowActivityLogCompanyHandler
{
    private ActivityLogCompanyRepository $activityLogCompanyRepository;

    public function __construct(ActivityLogCompanyRepository $activityLogCompanyRepository)
    {
        $this->activityLogCompanyRepository = $activityLogCompanyRepository;
    }

    public function handle(ShowActivityLogCompanyCommand $command): LengthAwarePaginator
    {
        return $this->activityLogCompanyRepository->getActivityLog($command->getCompanyId(), $command->getLimit());
    }
}
