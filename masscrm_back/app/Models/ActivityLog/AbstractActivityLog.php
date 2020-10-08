<?php

namespace App\Models\ActivityLog;

use App\Models\User\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class AbstractActivityLog
 * @package App
 * @property int $id
 * @property int $user_id
 * @property string $activity_type
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property string $model_name
 * @property string $model_field
 * @property string|null $data_old
 * @property string|null $data_new
 * @property string|null $additional_info_for_data
 * @property array|null $log_info
 */
abstract class AbstractActivityLog extends Model
{
    public const STORE_ATTACHMENT_FILE_EVENT = 'storeAttachmentFile';
    public const UPDATE_ATTACHMENT_FILE_EVENT = 'updateAttachmentFile';
    public const DELETE_ATTACHMENT_FILE_EVENT = 'deleteAttachmentFile';
    public const UPDATE_VALUE_FIELD_EVENT = 'updateValueField';
    public const ADDED_NEW_VALUE_FIELD_EVENT = 'addNewValueField';
    public const DELETE_VALUE_FIELD_EVENT = 'deleteValueField';

    public function getId(): int
    {
        return $this->id;
    }

    public function getUserId(): int
    {
        return $this->user_id;
    }

    public function setUserId(int $userId): AbstractActivityLog
    {
        $this->user_id = $userId;

        return $this;
    }

    public function getActivityType(): string
    {
        return $this->activity_type;
    }

    public function setActivityType(string $activityType): AbstractActivityLog
    {
        $this->activity_type = $activityType;

        return $this;
    }

    public function getCreatedAt(): Carbon
    {
        return $this->created_at;
    }

    public function getUpdatedAt(): Carbon
    {
        return $this->updated_at;
    }

    public function getModelName(): string
    {
        return $this->model_name;
    }

    public function setModelName(string $modelName): AbstractActivityLog
    {
        $this->model_name = $modelName;

        return $this;
    }

    public function getModelField(): string
    {
        return $this->model_field;
    }

    public function setModelField(string $modelField): AbstractActivityLog
    {
        $this->model_field = $modelField;

        return $this;
    }

    public function getDataOld(): ?string
    {
        return $this->data_old;
    }

    public function setDataOld(?string $dataOld): AbstractActivityLog
    {
        $this->data_old = $dataOld;

        return $this;
    }

    public function getDataNew(): ?string
    {
        return $this->data_new;
    }

    public function setDataNew(?string $dataNew): AbstractActivityLog
    {
        $this->data_new = $dataNew;

        return $this;
    }

    public function getLogInfo(): ?array
    {
        return $this->log_info;
    }

    public function setLogInfo(array $logInfo): AbstractActivityLog
    {
        $this->log_info = $logInfo;

        return $this;
    }

    public function getAdditionalInfoForData(): ?string
    {
        return $this->additional_info_for_data;
    }

    public function setAdditionalInfoForData(?string $additionalInfoForData): AbstractActivityLog
    {
        $this->additional_info_for_data = $additionalInfoForData;

        return $this;
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
