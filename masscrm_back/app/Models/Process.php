<?php

namespace App\Models;

use App\Models\User\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class Process
 * @package App
 * @property int $id
 * @property string $status
 * @property string $type
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property int $user_id
 */
class Process extends Model
{
    public const TYPE_PROCESS_IMPORT = 1;
    public const TYPE_STATUS_PROCESS_CANCEL = 0;
    public const TYPE_STATUS_PROCESS_WAIT = 1;
    public const TYPE_STATUS_PROCESS_IN_PROGRESS = 2;
    public const TYPE_STATUS_PROCESS_DONE = 3;

    protected $fillable = [
        'id',
        'status',
        'type',
        'user_id',
        'created_at',
        'updated_at'
    ];

    protected $casts = [
        'status' => 'integer',
        'type' => 'integer',
        'user_id' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
