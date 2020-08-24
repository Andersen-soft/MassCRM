<?php

namespace App\Models;

use App\Models\Company\Company;
use App\Models\Company\CompanyIndustry;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * Class Industry
 * @package App
 * @property int $id
 * @property string $name
 * @property bool $active
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property int $block
 * @property int $position
 */
class Industry extends Model
{
    public const INDUSTRY_FIELD = 'industry';

    protected $fillable = [
        'id',
        'name',
        'active',
        'created_at',
        'updated_at',
        'block',
        'position'
    ];

    protected $casts = [
        'name' => 'string',
        'active' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'block' => 'integer',
        'position' => 'integer',
    ];

    public function getId(): int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): Industry
    {
        $this->name = $name;

        return $this;
    }

    public function isActive(): bool
    {
        return $this->active;
    }

    public function setActive(bool $active): Industry
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

    public function companies(): BelongsToMany
    {
        return $this->belongsToMany(Company::class, 'companies_industries')->using(CompanyIndustry::class);
    }

    public function getBlock(): int
    {
        return $this->block;
    }

    public function setBlock(int $block): Industry
    {
        $this->block = $block;

        return $this;
    }

    public function getPosition(): int
    {
        return $this->position;
    }

    public function setPosition(int $position): Industry
    {
        $this->position = $position;

        return $this;
    }
}
