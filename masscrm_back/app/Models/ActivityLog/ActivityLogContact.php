<?php

namespace App\Models\ActivityLog;

use App\Models\User\User;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class ActivityLogContact
 * @package App
 * @property int $contact_id
 */
class ActivityLogContact extends AbstractActivityLog
{
    protected $fillable = [
        'id',
        'user_id',
        'activity_type',
        'created_at',
        'updated_at',
        'contact_id',
        'model_name',
        'model_field',
        'data_old',
        'data_new',
        'log_info',
        'additional_info_for_data',
    ];

    protected $casts = [
        'user_id' => 'string',
        'activity_type' => 'string',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'contact_id' => 'integer',
        'model_name' => 'string',
        'model_field' => 'string',
        'data_old' => 'string',
        'data_new' => 'string',
        'log_info' => 'string',
        'additional_info_for_data' => 'string',
    ];

    public function getContactId(): int
    {
        return $this->contact_id;
    }

    public function setContactId(int $contactId): ActivityLogContact
    {
        $this->contact_id = $contactId;

        return $this;
    }

    public function contact(): BelongsTo
    {
        return $this->belongsTo(User::class, 'contact_id');
    }
}
