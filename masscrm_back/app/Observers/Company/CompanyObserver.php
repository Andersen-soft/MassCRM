<?php declare(strict_types=1);

namespace App\Observers\Company;

use App\Models\ActivityLog\AbstractActivityLog;
use App\Models\ActivityLog\ActivityLogCompany;
use App\Models\Company\Company;
use App\Services\ActivityLog\ActivityLog;

class CompanyObserver
{
    use ActivityLog;

    private $activeLogClass = ActivityLogCompany::class;

    private static array $updateFieldLog = [
        Company::NAME_FIELD,
        Company::WEBSITE_FIELD,
        Company::LINKEDIN_FIELD,
        Company::STO_FULL_NAME_FIELD,
        Company::TYPE_FIELD,
        Company::FOUNDED_FIELD,
        Company::MIN_EMPLOYEES_FIELD,
        Company::MAX_EMPLOYEES_FIELD,
        Company::COMMENT_FIELD,
        Company::POSITION,
    ];

    public function created(Company $company): void
    {
        ($this->createLog(
            $company,
            AbstractActivityLog::CREATED_BASE_MODEL_EVENT,
            AbstractActivityLog::ID_FIELD,
            $company->getName(),
        ))->save();
    }

    public function deleted(Company $company): void
    {
        ($this->createLog(
            $company,
            AbstractActivityLog::DELETED_BASE_MODEL_EVENT,
            AbstractActivityLog::ID_FIELD,
            null,
            $company->getName()
        ))->save();
        $this->searchable($company);
    }

    public function updated(Company $company): void
    {
        $this->updateEvent($company);
        $this->searchable($company);
    }

    /**
     * Handle the User "deleted" event.
     *
     * @param Company $company
     * @return void
     */
    private function searchable(Company $company): void
    {
        if ($company->contacts()->exists()) {
            $company->contacts->searchable();
        }
    }
}
