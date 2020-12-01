<?php declare(strict_types=1);

namespace App\Models\ActivityLog;

use App\Models\User\User;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class ActivityLogCompany
 * @package App
 * @property int $company_id
 */
class ActivityLogCompany extends AbstractActivityLog
{
    protected $fillable = [
        'id',
        'user_id',
        'activity_type',
        'created_at',
        'updated_at',
        'company_id',
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
        'company_id' => 'integer',
        'model_name' => 'string',
        'model_field' => 'string',
        'data_old' => 'string',
        'data_new' => 'string',
        'log_info' => 'array',
        'additional_info_for_data' => 'string',
    ];

    public function getCompanyId(): int
    {
        return $this->company_id;
    }

    public function setCompanyId(int $companyId): ActivityLogCompany
    {
        $this->company_id = $companyId;

        return $this;
    }

    public function company(): BelongsTo
    {
        return $this->belongsTo(User::class, 'company_id');
    }
}
