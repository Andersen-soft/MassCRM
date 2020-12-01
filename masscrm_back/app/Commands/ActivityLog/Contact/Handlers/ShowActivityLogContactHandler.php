<?php

namespace App\Commands\ActivityLog\Contact\Handlers;

use App\Commands\ActivityLog\Contact\ShowActivityLogContactCommand;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use App\Repositories\ActivityLog\ActivityLogContactRepository;

class ShowActivityLogContactHandler
{
    private ActivityLogContactRepository $activityLogContactRepository;

    public function __construct(ActivityLogContactRepository $activityLogContactRepository)
    {
        $this->activityLogContactRepository = $activityLogContactRepository;
    }

    public function handle(ShowActivityLogContactCommand $command): LengthAwarePaginator
    {
        return $this->activityLogContactRepository->getActivityLog($command->getContactId(), $command->getSearch())
            ->paginate($command->getLimit());
    }
}
