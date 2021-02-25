<?php declare(strict_types=1);

namespace App\Observers\Company;

use App\Models\ActivityLog\ActivityLogCompany;
use App\Models\Industry;
use App\Models\Company\CompanyIndustry;
use App\Services\ActivityLog\ActivityLog;
use Illuminate\Database\Eloquent\Model;

class CompanyIndustryObserver
{
    use ActivityLog;

    private $activeLogClass = ActivityLogCompany::class;

    public function created(CompanyIndustry $companyIndustry): void
    {
        /** @var Industry $industry */
        $industry = $companyIndustry->industry;

        $this->createEvent($companyIndustry, CompanyIndustry::INDUSTRY_FIELD, $industry->getName());
    }

    public function deleting(CompanyIndustry $companyIndustry): void
    {
        /** @var Industry $industry */
        $industry = $companyIndustry->industry;

        $this->deleteEvent($companyIndustry, CompanyIndustry::INDUSTRY_FIELD, $industry->getName());
    }

    protected static function prepareModelForLog(Model $model): array
    {
        return $model->industry->withoutRelations()->toArray();
    }
}
