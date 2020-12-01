<?php

declare(strict_types=1);

namespace App\Services\ActivityLog;

use App\Repositories\ActivityLog\ActivityLogContactRepository;
use Illuminate\Support\LazyCollection;
use Illuminate\Database\Eloquent\Builder;

class ActivityLogContactService
{
    private ActivityLogContactRepository $activityLogContactRepository;

    public function __construct(ActivityLogContactRepository $activityLogContactRepository)
    {
        $this->activityLogContactRepository = $activityLogContactRepository;
    }

    public function fetchLogsContact(int $contactId, array $fields = null): LazyCollection
    {
        return $this->activityLogContactRepository->fetchActivityLogWithParams($contactId, $fields);
    }

    public function getActivityLogContact(int $contactId, array $search = []): Builder
    {
        return $this->activityLogContactRepository->getActivityLog($contactId, $search);
    }
}
