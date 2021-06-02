<?php declare(strict_types=1);

namespace App\Models;

use App\Models\User\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class InformationImport
 * @package App
 * @property int $id
 * @property int $count_new_contacts
 * @property int $count_new_companies
 * @property int $count_processed_duplicate_contacts
 * @property int $count_processed_duplicate_companies
 * @property int $count_missed_duplicates
 * @property int $count_unsuccessfully
 * @property string $file_name_missed_duplicates
 * @property string $file_name_unsuccessfully_duplicates
 * @property int $user_id
 * @property Carbon $created_at
 * @property Carbon $updated_at
 */
class InformationImport extends Model
{
    protected $fillable = [
        'id',
        'count_new_contacts',
        'count_new_companies',
        'count_processed_duplicate_contacts',
        'count_processed_duplicate_companies',
        'count_missed_duplicates',
        'count_unsuccessfully',
        'file_name_missed_duplicates',
        'file_name_unsuccessfully_duplicates',
        'user_id',
        'created_at',
        'updated_at'
    ];

    protected $casts = [
        'count_new_contacts' => 'integer',
        'count_new_companies' => 'integer',
        'count_processed_duplicate_contacts' => 'integer',
        'count_processed_duplicate_companies' => 'integer',
        'count_missed_duplicates' => 'integer',
        'count_unsuccessfully' => 'integer',
        'file_name_missed_duplicates' => 'string',
        'file_name_unsuccessfully_duplicates' => 'string',
        'user_id' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function process(): HasMany
    {
        return $this->hasMany(Process::class, 'operation_id');
    }
}
