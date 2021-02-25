<?php

declare(strict_types=1);

namespace App\Services\ActivityLog;

use App\Models\ActivityLog\AbstractActivityLog;
use App\Models\ActivityLog\ActivityLogContact;
use App\Models\BaseModel;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use ReflectionClass;

trait ActivityLog
{
    protected function prepareToUpdateEvent(Model $model, string $logInfo): array
    {
        $log = $model->toArray();
        $data = Carbon::now();
        $log['created_at'] = $data;
        $log['updated_at'] = $data;
        $log['log_info'] = $logInfo;

        return $log;
    }

    protected function saveMany(array $activities): void
    {
        if (empty($activities)) {
            return;
        }

        $activeLogName = self::getActivityModelName();
        DB::table((new $activeLogName())->getTable())->insert($activities);
    }

    protected static function getDataLog(Model $model): string
    {
        return (string)$model->{$model->getKeyName()};
    }

    protected function getActivityModelName(): string
    {
        return $this->activeLogClass ?? AbstractActivityLog::getDefaultActiveLogName();
    }

    protected function isIgnoreField(string $key): bool
    {
        if (!isset(self::$ignoreFieldLog)) {
            return false;
        }
        return in_array($key, self::$ignoreFieldLog, true);
    }

    protected function isUpdateField(string $key): bool
    {
        if (!isset(self::$updateFieldLog)) {
            return true;
        }

        return in_array($key, self::$updateFieldLog, true);
    }

    protected function getActivityType(Model $model, string $key): string
    {
        return $model->getOriginal($key) === null
            ? AbstractActivityLog::ADDED_NEW_VALUE_FIELD_EVENT
            : AbstractActivityLog::UPDATE_VALUE_FIELD_EVENT;
    }

    protected function prepareData(Model $model, string $key): ?string
    {
        $val = $model->getOriginal($key) instanceof Carbon
            ? $model->getOriginal($key)->format(BaseModel::DATE_FORMAT)
            : $model->getOriginal($key);

        return $val ? (string)$val : null;
    }

    protected function createEvent(Model $model, string $baseField, string $baseValue = null): void
    {
        ($this->createLog(
            $model,
            AbstractActivityLog::ADDED_NEW_VALUE_FIELD_EVENT,
            $baseField,
            $baseValue ?? $model->{$baseField},
        ))->save();
    }

    protected function deleteEvent(Model $model, string $baseField, string $baseValue = null): void
    {
        ($this->createLog(
            $model,
            AbstractActivityLog::DELETE_VALUE_FIELD_EVENT,
            $baseField,
            null,
            $baseValue ?? $model->{$baseField},
        ))->save();
    }

    protected function updateEvent(Model $model, string $keyAdditionInfo = null): void
    {
        $activityLogs = [];
        foreach ($model->getChanges() as $key => $value) {
            if ($this->isUpdateField($key)) {
                $log = $this->createLog(
                    $model,
                    ActivityLogContact::UPDATE_VALUE_FIELD_EVENT,
                    $key,
                    (string)$model->{$key},
                    (string)$model->getOriginal($key)
                );
                if ($keyAdditionInfo) {
                    $log->setAdditionalInfoForData($model->{$key});
                }
                $activityLogs[] = $this->prepareToUpdateEvent($log, json_encode(static::prepareModelForLog($model)));
            }
        }
        $this->saveMany($activityLogs);
    }

    protected static function prepareModelForLog(Model $model): array
    {
        return $model->withoutRelations()->toArray();
    }

    protected function createLog(
        Model $model,
        string $logType,
        string $modelField = null,
        string $dataNew = null,
        string $dataOld = null
    ): AbstractActivityLog
    {
        $activeLogName = $this->getActivityModelName();
        $activeLog = (new $activeLogName())
            ->setModelName((new ReflectionClass($model))->getShortName())
            ->setUserId($this->getUser($model))
            ->setActivityType($logType)
            ->setModelField($modelField)
            ->setIdChangedModel($model, $model->{$model->getKeyName()})
            ->setLogInfo($this->prepareModelForLog($model))
            ->setDataNew($dataNew)
            ->setDataOld($dataOld);


        return $activeLog;
    }

    private function getUser(Model $model): ?int
    {
        $user = auth()->user();
        if ($user) {
            return $user->getId();
        }
        if (isset($model->user_id)) {
            return $model->user_id;
        }

        return self::findUserId($model);
    }

    private function findUserId($model): ?int
    {
        if ($model->company) {
            return $model->company->user_id;
        };
        if ($model->contact) {
            return $model->contact->user_id;
        }
        return null;
    }
}
