<?php

namespace App\Repositories\ActivityLog;

use App\Models\ActivityLog\ActivityLogContact;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class ActivityLogContactRepository
{
    public function getActivityLog(int $contactId, int $limit): LengthAwarePaginator
    {
        $query = ActivityLogContact::query()
            ->where('contact_id', '=', $contactId)
            ->orderBy('id', 'desc');

        return $query->paginate($limit);
    }
}
