<?php

namespace App\Repositories\ActivityLog;

use App\Models\ActivityLog\ActivityLogContact;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\LazyCollection;

class ActivityLogContactRepository
{
    public function getActivityLog(int $contactId, int $limit): LengthAwarePaginator
    {
        $query = ActivityLogContact::query()
            ->where('contact_id', '=', $contactId)
            ->orderBy('id', 'desc');

        return $query->paginate($limit);
    }

    public function fetchActivityLogWithParams(
        int $contactId,
        string $modelField = null,
        string $modelName = null
    ): LazyCollection
    {
        $query = ActivityLogContact::query()->where('contact_id', '=', $contactId);

        if ($modelName) {
            $query->where('model_name', '=', $modelName);
        }

        if ($modelField) {
            $query->where('model_field', '=', $modelField);
        }

        return $query->orderBy('id', 'desc')->cursor();
    }
}
