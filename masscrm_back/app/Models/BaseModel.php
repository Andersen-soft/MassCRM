<?php

namespace App\Models;

use App\Models\Company\Company;
use App\Models\Contact\Contact;
use App\Models\Contact\ContactSale;
use Illuminate\Database\Eloquent\Model;

/**
 * Class BaseModel
 * @package App
 */
class BaseModel extends Model
{
    public const MODE_ALL = 'all';

    public const DATE_TIME_FORMAT = 'd.m.Y H:i';
    public const DATE_FORMAT = 'd.m.Y';

    public const SEARCH = 'search';
    public const FORMAT = 'format';
    public const SORT = 'sort';
    public const TYPE_FILTER = 'type_filter';
    public const FIELD = 'field';
    public const SORT_FIELD = 'sortField';

    public const ID_FIELD = 'id';
    public const CREATED_AT_FIELD = 'created_at';
    public const UPDATED_AT_FIELD = 'updated_at';
    public const USER_ID_FIELD = 'user_id';

    protected static function getFieldsTo(array $fields, string $type = self::SEARCH): array
    {
        $foundFields = [];
        foreach ($fields as $name => $properties) {
            if (isset($properties[$type]) && $properties[$type] === true) {
                $foundFields[] = $name;
            }
        }

        return $foundFields;
    }

    public static function getFilterConfig(string $fieldName, string $parent): array
    {
        switch ($parent) {
            case Company::COMPANY_FIELD:
                $config = Company::FIELDS[$fieldName] ?? [];
                break;
            case ContactSale::SALE:
                $config = ContactSale::FIELDS[$fieldName] ?? [];
                break;
            default:
                $config = Contact::FIELDS[$fieldName] ?? [];
        }

        return $config;
    }
}
