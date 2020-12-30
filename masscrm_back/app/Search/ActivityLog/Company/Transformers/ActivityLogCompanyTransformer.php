<?php
declare(strict_types=1);

namespace App\Search\ActivityLog\Company\Transformers;

use App\Models\ActivityLog\AbstractActivityLog;
use App\Models\ActivityLog\ActivityLogCompany;
use App\Search\ActivityLog\DefaultActivityLogTransformer;

class ActivityLogCompanyTransformer extends DefaultActivityLogTransformer
{
    protected array $data = [];

    public function transform(AbstractActivityLog $activityLog): array
    {
        return parent::transform($activityLog) + [
                ActivityLogCompany::COMPANY_ID_FIELD => $activityLog->getCompanyId()
            ];
    }
}
