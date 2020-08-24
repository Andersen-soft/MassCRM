<?php

namespace App\Repositories\ActivityLog;

use App\Models\ActivityLog\ActivityLogCompany;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class ActivityLogCompanyRepository
{
    public function getActivityLog(int $companyId, int $limit): LengthAwarePaginator
    {
        $query = ActivityLogCompany::query()
            ->where('company_id', '=', $companyId)
            ->orderBy('id', 'desc');

        return $query->paginate($limit);
    }
}
