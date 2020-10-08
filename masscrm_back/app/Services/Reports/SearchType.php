<?php

namespace App\Services\Reports;

use App\Models\Company\Fields\CompanyFields;
use App\Models\Contact\ContactSale;
use App\Models\Contact\Fields\ContactFields;

interface SearchType
{
    public const TYPE_SEARCH_FIELD_MULTI_SELECT = 'multiSelect';
    public const TYPE_SEARCH_FIELD_VALUE_SELECT = 'valueSelect';
    public const TYPE_SEARCH_FIELD_TEXT_LIKE = 'textLike';
    public const TYPE_SEARCH_FIELD_DATA_RANGE = 'dataRange';
    public const TYPE_SEARCH_FIELD_DATE_ONLY_MONTH_AND_DAY_RANGE = 'dateMonthDayRange';
    public const TYPE_SEARCH_FIELD_COMPANY_SIZE_RANGE = 'companySizeRange';
    public const TYPE_SEARCH_FIELD_BOUNCES = 'Bounces';
    public const TYPE_SEARCH_FIELD_FIO_TEXT_LIKE = 'FioTextLike';
    public const TYPE_SEARCH_FIELD_LINK_COLLEAGUE_TEXT_LIKE = 'ColleagueLink';
    public const TYPE_SEARCH_FIELD_MULTI_SELECT_STRICT = 'multiSelectStrict';
    public const TYPE_SEARCH_FIELD_RANGE = 'range';
    public const TYPE_SEARCH_SUBSIDIARY_COMPANIES = 'Subsidiary companies';
    public const TYPE_SEARCH_HOLDING_COMPANIES = 'Holding company';
    public const TYPE_SEARCH_ROLES_USER = 'Roles users';
    public const TYPE_SEARCH_STATUS_STRICT = 'Status Strict';

    public const LIST_FIELDS = [
        'responsible' => [
            'path' => 'contacts.getResponsible',
            'name' => 'Responsible',
            'field' => 'contacts.responsible',
            'typeSearch' => self::TYPE_SEARCH_FIELD_MULTI_SELECT
        ],
        'created' => [
            'path' => 'contacts.getCreatedAtDateTime',
            'name' => 'Created',
            'field' => 'contacts.created_at',
            'typeSearch' => self::TYPE_SEARCH_FIELD_DATA_RANGE
        ],
        'updated' => [
            'path' => 'contacts.getUpdatedAtDateTime',
            'name' => 'Updated',
            'field' => 'contacts.updated_at',
            'typeSearch' => self::TYPE_SEARCH_FIELD_DATA_RANGE
        ],
        'first_name' => [
            'path' => 'contacts.getFirstName',
            'name' => 'First name',
            'field' => 'contacts.first_name',
            'typeSearch' => self::TYPE_SEARCH_FIELD_TEXT_LIKE
        ],
        'last_name' => [
            'path' => 'contacts.getLastName',
            'name' => 'Last name',
            'field' => 'contacts.last_name',
            'typeSearch' => self::TYPE_SEARCH_FIELD_TEXT_LIKE
        ],
        'full_name' => [
            'path' => 'contacts.getFullName',
            'name' => 'Full name',
            'field' => 'contacts.full_name',
            'typeSearch' => self::TYPE_SEARCH_FIELD_TEXT_LIKE
        ],
        'gender' => [
            'path' => 'contacts.getGender',
            'name' => 'Gender',
            'field' => 'contacts.gender',
            'typeSearch' => self::TYPE_SEARCH_FIELD_MULTI_SELECT
        ],
        'birthday' => [
            'path' => 'contacts.getBirthdayDate',
            'name' => 'Date of birth',
            'field' => 'contacts.birthday',
            'typeSearch' => self::TYPE_SEARCH_FIELD_DATE_ONLY_MONTH_AND_DAY_RANGE
        ],
        'country' => [
            'path' => 'contacts.getCountry',
            'name' => 'Country',
            'field' => 'contacts.country',
            'typeSearch' => self::TYPE_SEARCH_FIELD_MULTI_SELECT
        ],
        'city' => [
            'path' => 'contacts.getCity',
            'name' => 'City',
            'field' => 'contacts.city',
            'typeSearch' => self::TYPE_SEARCH_FIELD_MULTI_SELECT
        ],
        'region' => [
            'path' => 'contacts.getRegion',
            'name' => 'Region',
            'field' => 'contacts.region',
            'typeSearch' => self::TYPE_SEARCH_FIELD_MULTI_SELECT
        ],
        'location' => [
            'path' => 'contacts.getLocation',
            'name' => 'Location',
            'field' => 'contacts.location',
            'typeSearch' => self::TYPE_SEARCH_FIELD_MULTI_SELECT
        ],
        'position' => [
            'path' => 'contacts.getPosition',
            'name' => 'Position',
            'field' => 'contacts.position',
            'typeSearch' => self::TYPE_SEARCH_FIELD_MULTI_SELECT
        ],
        'linkedin' => [
            'path' => 'contacts.getLinkedin',
            'name' => 'LinkedIn',
            'field' => 'contacts.linkedin',
            'typeSearch' => self::TYPE_SEARCH_FIELD_TEXT_LIKE
        ],
        'social_networks' => [
            'path' => 'getContactOtherSocialNetwork',
            'name' => 'Other social networks',
            'field' => 'contact_social_networks.link',
            'typeSearch' => self::TYPE_SEARCH_FIELD_TEXT_LIKE,
            'join' => [
                ContactFields::JOIN_CONTACT_SOCIAL_NETWORK_TABLE
            ]
        ],
        'phones' => [
            'path' => 'getContactPhones',
            'name' => 'Phone',
            'field' => 'contact_phones.phone',
            'typeSearch' => self::TYPE_SEARCH_FIELD_TEXT_LIKE,
            'join' => [
                ContactFields::JOIN_CONTACT_PHONES_TABLE
            ]
        ],
        'skype' => [
            'path' => 'contacts.getSkype',
            'name' => 'Skype',
            'field' => 'contacts.skype',
            'typeSearch' => self::TYPE_SEARCH_FIELD_TEXT_LIKE
        ],
        'emails' => [
            'path' => 'getContactEmails',
            'name' => 'E-mail',
            'field' => 'contact_emails.email',
            'typeSearch' => self::TYPE_SEARCH_FIELD_TEXT_LIKE,
            'join' => [
                ContactFields::JOIN_CONTACT_EMAIL_TABLE
            ]
        ],
        'origin' => [
            'path' => 'contacts.getOrigin',
            'name' => 'Origin',
            'field' => 'contacts.origin',
            'typeSearch' => self::TYPE_SEARCH_FIELD_MULTI_SELECT
        ],
        'mailing_tool' => [
            'path' => 'contacts.getMailingTool',
            'name' => 'Mailing tool',
            'field' => 'contacts.mailing_tool',
            'typeSearch' => self::TYPE_SEARCH_FIELD_MULTI_SELECT
        ],
        'requires_validation' => [
            'path' => 'getContactEmails',
            'name' => 'Requires validation',
            'field' => 'contact_emails.verification',
            'typeSearch' => self::TYPE_SEARCH_FIELD_MULTI_SELECT,
            'join' => [
                ContactFields::JOIN_CONTACT_EMAIL_TABLE
            ]
        ],
        'colleagues' => [
            'path' => 'getContactColleagues',
            'name' => 'Collegue 1',
            'field' => 'contact_colleagues.full_name',
            'typeSearch' => self::TYPE_SEARCH_FIELD_TEXT_LIKE,
            'sortField' => 'contact_colleagues.full_name',
            'join' => [
                ContactFields::JOIN_CONTACT_COLLEAGUES_TABLE
            ]
        ],
        'colleagues_link' => [
            'path' => 'getContactColleagues',
            'name' => 'Collegue Li',
            'field' => 'contact_colleagues.link',
            'typeSearch' => self::TYPE_SEARCH_FIELD_LINK_COLLEAGUE_TEXT_LIKE,
            'join' => [
                ContactFields::JOIN_CONTACT_COLLEAGUES_TABLE
            ]
        ],
        'service_id' => [
            'path' => 'contacts.getServiceId',
            'name' => 'ID',
            'field' => 'contacts.service_id',
            'typeSearch' => self::TYPE_SEARCH_FIELD_TEXT_LIKE
        ],
        'added_to_mailing' => [
            'path' => 'contacts.getAddedToMailingDateTime',
            'name' => 'Added to mailing',
            'field' => 'contacts.added_to_mailing',
            'typeSearch' => self::TYPE_SEARCH_FIELD_DATA_RANGE
        ],
        'confidence' => [
            'path' => 'contacts.getConfidence',
            'name' => 'Confidence',
            'field' => 'contacts.confidence',
            'typeSearch' => self::TYPE_SEARCH_FIELD_RANGE
        ],
        'last_touch' => [
            'path' => 'contacts.getLastTouchDateTime',
            'name' => 'Last touch',
            'field' => 'contacts.last_touch',
            'typeSearch' => self::TYPE_SEARCH_FIELD_DATA_RANGE
        ],
        'sequence' => [
            'path' => 'getContactSequences',
            'name' => 'Sequence',
            'field' => 'contact_campaigns.sequence',
            'typeSearch' => self::TYPE_SEARCH_FIELD_TEXT_LIKE,
            'join' => [
                ContactFields::JOIN_CONTACT_CAMPAIGNS_TABLE
            ]
        ],
        'opens' => [
            'path' => 'contacts.getOpens',
            'name' => 'Opens',
            'field' => 'contacts.opens',
            'typeSearch' => self::TYPE_SEARCH_FIELD_RANGE
        ],
        'views' => [
            'path' => 'contacts.getViews',
            'name' => 'Views',
            'field' => 'contacts.views',
            'typeSearch' => self::TYPE_SEARCH_FIELD_RANGE
        ],
        'deliveries' => [
            'path' => 'contacts.getDeliveries',
            'name' => 'Deliveries',
            'field' => 'contacts.deliveries',
            'typeSearch' => self::TYPE_SEARCH_FIELD_RANGE
        ],
        'replies' => [
            'path' => 'contacts.getReplies',
            'name' => 'Replies',
            'field' => 'contacts.replies',
            'typeSearch' => self::TYPE_SEARCH_FIELD_RANGE
        ],
        'bounces' => [
            'path' => 'contacts.getBounces',
            'name' => 'Bounces',
            'field' => 'contacts.bounces',
            'typeSearch' => self::TYPE_SEARCH_FIELD_BOUNCES
        ],
        'status' => [
            'path' => 'getContactSequences',
            'name' => 'Status',
            'field' => 'campaign_statuses.name',
            'typeSearch' => self::TYPE_SEARCH_FIELD_MULTI_SELECT,
            'join' => ContactFields::JOIN_CONTACT_CAMPAIGN_STATUSES_TABLE
        ],
        'mails' => [
            'path' => 'getContactMails',
            'name' => 'Mails',
            'field' => 'contact_mails.message',
            'typeSearch' => self::TYPE_SEARCH_FIELD_TEXT_LIKE,
            'join' => [
                ContactFields::JOIN_CONTACT_MAILS_TABLE
            ]
        ],
        'my_notes' => [
            'path' => 'getContactNotes',
            'name' => 'My notes',
            'field' => 'contact_notes.message',
            'typeSearch' => self::TYPE_SEARCH_FIELD_TEXT_LIKE,
            'join' => [
                ContactFields::JOIN_CONTACT_NOTES_TABLE
            ]
        ],
        'sale_created' => [
            'path' => 'getContactSales',
            'name' => 'Sale created',
            'field' => 'contact_sales.created_at',
            'typeSearch' => self::TYPE_SEARCH_FIELD_DATA_RANGE,
            'join' => [
                ContactSale::JOIN_SALE_TABLE
            ]
        ],
        'source' => [
            'path' => 'getContactSales',
            'name' => 'Source',
            'field' => 'sources.name',
            'typeSearch' => self::TYPE_SEARCH_FIELD_MULTI_SELECT,
            'join' => ContactSale::JOIN_SALE_SOURCE_TABLE
        ],
        'sale_link' => [
            'path' => 'getContactSales',
            'name' => 'Sale ID',
            'field' => 'contact_sales.link',
            'typeSearch' => self::TYPE_SEARCH_FIELD_TEXT_LIKE,
            'join' => [
                ContactSale::JOIN_SALE_TABLE
            ]
        ],
        'sale_status' => [
            'path' => 'getContactSales',
            'name' => 'Sale status',
            'field' => 'sale_statuses.name',
            'typeSearch' => self::TYPE_SEARCH_FIELD_MULTI_SELECT,
            'join' => ContactSale::JOIN_SALE_STATUS_TABLE
        ],
        'sale_project_c1' => [
            'path' => 'getContactSales',
            'name' => '1С Project',
            'field' => 'contact_sales.project_c1',
            'typeSearch' => self::TYPE_SEARCH_FIELD_MULTI_SELECT_STRICT,
            'join' => [
                ContactSale::JOIN_SALE_TABLE
            ]
        ],
        'company' => [
            'path' => 'companies.getName',
            'name' => 'Company',
            'field' => 'companies.name',
            'typeSearch' => self::TYPE_SEARCH_FIELD_MULTI_SELECT,
            'join' => [
                CompanyFields::JOIN_COMPANY_TABLE
            ]
        ],
        'company_website' => [
            'path' => 'companies.getWebsite',
            'name' => 'Website',
            'field' => 'companies.website',
            'typeSearch' => self::TYPE_SEARCH_FIELD_TEXT_LIKE,
            'join' => [
                CompanyFields::JOIN_COMPANY_TABLE
            ]
        ],
        'company_created' => [
            'path' => 'companies.getCreatedAtDate',
            'name' => 'Company Created',
            'field' => 'companies.created_at',
            'typeSearch' => self::TYPE_SEARCH_FIELD_DATA_RANGE,
            'join' => [
                CompanyFields::JOIN_COMPANY_TABLE
            ]
        ],
        'company_linkedin' => [
            'path' => 'companies.getLinkedin',
            'name' => 'Company LinkedIn',
            'field' => 'companies.linkedin',
            'typeSearch' => self::TYPE_SEARCH_FIELD_TEXT_LIKE,
            'join' => [
                CompanyFields::JOIN_COMPANY_TABLE
            ]
        ],
        'company_cto' => [
            'path' => 'companies.getStoFullName',
            'name' => 'CTO',
            'field' => 'companies.sto_full_name',
            'typeSearch' => self::TYPE_SEARCH_FIELD_TEXT_LIKE,
            'join' => [
                CompanyFields::JOIN_COMPANY_TABLE
            ]
        ],
        'company_industries' => [
            'path' => 'getCompanyIndustries',
            'name' => 'Industry',
            'field' => 'industries.name',
            'typeSearch' => self::TYPE_SEARCH_FIELD_MULTI_SELECT,
            'join' => CompanyFields::JOIN_COMPANY_INDUSTRIES_TABLE
        ],
        'company_size' => [
            'path' => 'getCompanySize',
            'name' => 'Company size',
            'field' => 'companies.min_employees',
            'typeSearch' => self::TYPE_SEARCH_FIELD_COMPANY_SIZE_RANGE,
            'join' => [
                CompanyFields::JOIN_COMPANY_TABLE
            ]
        ],
        'company_type' => [
            'path' => 'companies.getType',
            'name' => 'Type of company',
            'field' => 'companies.type',
            'typeSearch' => self::TYPE_SEARCH_FIELD_MULTI_SELECT,
            'join' => [
                CompanyFields::JOIN_COMPANY_TABLE
            ]
        ],
        'company_subsidiary' => [
            'path' => 'getRelationCompanies',
            'name' => 'Subsidiary companies',
            'field' => 'companies_clone.name',
            'typeSearch' => self::TYPE_SEARCH_SUBSIDIARY_COMPANIES,
            'join' => CompanyFields::JOIN_COMPANY_SUBSIDIARY_TABLE
        ],
        'company_holding' => [
            'path' => 'getRelationCompanies',
            'name' => 'Holding company',
            'field' => 'companies_clone.name',
            'typeSearch' => self::TYPE_SEARCH_HOLDING_COMPANIES,
            'join' => CompanyFields::JOIN_COMPANY_SUBSIDIARY_TABLE
        ],
        'company_founded' => [
            'path' => 'companies.getFoundedDate',
            'name' => 'Founded',
            'field' => 'companies.founded',
            'typeSearch' => self::TYPE_SEARCH_FIELD_DATA_RANGE,
            'join' => [
                CompanyFields::JOIN_COMPANY_TABLE
            ]
        ],
        'jobs' => [
            'path' => 'getCompanyVacancies',
            'name' => 'Job',
            'field' => 'company_vacancies.vacancy',
            'typeSearch' => self::TYPE_SEARCH_FIELD_MULTI_SELECT,
            'join' => CompanyFields::JOIN_COMPANY_VACANCY_TABLE
        ],
        'jobs_skills' => [
            'path' => 'getCompanyVacancies',
            'name' => 'Job skills',
            'field' => 'company_vacancies.skills',
            'typeSearch' => self::TYPE_SEARCH_FIELD_MULTI_SELECT,
            'join' => CompanyFields::JOIN_COMPANY_VACANCY_TABLE
        ],
        'jobs_urls' => [
            'path' => 'getCompanyVacancies',
            'name' => 'Job url',
            'field' => 'company_vacancies.link',
            'typeSearch' => self::TYPE_SEARCH_FIELD_TEXT_LIKE,
            'join' => CompanyFields::JOIN_COMPANY_VACANCY_TABLE
        ],
        'comments' => [
            'path' => 'contacts.getComment',
            'name' => 'Comments',
            'field' => 'contacts.comment',
            'typeSearch' => self::TYPE_SEARCH_FIELD_TEXT_LIKE,
            'join' => CompanyFields::JOIN_COMPANY_VACANCY_TABLE
        ],
        'in_blacklist' => [
            'path' => 'getInBlacklist',
            'name' => 'In blacklist',
            'field' => 'contacts.in_blacklist',
            'typeSearch' => self::TYPE_SEARCH_FIELD_MULTI_SELECT_STRICT
        ]
    ];
}
