<?php declare(strict_types=1);

namespace App\Models;

use App\Models\User\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Lang;

/**
 * Class Process
 * @package App
 * @property int $id
 * @property string $name
 * @property string $file_path
 * @property string $status
 * @property string $type
 * @property int|null $operation_id
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property int $user_id
 */
class Process extends Model
{
    public const TYPE_PROCESS_IMPORT_CONTACT = 'import_contacts';
    public const TYPE_PROCESS_EXPORT_CONTACT = 'export_contacts';
    public const TYPE_PROCESS_EXPORT_BLACKLIST = 'export_blacklist';
    public const TYPE_STATUS_PROCESS_FAILED = 'failed';
    public const TYPE_STATUS_PROCESS_WAIT = 'waiting';
    public const TYPE_STATUS_PROCESS_IN_PROGRESS = 'in_progress';
    public const TYPE_STATUS_PROCESS_DONE = 'done';

    protected $fillable = [
        'id',
        'name',
        'status',
        'type',
        'operation_id',
        'file_path',
        'user_id',
        'created_at',
        'updated_at'
    ];

    protected $casts = [
        'name' => 'string',
        'file_path' => 'string',
        'status' => 'string',
        'type' => 'string',
        'user_id' => 'integer',
        'operation_id' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    public function getStatusName(): string
    {
        return Lang::get('export.statuses.' . $this->status);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function informationImport(): BelongsTo
    {
        return $this->belongsTo(InformationImport::class, 'operation_id');
    }
}
