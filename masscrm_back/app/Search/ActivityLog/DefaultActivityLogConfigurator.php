<?php
declare(strict_types=1);

namespace App\Search\ActivityLog;

use App\Models\ActivityLog\AbstractActivityLog;
use App\Search\DefaultIndexConfigurator;

abstract class DefaultActivityLogConfigurator extends DefaultIndexConfigurator
{
    public const MESSAGE_FIELD = 'message';
    public const USER_NAME_FIELD = 'user_name';

    public const DEFAULT_MAIN_FIELDS = [
        self::MESSAGE_FIELD => [
            'type' => 'text',
            'boost' => 100
        ],
        self::USER_NAME_FIELD => [
            'type' => 'text',
            'boost' => 90
        ],
    ];

    public const DEFAULT_DATE_FIELDS = [
        AbstractActivityLog::CREATED_AT => [
            'type' => 'date',
            'format' => self::DATE_FORMAT,
            'boost' => 100
        ]
    ];
}
