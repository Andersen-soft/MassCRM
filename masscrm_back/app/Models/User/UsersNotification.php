<?php

namespace App\Models\User;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class UserNotification
 * @package App
 * @property int $id
 * @property string $type_notification
 * @property int $user_id
 * @property string $message
 * @property Carbon $created_at
 * @property Carbon $updated_at
 */
class UsersNotification extends Model
{
    protected $fillable = [
        'id',
        'type_notification',
        'user_id',
        'message'
    ];

    protected $casts = [
        'type_notification' => 'string',
        'user_id' => 'integer',
        'message' => 'string',
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    public function getId(): int
    {
        return $this->id;
    }

    public function setTypeNotification(string $typeNotification): UsersNotification
    {
        $this->type_notification = $typeNotification;

        return $this;
    }

    public function getTypeNotification(): string
    {
        return $this->type_notification;
    }

    public function setMessage(string $message): UsersNotification
    {
        $this->message = $message;

        return $this;
    }

    public function getMessage(): string
    {
        return $this->message;
    }

    public function getCreatedAt(): Carbon
    {
        return $this->created_at;
    }

    public function getUpdatedAt(): Carbon
    {
        return $this->updated_at;
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
