<?php declare(strict_types=1);

namespace App\Models;

use App\Models\User\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class Blacklist
 * @package App
 * @property int $id
 * @property string $domain
 * @property string|null $source
 * @property int|null $user_id
 * @property Carbon $created_at
 * @property Carbon $updated_at
 */
class Blacklist extends Model
{
    public const REGEX_GET_DOMAIN_NAME = '/(?<=@)[^.]+(?=\.).*/';

    protected $fillable = [
        'id',
        'domain',
        'source',
        'user_id',
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'domain' => 'string',
        'source' => 'string',
        'user_id' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
