<?php

namespace App\Models\Company;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

/**
 * Class CompanySubsidiary
 * @package App
 * @property int $id
 * @property int $parent_id
 * @property int $child_id
 */
class CompanySubsidiary extends Pivot
{
    public $table = 'company_subsidiaries';
    public const SUBSIDIARY = 'subsidiary';
    public const HOLDING = 'holding';
    public $timestamps = false;
    public const SUBSIDIARIES_FIELD = 'subsidiaries';

    protected $fillable = [
        'id',
        'parent_id',
        'child_id',
    ];

    protected $casts = [
        'parent_id' => 'integer',
        'child_id' => 'integer',
    ];

    public function getId(): int
    {
        return $this->id;
    }

    public function getParentId(): int
    {
        return $this->parent_id;
    }

    public function getChildId(): int
    {
        return $this->child_id;
    }

    public function setChildId(int $childId): CompanySubsidiary
    {
        $this->child_id = $childId;

        return $this;
    }

    public function setParentId(int $parentId): CompanySubsidiary
    {
        $this->parent_id = $parentId;

        return $this;
    }

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class, 'parent_id');
    }

    public function companyChild(): BelongsTo
    {
        return $this->belongsTo(Company::class, 'child_id');
    }
}
