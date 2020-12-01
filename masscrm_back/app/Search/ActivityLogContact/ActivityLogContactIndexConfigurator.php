<?php

namespace App\Search\ActivityLogContact;

use App\Models\ActivityLog\ActivityLogContact;
use App\Search\DefaultIndexConfigurator;
use ScoutElastic\Migratable;

class ActivityLogContactIndexConfigurator extends DefaultIndexConfigurator
{
    use Migratable;

    public const MESSAGE_FIELD = 'message';
    public const USER_NAME_FIELD = 'user_name';

    public const MAIN_FIELDS = [
        ActivityLogContact::ID_FIELD => [
            'type' => 'integer',
        ],
        ActivityLogContact::CONTACT_ID_FIELD => [
            'type' => 'integer',
        ],
        self::MESSAGE_FIELD => [
            'type' => 'text',
            'boost' => 100
        ],
        self::USER_NAME_FIELD => [
            'type' => 'text',
            'boost' => 90
        ],
    ];

    public const DATE_FIELDS = [
        ActivityLogContact::CREATED_AT => [
            'type' => 'date',
            'format' => self::DATE_FORMAT,
            'boost' => 100
        ]
    ];

    public function __construct() {
        $this->defaultMapping = [
            'properties' => array_merge(
                self::MAIN_FIELDS, self::DATE_FIELDS
            )
        ];
    }
}
