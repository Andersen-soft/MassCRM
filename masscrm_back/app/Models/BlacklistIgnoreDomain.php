<?php declare(strict_types=1);

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class BlacklistIgnoreDomain
 * @package App
 * @property int $id
 * @property string $domain
 * @property Carbon $created_at
 * @property Carbon $updated_at
 */
class BlacklistIgnoreDomain extends Model
{
    protected $fillable = [
        'id',
        'domain',
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'domain' => 'string',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
