<?php
declare(strict_types=1);

namespace App\Search\ActivityLog\Company\Rules;

use App\Search\ActivityLog\Company\ActivityLogCompanyIndexConfigurator;
use App\Search\DefaultSearchRule;

class ActivityLogCompanySearchRule extends DefaultSearchRule
{
    protected array $searchFields = ActivityLogCompanyIndexConfigurator::MAIN_FIELDS;
    protected array $dateFields = ActivityLogCompanyIndexConfigurator::DATE_FIELDS;
}
