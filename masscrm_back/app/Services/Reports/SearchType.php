<?php

namespace App\Services\Reports;

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
            'typeSearch' => self::TYPE_SEARCH_FIELD_TEXT_LIKE
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
            'typeSearch' => self::TYPE_SEARCH_FIELD_TEXT_LIKE
        ],
        'phones' => [
            'path' => 'getContactPhones',
            'name' => 'Phone',
            'field' => 'contact_phones.phone',
            'typeSearch' => self::TYPE_SEARCH_FIELD_TEXT_LIKE
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
            'typeSearch' => self::TYPE_SEARCH_FIELD_TEXT_LIKE
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
            'typeSearch' => self::TYPE_SEARCH_FIELD_MULTI_SELECT
        ],
        'colleagues' => [
            'path' => 'getContactColleagues',
            'name' => 'Collegue 1',
            'field' => 'contact_colleagues.full_name',
            'typeSearch' => self::TYPE_SEARCH_FIELD_TEXT_LIKE,
            'sortField' => 'contact_colleagues.full_name'
        ],
        'colleagues_link' => [
            'path' => 'getContactColleagues',
            'name' => 'Collegue Li',
            'field' => 'contact_colleagues.link',
            'typeSearch' => self::TYPE_SEARCH_FIELD_LINK_COLLEAGUE_TEXT_LIKE
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
            'typeSearch' => self::TYPE_SEARCH_FIELD_TEXT_LIKE
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
            'typeSearch' => self::TYPE_SEARCH_FIELD_MULTI_SELECT
        ],
        'mails' => [
            'path' => 'getContactMails',
            'name' => 'Mails',
            'field' => 'contact_mails.message',
            'typeSearch' => self::TYPE_SEARCH_FIELD_TEXT_LIKE
        ],
        'my_notes' => [
            'path' => 'getContactNotes',
            'name' => 'My notes',
            'field' => 'contact_notes.message',
            'typeSearch' => self::TYPE_SEARCH_FIELD_TEXT_LIKE
        ],
        'sale_сreated' => [
            'path' => 'getContactSales',
            'name' => 'Sale created',
            'field' => 'contact_sales.created_at',
            'typeSearch' => self::TYPE_SEARCH_FIELD_DATA_RANGE
        ],
        'source' => [
            'path' => 'getContactSales',
            'name' => 'Source',
            'field' => 'sources.name',
            'typeSearch' => self::TYPE_SEARCH_FIELD_MULTI_SELECT
        ],
        'sale_link' => [
            'path' => 'getContactSales',
            'name' => 'Sale ID',
            'field' => 'contact_sales.link',
            'typeSearch' => self::TYPE_SEARCH_FIELD_TEXT_LIKE
        ],
        'sale_status' => [
            'path' => 'getContactSales',
            'name' => 'Sale status',
            'field' => 'sale_statuses.name',
            'typeSearch' => self::TYPE_SEARCH_FIELD_MULTI_SELECT
        ],
        'sale_project_c1' => [
            'path' => 'getContactSales',
            'name' => '1С Project',
            'field' => 'contact_sales.project_c1',
            'typeSearch' => self::TYPE_SEARCH_FIELD_MULTI_SELECT_STRICT
        ],
        'company' => [
            'path' => 'companies.getName',
            'name' => 'Company',
            'field' => 'companies.name',
            'typeSearch' => self::TYPE_SEARCH_FIELD_MULTI_SELECT
        ],
        'company_website' => [
            'path' => 'companies.getWebsite',
            'name' => 'Website',
            'field' => 'companies.website',
            'typeSearch' => self::TYPE_SEARCH_FIELD_TEXT_LIKE
        ],
        'company_linkedin' => [
            'path' => 'companies.getLinkedin',
            'name' => 'Company LinkedIn',
            'field' => 'companies.linkedin',
            'typeSearch' => self::TYPE_SEARCH_FIELD_TEXT_LIKE
        ],
        'company_cto' => [
            'path' => 'companies.getStoFullName',
            'name' => 'CTO',
            'field' => 'companies.sto_full_name',
            'typeSearch' => self::TYPE_SEARCH_FIELD_TEXT_LIKE
        ],
        'company_industries' => [
            'path' => 'getCompanyIndustries',
            'name' => 'Industry',
            'field' => 'industries.name',
            'typeSearch' => self::TYPE_SEARCH_FIELD_MULTI_SELECT
        ],
        'company_size' => [
            'path' => 'getCompanySize',
            'name' => 'Company size',
            'field' => 'companies.min_employees',
            'typeSearch' => self::TYPE_SEARCH_FIELD_COMPANY_SIZE_RANGE
        ],
        'company_type' => [
            'path' => 'companies.getType',
            'name' => 'Type of company',
            'field' => 'companies.type',
            'typeSearch' => self::TYPE_SEARCH_FIELD_MULTI_SELECT
        ],
        'company_subsidiary' => [
            'path' => 'getRelationCompanies',
            'name' => 'Subsidiary companies',
            'field' => 'companies_clone.name',
            'typeSearch' => self::TYPE_SEARCH_SUBSIDIARY_COMPANIES
        ],
        'company_holding' => [
            'path' => 'getRelationCompanies',
            'name' => 'Holding company',
            'field' => 'companies_clone.name',
            'typeSearch' => self::TYPE_SEARCH_HOLDING_COMPANIES
        ],
        'company_founded' => [
            'path' => 'companies.getFoundedDate',
            'name' => 'Founded',
            'field' => 'companies.founded',
            'typeSearch' => self::TYPE_SEARCH_FIELD_DATA_RANGE
        ],
        'jobs' => [
            'path' => 'getCompanyVacancies',
            'name' => 'Job',
            'field' => 'company_vacancies.vacancy',
            'typeSearch' => self::TYPE_SEARCH_FIELD_MULTI_SELECT
        ],
        'jobs_skills' => [
            'path' => 'getCompanyVacancies',
            'name' => 'Job skills',
            'field' => 'company_vacancies.skills',
            'typeSearch' => self::TYPE_SEARCH_FIELD_MULTI_SELECT
        ],
        'comment' => [
            'path' => 'contacts.getComment',
            'name' => 'Comments',
            'field' => 'contacts.comment',
            'typeSearch' => self::TYPE_SEARCH_FIELD_TEXT_LIKE
        ]
    ];
}
