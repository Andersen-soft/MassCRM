<?php

namespace App\Models\Contact;

use App\Models\CampaignStatus;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class ContactCampaigns
 * @package App
 * @property int $id
 * @property int $contact_id
 * @property int $status_id
 * @property string $sequence
 * @property Carbon $created_at
 * @property Carbon $updated_at
 */
class ContactCampaigns extends Model
{
    public const SEQUENCE_FIELD = 'sequence';
    public const STATUS_ID_FIELD = 'status_id';

    protected $fillable = [
        'id',
        'contact_id',
        'status_id',
        'sequence',
        'created_at',
        'updated_at'
    ];

    protected $casts = [
        'contact_id' => 'integer',
        'status_id' => 'integer',
        'sequence' => 'string',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function getId(): int
    {
        return $this->id;
    }

    public function getCreatedAt(): Carbon
    {
        return $this->created_at;
    }

    public function getUpdatedAt(): Carbon
    {
        return $this->updated_at;
    }

    public function getContactId(): int
    {
        return $this->contact_id;
    }

    public function getStatusId(): int
    {
        return $this->status_id;
    }

    public function getSequence(): string
    {
        return $this->sequence;
    }

    public function setSequence(string $sequence): ContactCampaigns
    {
        $this->sequence = $sequence;

        return $this;
    }

    public function contact(): BelongsTo
    {
        return $this->belongsTo(Contact::class, 'contact_id');
    }

    public function status(): BelongsTo
    {
        return $this->belongsTo(CampaignStatus::class, 'status_id');
    }
}
