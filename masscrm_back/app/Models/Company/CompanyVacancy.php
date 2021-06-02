<?php

declare(strict_types=1);

namespace App\Models\Company;

use App\Scopes\disableTimestampsScope;
use App\Traits\TemporaryResponsible;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class CompanyVacancy
 * @package App
 * @property int $id
 * @property int $company_id
 * @property string $vacancy
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property bool $active
 * @property string|null $skills
 * @property string|null $link
 * @property string|null $job_country
 * @property string|null $job_city
 * @property string|null $job_region
 */
class CompanyVacancy extends Model
{
    use disableTimestampsScope, TemporaryResponsible;

    public const COMPANY_VACANCY= 'CompanyVacancy';
    public const ACTIVE = true;
    public const IN_ACTIVE = false;
    public const JOBS = 'jobs';
    public const VACANCY = 'vacancy';
    public const SKILLS = 'skills';
    public const LINK = 'link';
    public const FIELD_ACTIVE = 'active';
    public const JOB_REGION = 'job_region';
    public const JOB_CITY = 'job_city';
    public const JOB_COUNTRY = 'job_country';
    public const COMPANY_ID = 'company_id';

    protected $fillable = [
        'id',
        'company_id',
        'vacancy',
        'created_at',
        'updated_at',
        'active',
        'skills',
        'link',
        'job_country',
        'job_city',
        'job_region'
    ];

    protected $casts = [
        'company_id' => 'integer',
        'vacancy' => 'string',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'active' => 'boolean',
        'skills' => 'string',
        'link' => 'string',
        'job_country' => 'string',
        'job_city' => 'string',
        'job_region' => 'string',
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

    public function getCompanyId(): int
    {
        return $this->company_id;
    }

    public function getVacancy(): string
    {
        return $this->vacancy;
    }

    public function setVacancy(string $vacancy): CompanyVacancy
    {
        $this->vacancy = $vacancy;

        return $this;
    }

    public function isActive(): bool
    {
        return $this->active;
    }

    public function setActive(bool $active): CompanyVacancy
    {
        $this->active = $active;

        return $this;
    }

    public function scopeIsActive(Builder $query): Builder
    {
        return $query->where('active', true);
    }

    public function getSkills(): ?string
    {
        return $this->skills;
    }

    public function setSkills(?string $skills): CompanyVacancy
    {
        $this->skills = $skills;

        return $this;
    }

    public function getLink(): ?string
    {
        return $this->link;
    }

    public function setLink(?string $link): CompanyVacancy
    {
        $this->link = $link;

        return $this;
    }

    public function getJobCountry(): ?string
    {
        return $this->job_country;
    }

    public function setJobCountry(?string $job_country): CompanyVacancy
    {
        $this->job_country = $job_country;

        return $this;
    }

    public function getJobCity(): ?string
    {
        return $this->job_city;
    }

    public function setJobCity(?string $job_city): CompanyVacancy
    {
        $this->job_city = $job_city;

        return $this;
    }

    public function getJobRegion(): ?string
    {
        return $this->job_region;
    }

    public function setJobRegion(?string $job_region): CompanyVacancy
    {
        $this->job_region = $job_region;

        return $this;
    }

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class, 'company_id');
    }
}
