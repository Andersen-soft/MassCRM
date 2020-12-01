<?php declare(strict_types=1);

namespace App\Models\Company;

use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Industry;

/**
 * Class CompanyIndustry
 * @package App
 * @property int $company_id
 * @property int $industry_id
 */
class CompanyIndustry extends Pivot
{
    protected $table = 'companies_industries';

    public const INDUSTRY_FIELD = 'industry';

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class, 'company_id');
    }

    public function industry(): BelongsTo
    {
        return $this->belongsTo(Industry::class, 'industry_id');
    }
}
