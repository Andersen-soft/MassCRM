<?php declare(strict_types=1);

namespace App\Models\User;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class UserNotification
 * @package App
 * @property int $id
 * @property string $type_notification
 * @property string|null $file_path
 * @property int $user_id
 * @property int|null $operation_id
 * @property bool $new
 * @property string $message
 * @property Carbon $created_at
 * @property Carbon $updated_at
 */
class UsersNotification extends Model
{
    public const TYPE_IMPORT_FINISHED = 'import_finished';
    public const TYPE_IMPORT_FAILED = 'import_failed';
    public const TYPE_EXPORT_BLACKLIST_FINISHED = 'export_blacklist_finished';
    public const TYPE_EXPORT_BLACKLIST_FAILED = 'export_blacklist_failed';
    public const TYPE_EXPORT_CONTACTS_FINISHED = 'export_contacts_finished';
    public const TYPE_EXPORT_CONTACTS_FAILED = 'export_contacts_failed';
    public const TYPE_IS_IN_WORK_UPDATED = 'is_in_work_updated';

    protected $fillable = [
        'id',
        'type_notification',
        'user_id',
        'operation_id',
        'new',
        'message',
        'file_path'
    ];

    protected $casts = [
        'type_notification' => 'string',
        'user_id' => 'integer',
        'operation_id' => 'integer',
        'message' => 'string',
        'file_path' => 'string',
        'new' => 'boolean',
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
