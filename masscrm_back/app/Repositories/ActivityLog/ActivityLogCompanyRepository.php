<?php

declare(strict_types=1);

namespace App\Repositories\ActivityLog;

use App\Models\ActivityLog\ActivityLogCompany;
use Illuminate\Database\Eloquent\Builder;

class ActivityLogCompanyRepository
{
    public function getActivityLog(int $companyId, array $search): Builder
    {
        $query = ActivityLogCompany::query();

        if (!empty($search)) {
            $data = ActivityLogCompany::search(json_encode($search))
                ->select([ActivityLogCompany::ID_FIELD])
                ->where(ActivityLogCompany::COMPANY_ID_FIELD, '=', $companyId)
                ->take(1000)->keys();

            $query->whereIn(ActivityLogCompany::ID_FIELD, $data);
        } else {
            $query->where(ActivityLogCompany::COMPANY_ID_FIELD, '=', $companyId);
        }

        return $query->orderBy(ActivityLogCompany::ID_FIELD, 'desc');
    }
}
