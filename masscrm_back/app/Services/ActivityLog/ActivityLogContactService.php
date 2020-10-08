<?php

namespace App\Services\ActivityLog;

use App\Repositories\ActivityLog\ActivityLogContactRepository;
use Illuminate\Support\LazyCollection;

class ActivityLogContactService
{
    private ActivityLogContactRepository $activityLogContactRepository;

    public function __construct(ActivityLogContactRepository $activityLogContactRepository)
    {
        $this->activityLogContactRepository = $activityLogContactRepository;
    }

    public function fetchLogsContact(int $contactId, string $modelField = null, string $modelName = null): LazyCollection
    {
        return $this->activityLogContactRepository->fetchActivityLogWithParams($contactId, $modelField, $modelName);
    }
}
