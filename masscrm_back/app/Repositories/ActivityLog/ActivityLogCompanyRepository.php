<?php

declare(strict_types=1);

namespace App\Repositories\ActivityLog;

use App\Models\ActivityLog\ActivityLogCompany;
use Illuminate\Database\Eloquent\Builder;

class ActivityLogCompanyRepository
{
    public function getActivityLog(int $companyId): Builder
    {
        return ActivityLogCompany::query()
            ->where('company_id', '=', $companyId)
            ->orderBy('id', 'desc');
    }
}
