<?php

namespace App\Models\Contact;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class ContactSocialNetworks
 * @package Contact
 * @property int $id
 * @property int $contact_id
 * @property string $link
 * @property boolean $active
 * @property Carbon $created_at
 * @property Carbon $updated_at
 */
class ContactSocialNetworks extends Model
{
    public const SOCIAL_FIELD = 'c_social';
    public const SOCIAL_NETWORKS_FIELD = 'social_networks';

    protected $fillable = [
        'id',
        'contact_id',
        'link',
        'active',
        'created_at',
        'updated_at'
    ];

    protected $casts = [
        'contact_id' => 'integer',
        'link' => 'string',
        'active' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function getId(): int
    {
        return $this->id;
    }

    public function getContactId(): ?int
    {
        return $this->contact_id;
    }

    public function getLink(): ?string
    {
        return $this->link;
    }

    public function setLink(?string $link): ContactSocialNetworks
    {
        $this->link = $link;

        return $this;
    }

    public function isActive(): bool
    {
        return $this->active;
    }

    public function setActive(bool $active): ContactSocialNetworks
    {
        $this->active = $active;

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

    public function scopeIsActive(Builder $query): Builder
    {
        return $query->where('active', true);
    }

    public function contact(): BelongsTo
    {
        return $this->belongsTo(Contact::class, 'contact_id');
    }
}
