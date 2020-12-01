<?php declare(strict_types=1);

namespace App\Models\User\Fields;

use App\Models\BaseModel;
use App\Services\Reports\SearchType;

class UserFields extends BaseModel
{
    public const FULL_NAME_FIELD = 'fullName';
    public const NAME_FIELD = 'name';
    public const SURNAME_FIELD = 'surname';
    public const EMAIL_FIELD = 'email';
    public const LOGIN_FIELD = 'login';
    public const ROLES_FIELD = 'roles';
    public const SKYPE_FIELD = 'skype';
    public const POSITION_FIELD = 'position';
    public const ACTIVE_FIELD = 'active';

    public const FIELDS = [
        self::FULL_NAME_FIELD => [
            self::SORT => true,
            self::SEARCH => true,
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_FIO_TEXT_LIKE,
            self::FIELD => "concat_ws(' ', name, surname)",
            self::SORT_FIELD => 'name'
        ],
        self::EMAIL_FIELD => [
            self::SORT => true,
            self::SEARCH => true,
            self::FORMAT => self::DATE_TIME_FORMAT,
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_TEXT_LIKE,
            self::FIELD => 'email'
        ],
        self::LOGIN_FIELD => [
            self::SORT => true,
            self::SEARCH => true,
            self::FORMAT => self::DATE_TIME_FORMAT,
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_TEXT_LIKE,
            self::FIELD => 'login'
        ],
        self::ROLES_FIELD => [
            self::SORT => true,
            self::SEARCH => true,
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_ROLES_USER,
            self::FIELD => 'roles'
        ],
        self::SKYPE_FIELD => [
            self::SORT => true,
            self::SEARCH => true,
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_TEXT_LIKE,
            self::FIELD => 'skype'
        ],
        self::POSITION_FIELD => [
            self::SORT => true,
            self::SEARCH => true,
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_TEXT_LIKE,
            self::FIELD => 'position'
        ],
        self::ACTIVE_FIELD => [
            self::SORT => true,
            self::SEARCH => true,
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_STATUS_STRICT,
            self::FIELD => 'active',
        ]
    ];
}
