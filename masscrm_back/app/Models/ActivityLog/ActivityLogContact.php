<?php declare(strict_types=1);

namespace App\Models\ActivityLog;

use App\Models\User\User;
use App\Search\ActivityLogContact\ActivityLogContactIndexConfigurator;
use App\Search\ActivityLogContact\Transformers\ActivityLogContactTransformer;
use App\Search\ActivityLogContact\Rules\ActivityLogContactSearchRule;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use ScoutElastic\Searchable;

/**
 * Class ActivityLogContact
 * @package App
 * @property int $contact_id
 */
class ActivityLogContact extends AbstractActivityLog
{
    use Searchable;

    public const ID_FIELD = 'id';
    public const USER_ID_FIELD = 'user_id';
    public const ACTIVITY_TYPE_FIELD = 'activity_type';
    public const CONTACT_ID_FIELD = 'contact_id';
    public const MODEL_NAME_FIELD = 'model_name';
    public const MODEL_FIELD_FIELD = 'model_field';
    public const DATA_OLD_FIELD = 'data_old';
    public const DATA_NEW_FIELD = 'data_new';
    public const LOG_INFO_FIELD = 'log_info';
    public const ADDITIONAL_INFO_FOR_DATA_FIELD = 'additional_info_for_data';

    protected $fillable = [
        self::ID_FIELD,
        self::USER_ID_FIELD,
        self::ACTIVITY_TYPE_FIELD,
        self::CREATED_AT,
        self::UPDATED_AT,
        self::CONTACT_ID_FIELD,
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
        self::CONTACT_ID_FIELD => 'integer',
        self::MODEL_NAME_FIELD => 'string',
        self::MODEL_FIELD_FIELD => 'string',
        self::DATA_OLD_FIELD => 'string',
        self::DATA_NEW_FIELD => 'string',
        self::LOG_INFO_FIELD => 'array',
        self::ADDITIONAL_INFO_FOR_DATA_FIELD => 'string',
    ];

    protected string $indexConfigurator = ActivityLogContactIndexConfigurator::class;

    protected array $searchRules = [
        ActivityLogContactSearchRule::class
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

    public function toSearchableArray(): array
    {
        return (new ActivityLogContactTransformer())->transform($this);
    }
}
