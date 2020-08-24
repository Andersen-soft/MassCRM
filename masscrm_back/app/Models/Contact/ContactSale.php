<?php

namespace App\Models\Contact;

use App\Models\Contact\Fields\ContactSaleFields;
use App\Models\Source;
use App\Models\SaleStatus;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class ContactSale
 * @package App
 * @property int $id
 * @property int $contact_id
 * @property string $link
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property int $status_id
 * @property boolean $project_c1
 * @property int $source_id
 */
class ContactSale extends ContactSaleFields
{
    protected $fillable = [
        self::ID_FIELD,
        self::CONTACT_ID_FIELD,
        self::LINK_FIELD,
        self::CREATED_AT,
        self::UPDATED_AT,
        self::STATUS_ID_FIELD,
        self::PROJECT_C1_FIELD,
        self::SOURCE_ID_FIELD
    ];

    protected $casts = [
        self::CONTACT_ID_FIELD => 'integer',
        self::LINK_FIELD => 'string',
        self::CREATED_AT => 'datetime',
        self::UPDATED_AT => 'datetime',
        self::STATUS_ID_FIELD => 'integer',
        self::SOURCE_ID_FIELD => 'integer',
        self::PROJECT_C1_FIELD => 'boolean'
    ];

    public function getId(): int
    {
        return $this->id;
    }

    public function getContactId(): int
    {
        return $this->contact_id;
    }

    public function getLink(): string
    {
        return $this->link;
    }

    public function setLink(string $link): ContactSale
    {
        $this->link = $link;

        return $this;
    }

    public function getCreatedAt(): Carbon
    {
        return $this->created_at;
    }

    public function getCreatedAtDate(): string
    {
        return $this->created_at->format(self::DATE_FORMAT);
    }

    public function getUpdatedAt(): Carbon
    {
        return $this->updated_at;
    }

    public function isProjectC1(): bool
    {
        return $this->project_c1;
    }

    public function getSourceId(): ?int
    {
        return $this->source_id;
    }

    public function getStatusId(): ?int
    {
        return $this->status_id;
    }

    public function setProjectC1(bool $projectC1): ContactSale
    {
        $this->project_c1 = $projectC1;

        return $this;
    }

    public function contact(): BelongsTo
    {
        return $this->belongsTo(Contact::class, 'contact_id');
    }

    public function source(): BelongsTo
    {
        return $this->belongsTo(Source::class, 'source_id');
    }

    public function status(): BelongsTo
    {
        return $this->belongsTo(SaleStatus::class, 'status_id');
    }
}
