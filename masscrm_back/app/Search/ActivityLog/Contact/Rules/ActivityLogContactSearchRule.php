<?php
declare(strict_types=1);

namespace App\Search\ActivityLog\Contact\Rules;

use App\Search\ActivityLog\Contact\ActivityLogContactIndexConfigurator;
use App\Search\DefaultSearchRule;

class ActivityLogContactSearchRule extends DefaultSearchRule
{
    protected array $searchFields = ActivityLogContactIndexConfigurator::MAIN_FIELDS;
    protected array $dateFields = ActivityLogContactIndexConfigurator::DATE_FIELDS;
}
