<?php

declare(strict_types=1);

namespace App\Models\Contact\Fields;

use App\Models\BaseModel;
use App\Models\FieldsInterface;
use App\Models\SaleStatus;
use App\Models\Source;
use App\Services\Reports\SearchType;

class ContactSaleFields extends BaseModel implements FieldsInterface
{
    public const CONTACT_SALE_PREFIX = 'cS_';
    public const JOIN = 'join';
    public const SALE = 'sale';
    public const JOIN_SALE_TABLE = [
        'table' => 'contact_sales',
        'first' => 'contact_sales.contact_id',
        'second' => 'contacts.id'
    ];

    public const JOIN_SALE_SOURCE_TABLE = [
        self::JOIN_SALE_TABLE,
        [
            'table' => 'sources',
            'first' => 'contact_sales.source_id',
            'second' => 'sources.id'
        ]
    ];

    public const JOIN_SALE_STATUS_TABLE = [
        self::JOIN_SALE_TABLE,
        [
            'table' => 'sale_statuses',
            'first' => 'sale_statuses.id',
            'second' => 'contact_sales.status_id'
        ]
    ];

    public const CONTACT_ID_FIELD = 'contact_id';
    public const LINK_FIELD = 'link';
    public const STATUS_ID_FIELD = 'status_id';
    public const PROJECT_C1_FIELD = 'project_c1';
    public const SOURCE_ID_FIELD = 'source_id';

    public const FIELDS = [
        self::ID_FIELD => [
            self::SORT => true,
            self::SEARCH => true,
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_VALUE_SELECT,
            self::FIELD => 'contact_sales.id'
        ],
        self::CREATED_AT_FIELD => [
            self::SORT => true,
            self::SEARCH => true,
            self::FORMAT => self::DATE_TIME_FORMAT,
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_DATA_RANGE,
            self::FIELD => 'contact_sales.created_at',
            self::JOIN => [self::JOIN_SALE_TABLE]
        ],
        self::UPDATED_AT_FIELD => [
            self::SORT => false,
            self::SEARCH => false,
            self::FORMAT => self::DATE_TIME_FORMAT,
        ],
        self::CONTACT_ID_FIELD => [
            self::SORT => false,
            self::SEARCH => false,
        ],
        self::LINK_FIELD => [
            self::SORT => true,
            self::SEARCH => true,
            self::FIELD => 'contact_sales.link',
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_TEXT_LIKE,
            self::JOIN => [self::JOIN_SALE_TABLE]
        ],
        self::STATUS_ID_FIELD => [
            self::SORT => false,
            self::SEARCH => false,
        ],
        self::PROJECT_C1_FIELD => [
            self::SORT => true,
            self::SEARCH => true,
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_VALUE_SELECT,
            self::FIELD => 'contact_sales.project_c1',
            self::JOIN => [self::JOIN_SALE_TABLE]
        ],
        self::SOURCE_ID_FIELD => [
            self::SORT => false,
            self::SEARCH => false,
        ],
        Source::SOURCE => [
            self::SORT => true,
            self::SEARCH => true,
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_MULTI_SELECT,
            self::FIELD => 'sources.name',
            self::JOIN => self::JOIN_SALE_SOURCE_TABLE
        ],
        SaleStatus::STATUS => [
            self::SORT => true,
            self::SEARCH => true,
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_MULTI_SELECT,
            self::FIELD => 'sale_statuses.name',
            self::JOIN => self::JOIN_SALE_STATUS_TABLE
        ],
    ];

    public static function getFieldsToSearch(): array
    {
        return self::getFieldsTo(self::FIELDS, self::SEARCH);
    }

    public static function getFieldsToSort(): array
    {
        return self::getFieldsTo(self::FIELDS, self::SORT);
    }
}
