<?php

declare(strict_types=1);

namespace App\Repositories\ActivityLog;

use App\Models\ActivityLog\AbstractActivityLog;
use App\Models\ActivityLog\ActivityLogCompany;
use App\Models\Company\CompanyVacancy;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use ReflectionClass;

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

    public static function hasVacanciesWereUpdatedToday(int $companyId, int $userId, Carbon $date = null): bool
    {
        if (!$date) {
            $date = now();
        }

        return ActivityLogCompany::query()
            ->where(ActivityLogCompany::COMPANY_ID_FIELD, $companyId)
            ->where(ActivityLogCompany::USER_ID_FIELD, $userId)
            ->where(ActivityLogCompany::MODEL_NAME_FIELD, (new ReflectionClass(CompanyVacancy::class))->getShortName())
            ->whereIn(ActivityLogCompany::ACTIVITY_TYPE_FIELD,
                [AbstractActivityLog::UPDATE_VALUE_FIELD_EVENT, AbstractActivityLog::ADDED_NEW_VALUE_FIELD_EVENT])
            ->whereDate(Model::UPDATED_AT, $date)
            ->exists();
    }
}
