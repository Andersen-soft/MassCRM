<?php

namespace App\Models\Contact\Fields;

use App\Models\BaseModel;
use App\Models\FieldsInterface;
use App\Models\SaleStatus;
use App\Models\Source;
use App\Services\Reports\SearchType;

class ContactSaleFields extends BaseModel implements FieldsInterface
{
    public const CONTACT_SALE_PREFIX = 'cS_';
    public const SALE = 'sale';

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
            self::FIELD => 'contact_sales.created_at'
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
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_TEXT_LIKE
        ],
        self::STATUS_ID_FIELD => [
            self::SORT => false,
            self::SEARCH => false,
        ],
        self::PROJECT_C1_FIELD => [
            self::SORT => true,
            self::SEARCH => true,
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_VALUE_SELECT,
            self::FIELD => 'contact_sales.project_c1'
        ],
        self::SOURCE_ID_FIELD => [
            self::SORT => false,
            self::SEARCH => false,
        ],
        Source::SOURCE => [
            self::SORT => true,
            self::SEARCH => true,
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_MULTI_SELECT,
            self::FIELD => 'sources.name'
        ],
        SaleStatus::STATUS => [
            self::SORT => true,
            self::SEARCH => true,
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_MULTI_SELECT,
            self::FIELD => 'sale_statuses.name'
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
