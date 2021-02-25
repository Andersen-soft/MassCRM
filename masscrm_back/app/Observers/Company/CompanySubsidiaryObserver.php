<?php declare(strict_types=1);

namespace App\Observers\Company;

use App\Models\ActivityLog\ActivityLogCompany;
use App\Models\Company\Company;
use App\Models\Company\CompanySubsidiary;
use App\Services\ActivityLog\ActivityLog;
use Illuminate\Database\Eloquent\Model;

class CompanySubsidiaryObserver
{
    use ActivityLog;

    private $activeLogClass = ActivityLogCompany::class;

    public function created(CompanySubsidiary $companySubsidiary): void
    {
        /** @var Company $companyChild */
        $companyChild = $companySubsidiary->companyChild;

        $this->createEvent($companySubsidiary, CompanySubsidiary::SUBSIDIARIES_FIELD, $companyChild->getName());
    }

    protected static function prepareModelForLog(Model $model): array
    {
        return $model->companyChild->withoutRelations()->toArray();
    }

    public function deleting(CompanySubsidiary $companySubsidiary): void
    {
        /** @var Company $companyChild */
        $companyChild = $companySubsidiary->companyChild;

        $this->deleteEvent($companySubsidiary, CompanySubsidiary::SUBSIDIARIES_FIELD, $companyChild->getName());
    }
}
