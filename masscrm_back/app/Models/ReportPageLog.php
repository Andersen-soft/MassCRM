<?php declare(strict_types=1);

namespace App\Models;

use App\Models\ActivityLog\ActivityLogCompany;
use App\Models\ActivityLog\ActivityLogContact;
use App\Models\Contact\Contact;
use App\Models\User\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class ReportPageLog
 * @package App
 * @property int $id
 * @property int|null $user_id
 * @property int|null $created
 * @property int|null $updated
 * @property int|null $activity_log_companies_id
 * @property int|null $activity_log_contacts_id
 * @property int|null $contact_id
 * @property Carbon $created_at
 * @property Carbon $updated_at
 */
class ReportPageLog extends Model
{
    protected $table = 'report_page_log';
    public const INCREASING_CREATED_VALUE = 1;
    public const INCREASING_UPDATED_VALUE = 1;

    protected $fillable = [
        'id',
        'user_id',
        'created',
        'updated',
        'activity_log_companies_id',
        'activity_log_contacts_id',
        'created_at',
        'updated_at',
        'contact_id',
    ];

    protected $casts = [
        'id' => 'integer',
        'user_id' => 'integer',
        'created' => 'integer',
        'updated' => 'integer',
        'activity_log_companies_id' => 'integer',
        'activity_log_contacts_id' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'contact_id' => 'integer',
    ];

    public function getId(): int
    {
        return $this->id;
    }

    public function setUserId(int $userId): self
    {
        $this->user_id = $userId;

        return $this;
    }

    public function setContactId(int $contactId): self
    {
        $this->contact_id = $contactId;

        return $this;
    }

    public function getCreatedAt(): Carbon
    {
        return $this->created_at;
    }

    public function getUpdatedAt(): Carbon
    {
        return $this->updated_at;
    }

    public function getUserId(): ?int
    {
        return $this->user_id;
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function contact(): BelongsTo
    {
        return $this->belongsTo(Contact::class, 'contact_id');
    }

    public function getCreated(): int
    {
        return $this->created;
    }

    public function setCreated(int $created): self
    {
        $this->created = $created;

        return $this;
    }

    public function getUpdated(): int
    {
        return $this->updated;
    }

    public function setUpdated(int $updated): self
    {
        $this->updated = $updated;

        return $this;
    }

    public function getActivityLogCompaniesId(): ?int
    {
        return $this->activity_log_companies_id;
    }

    public function setActivityLogCompaniesId(int $activity_log_companies_id): self
    {
        $this->activity_log_companies_id = $activity_log_companies_id;

        return $this;
    }

    public function activityLogCompanies(): BelongsTo
    {
        return $this->belongsTo(ActivityLogCompany::class, 'activity_log_companies_id');
    }

    public function getActivityLogContacts(): ?int
    {
        return $this->activity_log_contacts_id;
    }

    public function setActivityLogContactsId(int $activity_log_contacts_id): self
    {
        $this->activity_log_contacts_id = $activity_log_contacts_id;

        return $this;
    }

    public function activityLogContacts(): BelongsTo
    {
        return $this->belongsTo(ActivityLogContact::class, 'activity_log_contacts_id');
    }

    public static function createLog(
        Model $model,
        string $type,
        int $contact_id = null
    ): self
    {
        $reportPageLog = new ReportPageLog();
        $reportPageLog->setUserId($reportPageLog->getUser($model));

        if ($type === ActivityLogContact::ACTIVITY_LOG_CONTACT) {
            $reportPageLog->setActivityLogContactsId($model->id);
        }

        if ($type === ActivityLogCompany::ACTIVITY_LOG_COMPANIES) {
            $reportPageLog->setActivityLogCompaniesId($model->id);
            $reportPageLog->setContactId($contact_id);
        }

        return $reportPageLog;
    }

    private function getUser(Model $model): ?int
    {
        return (int)$model->user_id;
    }

    public function increaseCreatedValue(int $createdFieldValue = self::INCREASING_CREATED_VALUE): self
    {
        return $this->setCreated($createdFieldValue);
    }

    public function increaseUpdatedValue(int $updatedFieldValue = self::INCREASING_UPDATED_VALUE): self
    {
        return $this->setUpdated($updatedFieldValue);
    }
}
