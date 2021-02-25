<?php declare(strict_types=1);

namespace App\Models\Company;

use App\Models\Company\Fields\CompanyFields;
use App\Models\Contact\Contact;
use App\Models\Industry;
use App\Models\User\User;
use App\Scopes\disableTimestampsScope;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class Company
 * @package App
 * @property int $id
 * @property string $name
 * @property Carbon|null $created_at
 * @property Carbon $updated_at
 * @property string|null $website
 * @property string|null $linkedin
 * @property string|null $sto_full_name
 * @property string|null $type
 * @property Carbon|null $founded
 * @property int|null $min_employees
 * @property int|null $max_employees
 * @property string|null $comment
 * @property array|null $vacancies_collection
 * @property array|null $industries_collection
 * @property array|null $subsidiaries_collection
 * @property boolean $is_upload_collection
 * @property int|null $user_id
 */
class Company extends CompanyFields
{
    use disableTimestampsScope;

    public const SIZE_FIELD = 'comp_size';
    public const TYPE_COMPANY_SUBSIDIARY = 'Subsidiary';
    public const TYPE_COMPANY_HOLDING = 'Holding';

    protected $fillable = [
        self::ID_FIELD,
        self::NAME_FIELD,
        self::CREATED_AT,
        self::UPDATED_AT,
        self::WEBSITE_FIELD,
        self::LINKEDIN_FIELD,
        self::STO_FULL_NAME_FIELD,
        self::TYPE_FIELD,
        self::FOUNDED_FIELD,
        self::MIN_EMPLOYEES_FIELD,
        self::MAX_EMPLOYEES_FIELD,
        self::COMMENT_FIELD,
        self::VACANCIES_COllECTION_FIELD,
        self::INDUSTRIES_COllECTION_FIELD,
        self::SUBSIDIARIES_COllECTION_FIELD,
        self::IS_UPLOAD_COLLECTION_FIELD,
        self::USER_ID_FIELD,
    ];

    protected $casts = [
        self::NAME_FIELD => 'string',
        self::CREATED_AT => 'datetime',
        self::UPDATED_AT => 'datetime',
        self::WEBSITE_FIELD => 'string',
        self::LINKEDIN_FIELD => 'string',
        self::STO_FULL_NAME_FIELD => 'string',
        self::TYPE_FIELD => 'string',
        self::FOUNDED_FIELD => 'datetime',
        self::MIN_EMPLOYEES_FIELD => 'integer',
        self::MAX_EMPLOYEES_FIELD => 'integer',
        self::COMMENT_FIELD => 'string',
        self::VACANCIES_COllECTION_FIELD => 'array',
        self::INDUSTRIES_COllECTION_FIELD => 'array',
        self::SUBSIDIARIES_COllECTION_FIELD => 'array',
        self::IS_UPLOAD_COLLECTION_FIELD => 'boolean',
        self::USER_ID_FIELD => 'integer',
    ];

    public function getId(): int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): Company
    {
        $this->name = $name;

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

    public function getWebsite(): ?string
    {
        return $this->website;
    }

    public function setWebsite(?string $website): Company
    {
        $this->website = $website;

        return $this;
    }

    public function getLinkedin(): ?string
    {
        return $this->linkedin;
    }

    public function setLinkedin(?string $linkedin): Company
    {
        $this->linkedin = $linkedin;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(?string $type): Company
    {
        $this->type = $type;

        return $this;
    }

    public function isSubsidiary(): bool
    {
        return $this->type === self::TYPE_COMPANY_SUBSIDIARY;
    }

    public function isHolding(): bool
    {
        return $this->type === self::TYPE_COMPANY_HOLDING;
    }

    public function getFounded(): ?Carbon
    {
        return $this->founded;
    }

    public function getFoundedDate(): ?string
    {
        if ($this->founded) {
            return $this->founded->format(self::DATE_FORMAT);
        }

        return $this->founded;
    }

    public function getCreatedAtDate(): ?string
    {
        if ($this->created_at) {
            return $this->created_at->format(self::DATE_FORMAT);
        }

        return $this->created_at;
    }

    public function setFounded(?Carbon $founded): Company
    {
        $this->founded = $founded;

        return $this;
    }

    public function getStoFullName(): ?string
    {
        return $this->sto_full_name;
    }

    public function setStoFullName(?string $stoFullName): Company
    {
        $this->sto_full_name = $stoFullName;

        return $this;
    }

    public function contacts(): HasMany
    {
        return $this->hasMany(Contact::class, 'company_id');
    }

    public function vacancies(): HasMany
    {
        return $this->hasMany(CompanyVacancy::class, 'company_id');
    }

    public function industries(): BelongsToMany
    {
        return $this->belongsToMany(Industry::class, 'companies_industries')->using(CompanyIndustry::class);
    }

    public function getMinEmployees(): ?int
    {
        return $this->min_employees;
    }

    public function setMinEmployees(?int $minEmployees): Company
    {
        $this->min_employees = $minEmployees;

        return $this;
    }

    public function getMaxEmployees(): ?int
    {
        return $this->max_employees;
    }

    public function setMaxEmployees(?int $maxEmployees): Company
    {
        $this->max_employees = $maxEmployees;

        return $this;
    }

    public function companySubsidiary(): BelongsToMany
    {
        return $this->belongsToMany(
            __CLASS__,
            'company_subsidiaries',
            'parent_id',
            'child_id'
        )->using(CompanySubsidiary::class);
    }

    public function getCreatedAtDateTime(): string
    {
        return $this->created_at->format(self::DATE_TIME_FORMAT);
    }

    public function getUpdatedAtDateTime(): string
    {
        return $this->updated_at->format(self::DATE_TIME_FORMAT);
    }

    public function isField(string $field): bool
    {
        return in_array($field, $this->fillable);
    }

    /**
     * @param string $field
     * @param mixed $value
     * @param bool $merge
     * @return $this
     */
    public function setValue(string $field, $value = null, bool $merge = false): Company
    {
        switch ($field) {
            case self::COMPANY_FIELD:
            case self::NAME_FIELD:
                if ($this->notMerge($merge, self::NAME_FIELD)) {
                    break;
                }
                $this->setName($value);
                break;
            case self::WEBSITE_FIELD:
                if ($this->notMerge($merge, self::WEBSITE_FIELD)) {
                    break;
                }
                $this->setWebsite($value);
                break;
            case self::COMPANY_SALE_PREFIX . self::LINKEDIN_FIELD:
            case self::LINKEDIN_FIELD:
                if ($this->notMerge($merge, self::LINKEDIN_FIELD)) {
                    break;
                }
                $this->setLinkedin($value);
                break;
            case self::STO_FULL_NAME_FIELD:
                if ($this->notMerge($merge, self::STO_FULL_NAME_FIELD)) {
                    break;
                }
                $this->setStoFullName($value);
                break;
            case self::TYPE_FIELD:
                if ($this->notMerge($merge, self::TYPE_FIELD)) {
                    break;
                }
                $this->setType($value);
                break;
            case self::FOUNDED_FIELD:
                if ($this->notMerge($merge, self::FOUNDED_FIELD)) {
                    break;
                }
                $this->setFounded(Carbon::parse($value));
                break;
            case self::MIN_EMPLOYEES_FIELD:
                if ($this->notMerge($merge, self::MIN_EMPLOYEES_FIELD)) {
                    break;
                }
                $this->setMinEmployees((int) $value);
                break;
            case self::MAX_EMPLOYEES_FIELD:
                if ($this->notMerge($merge, self::MAX_EMPLOYEES_FIELD)) {
                    break;
                }
                $this->setMaxEmployees((int) $value);
                break;
            case self::COMPANY_SALE_PREFIX . self::COMMENT_FIELD:
            case self::COMMENT_FIELD:
                if ($this->notMerge($merge, self::COMMENT_FIELD)) {
                    break;
                }
                $this->setComment($value);
                break;
        }

        return $this;
    }

    public function notMerge(bool $merge, string $field): bool
    {
        if ($merge && !is_null($this->{$field})) {
            return true;
        }

        return false;
    }

    public function getComment(): ?string
    {
        return $this->comment;
    }

    public function setComment(?string $comment): Company
    {
        $this->comment = $comment;

        return $this;
    }

    public function getUserId(): ?int
    {
        return $this->user_id;
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
