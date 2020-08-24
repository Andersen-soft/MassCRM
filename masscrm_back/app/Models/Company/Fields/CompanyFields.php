<?php

namespace App\Models\Company\Fields;

use App\Models\BaseModel;
use App\Models\Company\CompanyVacancy;
use App\Models\Company\CompanySubsidiary;
use App\Models\FieldsInterface;
use App\Models\Industry;
use App\Services\Reports\SearchType;

class CompanyFields extends BaseModel implements FieldsInterface
{
    public const COMPANY_SALE_PREFIX = 'comp_';

    public const COMPANY_FIELD = 'company';
    public const WEBSITE_FIELD = 'website';
    public const NAME_FIELD = 'name';
    public const LINKEDIN_FIELD = 'linkedin';
    public const STO_FULL_NAME_FIELD = 'sto_full_name';
    public const TYPE_FIELD = 'type';
    public const FOUNDED_FIELD = 'founded';
    public const MIN_EMPLOYEES_FIELD = 'min_employees';
    public const MAX_EMPLOYEES_FIELD = 'max_employees';
    public const COMPANY_SIZE_FIELD = 'company_size';
    public const COMMENT_FIELD = 'comment';

    public const FIELDS = [
        self::ID_FIELD => [
            self::SORT => true,
            self::SEARCH => false,
        ],
        self::CREATED_AT_FIELD => [
            self::SORT => true,
            self::SEARCH => true,
            self::FORMAT => self::DATE_TIME_FORMAT,
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_DATA_RANGE,
            self::FIELD => 'companies.created_at'
        ],
        self::UPDATED_AT_FIELD => [
            self::SORT => true,
            self::SEARCH => true,
            self::FORMAT => self::DATE_TIME_FORMAT,
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_DATA_RANGE,
            self::FIELD => 'companies.updated_at'
        ],
        self::WEBSITE_FIELD => [
            self::SORT => true,
            self::SEARCH => true,
            self::FIELD => 'companies.website',
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_TEXT_LIKE
        ],
        self::NAME_FIELD => [
            self::SORT => true,
            self::SEARCH => true,
            self::FIELD => 'companies.name',
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_MULTI_SELECT
        ],
        self::COMMENT_FIELD => [
            self::SORT => true,
            self::SEARCH => true,
            self::FIELD => 'companies.comment',
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_TEXT_LIKE
        ],
        self::LINKEDIN_FIELD => [
            self::SORT => true,
            self::SEARCH => true,
            self::FIELD => 'companies.linkedin',
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_TEXT_LIKE
        ],
        self::STO_FULL_NAME_FIELD => [
            self::SORT => true,
            self::SEARCH => true,
            self::FIELD => 'companies.sto_full_name',
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_TEXT_LIKE
        ],
        self::TYPE_FIELD => [
            self::SORT => true,
            self::SEARCH => true,
            self::FIELD => 'companies.type',
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_MULTI_SELECT
        ],
        self::FOUNDED_FIELD => [
            self::SORT => true,
            self::SEARCH => true,
            self::FIELD => 'companies.founded',
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_DATA_RANGE
        ],
        self::MIN_EMPLOYEES_FIELD => [
            self::SORT => false,
            self::SEARCH => false,
        ],
        self::MAX_EMPLOYEES_FIELD => [
            self::SORT => false,
            self::SEARCH => false,
        ],
        self::COMPANY_SIZE_FIELD => [
            self::SORT => false,
            self::SEARCH => true,
            self::FIELD => 'companies.min_employees',
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_COMPANY_SIZE_RANGE
        ],
        Industry::INDUSTRY_FIELD => [
            self::SORT => false,
            self::SEARCH => true,
            self::FIELD => 'industries.name',
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_MULTI_SELECT
        ],
        CompanyVacancy::JOBS => [
            self::SORT => false,
            self::SEARCH => true,
            self::FIELD => 'company_vacancies.vacancy',
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_MULTI_SELECT
        ],
        CompanyVacancy::SKILLS => [
            self::SORT => false,
            self::SEARCH => true,
            self::FIELD => 'company_vacancies.skills',
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_MULTI_SELECT
        ],
        CompanyVacancy::LINK => [
            self::SORT => false,
            self::SEARCH => true,
            self::FIELD => 'company_vacancies.link',
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_TEXT_LIKE
        ],
        CompanySubsidiary::SUBSIDIARY => [
            self::SORT => false,
            self::SEARCH => true,
            self::FIELD => 'companies_clone.name',
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_SUBSIDIARY_COMPANIES
        ],
        CompanySubsidiary::HOLDING => [
            self::SORT => false,
            self::SEARCH => true,
            self::FIELD => 'companies_clone.name',
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_HOLDING_COMPANIES
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
