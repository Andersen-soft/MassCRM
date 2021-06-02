<?php

declare(strict_types=1);

namespace App\Repositories\ActivityLog;

use App\Models\ActivityLog\AbstractActivityLog;
use App\Models\ActivityLog\ActivityLogCompany;
use App\Models\BaseModel;
use App\Models\Company\CompanyVacancy;
use App\Models\User\User;
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

    public function getActiveLogForVacancy(CompanyVacancy $vacancy, User $user): ?ActivityLogCompany
    {
        $activityLog = ActivityLogCompany::query()
            ->where(static function (Builder $query) use ($vacancy, $user){
                    $query->where(ActivityLogCompany::ACTIVITY_TYPE_FIELD, ActivityLogCompany::ADDED_NEW_VALUE_FIELD_EVENT)
                        ->where(ActivityLogCompany::MODEL_NAME_FIELD, CompanyVacancy::COMPANY_VACANCY)
                        ->where(ActivityLogCompany::MODEL_FIELD_FIELD, CompanyVacancy::VACANCY)
                        ->whereJsonContains('log_info->id', $vacancy->id)
                        ->whereDate(BaseModel::CREATED_AT_FIELD, Carbon::today())
                        ->where('user_id', $user->id);
            })
            ->orWhere(static function (Builder $query) use ($vacancy, $user){
                $query->where(ActivityLogCompany::ACTIVITY_TYPE_FIELD, ActivityLogCompany::UPDATE_VALUE_FIELD_EVENT)
                    ->where(ActivityLogCompany::MODEL_NAME_FIELD, CompanyVacancy::COMPANY_VACANCY)
                    ->where(ActivityLogCompany::MODEL_FIELD_FIELD, CompanyVacancy::FIELD_ACTIVE)
                    ->whereJsonContains('log_info->id', $vacancy->id)
                    ->whereDate(BaseModel::CREATED_AT_FIELD, Carbon::today())
                    ->where('user_id', $user->id);
            });

        return  $activityLog->first();
    }

    public function getActivityLogForCheckIndustry(int $companyId): bool
    {
        return ActivityLogCompany::query()
            ->where(ActivityLogCompany::COMPANY_ID_FIELD, $companyId)
            ->whereDate(BaseModel::CREATED_AT_FIELD, '!=', now())
            ->whereDate(
                BaseModel::CREATED_AT_FIELD,
                '>',
                Carbon::createFromFormat(
                    ActivityLogCompany::DATE_FORMAT,
                    ActivityLogCompany::DATE_FOR_INDUSTRY
                )
            )->exists();
    }
}
