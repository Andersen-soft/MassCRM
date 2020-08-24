<?php

namespace App\Models;

use App\Models\Company\Company;
use App\Models\Contact\ContactCampaigns;
use App\Models\Contact\ContactSale;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class CampaignStatus
 * @package App
 * @property int $id
 * @property string $name
 * @property bool $active
 * @property Carbon $created_at
 * @property Carbon $updated_at
 */
class CampaignStatus extends Model
{
    public const STATUS_FIELD = 'status';

    protected $fillable = [
        'id',
        'name',
        'active',
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'name' => 'string',
        'active' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function getId(): int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): CampaignStatus
    {
        $this->name = $name;

        return $this;
    }

    public function isActive(): bool
    {
        return $this->active;
    }

    public function setActive(bool $active): CampaignStatus
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

    public function sequences(): HasMany
    {
        return $this->hasMany(ContactCampaigns::class, 'status_id');
    }
}
