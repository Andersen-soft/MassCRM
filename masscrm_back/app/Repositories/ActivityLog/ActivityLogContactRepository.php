<?php

declare(strict_types=1);

namespace App\Repositories\ActivityLog;

use App\Models\ActivityLog\ActivityLogContact;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\LazyCollection;

class ActivityLogContactRepository
{
    public function getActivityLog(int $contactId, array $search): Builder
    {
        $query = ActivityLogContact::query();

        if (!empty($search)) {
            $data = ActivityLogContact::search(json_encode($search))
                ->select([ActivityLogContact::ID_FIELD])
                ->where(ActivityLogContact::CONTACT_ID_FIELD, '=', $contactId)
                ->take(1000)->keys();

            $query->whereIn(ActivityLogContact::ID_FIELD, $data);
        } else {
            $query->where(ActivityLogContact::CONTACT_ID_FIELD, '=', $contactId);
        }

        return $query->orderBy(ActivityLogContact::ID_FIELD, 'desc');
    }

    public function fetchActivityLogWithParams(
        int $contactId,
        array $fields = null
    ): LazyCollection
    {
        $query = ActivityLogContact::query()->where('contact_id', '=', $contactId);
        $query->where(function (Builder $query) use ($fields): void
        {
            foreach ($fields as $field) {
                $query->orWhere(function (Builder $query) use ($field): void
                {
                    $query->where('model_name', '=', $field['model_name']);
                    $query->where('model_field', '=', $field['model_field']);
                });
            }
        });

        return $query->orderBy('id', 'desc')->cursor();
    }
}
