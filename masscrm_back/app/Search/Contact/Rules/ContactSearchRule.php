<?php

namespace App\Search\Contact\Rules;

use App\Search\Contact\ContactIndexConfigurator;
use App\Search\DefaultSearchRule;

class ContactSearchRule extends DefaultSearchRule
{
    protected array $searchFields = ContactIndexConfigurator::MAIN_FIELDS;

    protected array $dateFields = ContactIndexConfigurator::DATE_FIELDS;

    protected array $rangeFields  = ContactIndexConfigurator::RANGE_FIELDS;
}
