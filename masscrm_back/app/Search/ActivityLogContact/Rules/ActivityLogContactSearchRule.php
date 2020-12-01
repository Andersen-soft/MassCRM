<?php

namespace App\Search\ActivityLogContact\Rules;

use App\Search\ActivityLogContact\ActivityLogContactIndexConfigurator;
use App\Search\DefaultSearchRule;

class ActivityLogContactSearchRule extends DefaultSearchRule
{
    protected array $searchFields = ActivityLogContactIndexConfigurator::MAIN_FIELDS;

    protected array $dateFields = ActivityLogContactIndexConfigurator::DATE_FIELDS;
}
