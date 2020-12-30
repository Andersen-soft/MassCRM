<?php
declare(strict_types=1);

namespace App\Search\ActivityLog\Contact;

use App\Models\ActivityLog\ActivityLogContact;
use App\Search\ActivityLog\DefaultActivityLogConfigurator;

class ActivityLogContactIndexConfigurator extends DefaultActivityLogConfigurator
{
    public const MAIN_FIELDS = self::DEFAULT_MAIN_FIELDS + [
        ActivityLogContact::CONTACT_ID_FIELD => [
            'type' => 'integer',
        ],
    ];

    public const DATE_FIELDS = self::DEFAULT_DATE_FIELDS;

    public function __construct()
    {
        $this->defaultMapping = [
            'properties' => array_merge(
                self::MAIN_FIELDS, self::DATE_FIELDS
            )
        ];
    }
}
