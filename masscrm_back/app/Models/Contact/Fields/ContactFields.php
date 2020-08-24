<?php

namespace App\Models\Contact\Fields;

use App\Models\BaseModel;
use App\Models\CampaignStatus;
use App\Models\Company\Company;
use App\Models\Contact\ContactCampaigns;
use App\Models\Contact\ContactColleagues;
use App\Models\Contact\ContactEmails;
use App\Models\Contact\ContactMails;
use App\Models\Contact\ContactNotes;
use App\Models\Contact\ContactPhones;
use App\Models\Contact\ContactSale;
use App\Models\Contact\ContactSocialNetworks;
use App\Models\FieldsInterface;
use App\Services\Reports\SearchType;

class ContactFields extends BaseModel implements FieldsInterface
{
    public const CONTACT_PREFIX = 'c_';

    public const COMPANY_ID_FIELD = 'company_id';
    public const FIRST_NAME_FIELD = 'first_name';
    public const LAST_NAME_FIELD = 'last_name';
    public const FULL_NAME_FIELD = 'full_name';
    public const CONFIDENCE_FIELD = 'confidence';
    public const POSITION_FIELD = 'position';
    public const GENDER_FIELD = 'gender';
    public const LINKEDIN_FIELD = 'linkedin';
    public const SKYPE_FIELD = 'skype';
    public const RESPONSIBLE_FIELD = 'responsible';
    public const BIRTHDAY_FIELD = 'birthday';

    public const LOCATION_FIELD = 'location';
    public const CITY_FIELD = 'city';
    public const REGION_FIELD = 'region';
    public const COUNTRY_FIELD = 'country';

    public const SERVICE_ID_FIELD = 'service_id';
    public const OPENS_FIELD = 'opens';
    public const VIEWS_FIELD = 'views';
    public const DELIVERIES_FIELD = 'deliveries';
    public const REPLIES_FIELD = 'replies';
    public const BOUNCES_FIELD = 'bounces';
    public const ADDED_TO_MAILING_FIELD = 'added_to_mailing';
    public const LAST_TOUCH_FIELD = 'last_touch';
    public const MAILING_TOOL_FIELD = 'mailing_tool';
    public const ORIGIN_FIELD = 'origin';
    public const COMMENT_FIELD = 'comment';

    public const FIELDS = [
        self::ID_FIELD => [
            self::SORT => true,
            self::SEARCH => false,
        ],
        self::COMPANY_ID_FIELD => [
            self::SORT => false,
            self::SEARCH => false,
        ],
        self::RESPONSIBLE_FIELD => [
            self::SORT => true,
            self::SEARCH => true,
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_MULTI_SELECT,
            self::FIELD => 'contacts.responsible'
        ],
        self::CREATED_AT_FIELD => [
            self::SORT => true,
            self::SEARCH => true,
            self::FORMAT => self::DATE_TIME_FORMAT,
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_DATA_RANGE,
            self::FIELD => 'contacts.created_at'
        ],
        self::UPDATED_AT_FIELD => [
            self::SORT => true,
            self::SEARCH => true,
            self::FORMAT => self::DATE_TIME_FORMAT,
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_DATA_RANGE,
            self::FIELD => 'contacts.updated_at'
        ],
        self::FIRST_NAME_FIELD => [
            self::SORT => true,
            self::SEARCH => true,
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_TEXT_LIKE,
            self::FIELD => 'contacts.first_name'
        ],
        self::LAST_NAME_FIELD => [
            self::SORT => true,
            self::SEARCH => true,
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_TEXT_LIKE,
            self::FIELD => 'contacts.last_name'
        ],
        self::FULL_NAME_FIELD => [
            self::SORT => true,
            self::SEARCH => true,
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_TEXT_LIKE,
            self::FIELD => 'contacts.full_name'
        ],
        self::GENDER_FIELD => [
            self::SORT => true,
            self::SEARCH => true,
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_MULTI_SELECT,
            self::FIELD => 'contacts.gender',
        ],
        self::BIRTHDAY_FIELD => [
            self::SORT => true,
            self::SEARCH => true,
            self::FORMAT => self::DATE_FORMAT,
            self::FIELD => 'contacts.birthday',
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_DATE_ONLY_MONTH_AND_DAY_RANGE
        ],
        self::COUNTRY_FIELD => [
            self::SORT => true,
            self::SEARCH => true,
            self::FIELD => 'contacts.country',
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_MULTI_SELECT
        ],
        self::REGION_FIELD => [
            self::SORT => true,
            self::SEARCH => true,
            self::FIELD => 'contacts.region',
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_MULTI_SELECT
        ],
        self::CITY_FIELD => [
            self::SORT => true,
            self::SEARCH => true,
            self::FIELD => 'contacts.city',
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_MULTI_SELECT
        ],
        self::LOCATION_FIELD => [
            self::SORT => false,
            self::SEARCH => false,
        ],
        self::POSITION_FIELD => [
            self::SORT => true,
            self::SEARCH => true,
            self::FIELD => 'contacts.position',
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_TEXT_LIKE
        ],
        self::LINKEDIN_FIELD => [
            self::SORT => true,
            self::SEARCH => true,
            self::FIELD => 'contacts.linkedin',
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_TEXT_LIKE
        ],
        self::SKYPE_FIELD => [
            self::SORT => true,
            self::SEARCH => true,
            self::FIELD => 'contacts.skype',
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_TEXT_LIKE
        ],
        self::COMMENT_FIELD => [
            self::SORT => true,
            self::SEARCH => true,
            self::FIELD => 'contacts.comment',
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_TEXT_LIKE
        ],
        self::LAST_TOUCH_FIELD => [
            self::SORT => true,
            self::SEARCH => true,
            self::FORMAT => self::DATE_TIME_FORMAT,
            self::FIELD => 'contacts.last_touch',
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_DATA_RANGE
        ],
        self::ADDED_TO_MAILING_FIELD => [
            self::SORT => true,
            self::SEARCH => true,
            self::FORMAT => self::DATE_TIME_FORMAT,
            self::FIELD => 'contacts.added_to_mailing',
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_DATA_RANGE
        ],
        self::ORIGIN_FIELD => [
            self::SORT => true,
            self::SEARCH => true,
            self::FIELD => 'contacts.origin',
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_MULTI_SELECT
        ],
        self::MAILING_TOOL_FIELD => [
            self::SORT => true,
            self::SEARCH => true,
            self::FIELD => 'contacts.mailing_tool',
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_MULTI_SELECT
        ],
        self::CONFIDENCE_FIELD => [
            self::SORT => true,
            self::SEARCH => true,
            self::FIELD => 'contacts.confidence',
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_RANGE
        ],
        self::OPENS_FIELD => [
            self::SORT => true,
            self::SEARCH => true,
            self::FIELD => 'contacts.opens',
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_RANGE
        ],
        self::VIEWS_FIELD => [
            self::SORT => true,
            self::SEARCH => true,
            self::FIELD => 'contacts.views',
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_RANGE
        ],
        self::DELIVERIES_FIELD => [
            self::SORT => true,
            self::SEARCH => true,
            self::FIELD => 'contacts.deliveries',
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_RANGE
        ],
        self::BOUNCES_FIELD => [
            self::SORT => true,
            self::SEARCH => true,
            self::FIELD => 'contacts.bounces',
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_BOUNCES
        ],
        self::REPLIES_FIELD => [
            self::SORT => true,
            self::SEARCH => true,
            self::FIELD => 'contacts.replies',
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_RANGE
        ],
        self::SERVICE_ID_FIELD => [
            self::SORT => true,
            self::SEARCH => true,
            self::FIELD => 'contacts.service_id',
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_TEXT_LIKE
        ],
        Company::COMPANY_FIELD => [
            self::SORT => false,
            self::SEARCH => true,
        ],
        ContactEmails::EMAIL_FIELD => [
            self::SORT => false,
            self::SEARCH => true,
            self::FIELD => 'contact_emails.email',
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_TEXT_LIKE
        ],
        ContactPhones::PHONE_FIELD => [
            self::SORT => false,
            self::SEARCH => true,
            self::FIELD => 'contact_phones.phone',
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_TEXT_LIKE
        ],
        ContactSocialNetworks::SOCIAL_NETWORKS_FIELD => [
            self::SORT => false,
            self::SEARCH => true,
            self::FIELD => 'contact_social_networks.link',
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_TEXT_LIKE
        ],
        ContactColleagues::COLLEAGUE_NAME_FIELD => [
            self::SORT => false,
            self::SEARCH => true,
            self::FIELD => 'contact_colleagues.full_name',
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_TEXT_LIKE
        ],
        ContactColleagues::COLLEAGUE_LINK_FIELD => [
            self::SORT => false,
            self::SEARCH => true,
            self::FIELD => 'contact_colleagues.link',
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_LINK_COLLEAGUE_TEXT_LIKE
        ],
        ContactEmails::REQUIRES_VALIDATION => [
            self::SORT => false,
            self::SEARCH => true,
            self::FIELD => 'contact_emails.verification',
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_VALUE_SELECT
        ],
        ContactCampaigns::SEQUENCE_FIELD => [
            self::SORT => false,
            self::SEARCH => true,
            self::FIELD => 'contact_campaigns.sequence',
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_TEXT_LIKE
        ],
        CampaignStatus::STATUS_FIELD => [
            self::SORT => false,
            self::SEARCH => true,
            self::FIELD => 'campaign_statuses.name',
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_MULTI_SELECT
        ],
        ContactMails::MAILS_FIELD => [
            self::SORT => false,
            self::SEARCH => true,
            self::FIELD => 'contact_mails.message',
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_TEXT_LIKE
        ],
        ContactNotes::MY_NOTES_FIELD => [
            self::SORT => false,
            self::SEARCH => true,
            self::FIELD => 'contact_notes.message',
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_TEXT_LIKE
        ],
        ContactSale::SALE => [
            self::SORT => false,
            self::SEARCH => true,
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
