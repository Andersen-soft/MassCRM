<?php

namespace App\Search\Contact;

use App\Models\CampaignStatus;
use App\Models\Company\CompanySubsidiary;
use App\Models\Company\CompanyVacancy;
use App\Models\Company\Fields\CompanyFields;
use App\Models\Contact\Contact;
use App\Models\Contact\ContactCampaigns;
use App\Models\Contact\ContactSale;
use App\Models\SaleStatus;
use App\Models\Source;
use App\Search\DefaultIndexConfigurator;
use ScoutElastic\Migratable;

class ContactIndexConfigurator extends DefaultIndexConfigurator
{
    use Migratable;

    public const COMPANY_PREFIX = 'company.';

    public const MAIN_FIELDS = [
        Contact::ID_FIELD => [
            'type' => 'integer',
        ],
        Contact::EMAIL_COLLECTION_FIELD => [
            'type' => 'text',
            'boost' => 100
        ],
        Contact::POSITION_FIELD => [
            'type' => 'text',
            'boost' => 99
        ],
        Contact::FIRST_NAME_FIELD => [
            'type' => 'text',
            'boost' => 98
        ],
        Contact::LAST_NAME_FIELD => [
            'type' => 'text',
            'boost' => 97
        ],
        Contact::COUNTRY_FIELD => [
            'type' => 'text',
            'boost' => 94,
        ],
        Contact::REGION_FIELD => [
            'type' => 'text',
            'boost' => 93
        ],
        Contact::CITY_FIELD => [
            'type' => 'text',
            'boost' => 92
        ],
        Contact::COMMENT_FIELD => [
            'type' => 'text',
            'boost' => 85
        ],
        Contact::RESPONSIBLE => [
            'type' => 'text',
            'boost' => 83
        ],
        Contact::SEQUENCE_COLLECTION_FIELD => [
            'type' => 'object',
            'properties'=> [
                ContactCampaigns::SEQUENCE_FIELD => [
                    'type' => 'text',
                    'boost' => 82
                ],
                CampaignStatus::STATUS_FIELD => [
                    'type' => 'text',
                    'boost' => 82
                ]
            ]
        ],
        Contact::FULL_NAME_FIELD => [
            'type' => 'text',
            'boost' => 81
        ],
        Contact::CONFIDENCE_FIELD => [
            'type' => 'text',
            'boost' => 80
        ],
        Contact::MAIL_COLLECTION_FIELD => [
            'type' => 'text',
            'boost' => 79
        ],
        Contact::NOTE_COLLECTION_FIELD => [
            'type' => 'text',
            'boost' => 78
        ],
        Contact::SALE_COLLECTION_FIELD => [
            'type' => 'object',
            'properties'=> [
                Source::SOURCE => [
                    'type' => 'text',
                    'boost' => 87
                ],
                SaleStatus::STATUS => [
                    'type' => 'text',
                    'boost' => 87
                ],
                ContactSale::PROJECT_C1_FIELD => [
                    'type' => 'text',
                    'boost' => 87
                ],
                ContactSale::CREATED_AT => [
                    'type' => 'date',
                    'format' => self::DATE_FORMAT,
                    'boost' => 96
                ]
            ]
        ],
        Contact::PHONE_COLLECTION_FIELD => [
            'type' => 'text',
            'boost' => 76
        ],

        // Company
        self::COMPANY_PREFIX . CompanyFields::NAME_FIELD => [
            'type' => 'text',
            'boost' => 96
        ],
        self::COMPANY_PREFIX . CompanyFields::INDUSTRIES_COllECTION_FIELD => [
            'type' => 'text',
            'boost' => 95
        ],
        self::COMPANY_PREFIX . CompanyFields::WEBSITE_FIELD => [
            'type' => 'text',
            'boost' => 90
        ],
        self::COMPANY_PREFIX . CompanyFields::STO_FULL_NAME_FIELD => [
            'type' => 'text',
            'boost' => 88
        ],
        self::COMPANY_PREFIX . CompanyFields::VACANCIES_COllECTION_FIELD => [
            'type' => 'object',
            'properties'=> [
                CompanyVacancy::JOBS => [
                    'type' => 'text',
                    'boost' => 87
                ],
                CompanyVacancy::SKILLS => [
                    'type' => 'text',
                    'boost' => 86
                ],
                CompanyVacancy::LINK => [
                    'type' => 'text',
                    'boost' => 86
                ],
            ]
        ],
        self::COMPANY_PREFIX . CompanyFields::SUBSIDIARIES_COllECTION_FIELD => [
            'type' => 'object',
            'properties'=> [
                CompanySubsidiary::SUBSIDIARY => [
                    'type' => 'text',
                    'boost' => 77
                ],
                CompanySubsidiary::HOLDING => [
                    'type' => 'text',
                    'boost' => 77
                ]
            ]
        ],
    ];

    public const DATE_FIELDS = [
        Contact::CREATED_AT => [
            'type' => 'date',
            'format' => self::DATE_FORMAT,
            'boost' => 100
        ],
        Contact::UPDATED_AT => [
            'type' => 'date',
            'format' => self::DATE_FORMAT,
            'boost' => 99
        ],
        Contact::DATE_OF_USE_FIELD => [
            'type' => 'date',
            'format' => self::DATE_FORMAT,
            'boost' => 98
        ],
        Contact::LAST_TOUCH_FIELD => [
            'type' => 'date',
            'format' => self::DATE_FORMAT,
            'boost' => 97
        ],
        Contact::BIRTHDAY_FIELD => [
            'type' => 'date',
            'format' => self::DATE_FORMAT,
            'boost' => 96
        ],

        // Company
        self::COMPANY_PREFIX . CompanyFields::FOUNDED_FIELD => [
            'type' => 'date',
            'format' => self::DATE_FORMAT,
            'boost' => 95
        ],
        self::COMPANY_PREFIX . CompanyFields::CREATED_AT => [
            'type' => 'date',
            'format' => self::DATE_FORMAT,
            'boost' => 94
        ]
    ];

    public const RANGE_FIELDS = [
        self::COMPANY_PREFIX . CompanyFields::COMPANY_SIZE_FIELD => [
            'type' => 'integer_range',
            'boost' => 84
        ],
    ];

    public function __construct() {
        $this->defaultMapping = [
            'properties' => array_merge(
                self::MAIN_FIELDS, self::DATE_FIELDS, self::RANGE_FIELDS
            )
        ];
    }
}
