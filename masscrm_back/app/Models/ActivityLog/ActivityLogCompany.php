<?php declare(strict_types=1);

namespace App\Models\ActivityLog;

use App\Models\User\User;
use App\Search\ActivityLog\Company\ActivityLogCompanyIndexConfigurator;
use App\Search\ActivityLog\Company\Rules\ActivityLogCompanySearchRule;
use App\Search\ActivityLog\Company\Transformers\ActivityLogCompanyTransformer;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use ScoutElastic\Searchable;

/**
 * Class ActivityLogCompany
 * @package App
 * @property int $company_id
 */
class ActivityLogCompany extends AbstractActivityLog
{
    use Searchable;

    public const COMPANY_ID_FIELD = 'company_id';

    protected $fillable = [
        self::ID_FIELD,
        self::USER_ID_FIELD,
        self::ACTIVITY_TYPE_FIELD,
        self::CREATED_AT,
        self::UPDATED_AT,
        self::COMPANY_ID_FIELD,
        self::MODEL_NAME_FIELD,
        self::MODEL_FIELD_FIELD,
        self::DATA_OLD_FIELD,
        self::DATA_NEW_FIELD,
        self::LOG_INFO_FIELD,
        self::ADDITIONAL_INFO_FOR_DATA_FIELD
    ];

    protected $casts = [
        self::USER_ID_FIELD => 'string',
        self::ACTIVITY_TYPE_FIELD => 'string',
        self::CREATED_AT => 'datetime',
        self::UPDATED_AT => 'datetime',
        self::COMPANY_ID_FIELD => 'integer',
        self::MODEL_NAME_FIELD => 'string',
        self::MODEL_FIELD_FIELD => 'string',
        self::DATA_OLD_FIELD => 'string',
        self::DATA_NEW_FIELD => 'string',
        self::LOG_INFO_FIELD => 'array',
        self::ADDITIONAL_INFO_FOR_DATA_FIELD => 'string',
    ];

    protected string $indexConfigurator = ActivityLogCompanyIndexConfigurator::class;

    protected array $searchRules = [
        ActivityLogCompanySearchRule::class
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

    public function toSearchableArray(): array
    {
        return (new ActivityLogCompanyTransformer())->transform($this);
    }

    public function setIdChangedModel(Model $model, int $id = null): AbstractActivityLog
    {
        $this->setCompanyId($model->company_id ?? $model->parent_id ?? $id);

        return $this;
    }
}
