<?php

declare(strict_types=1);

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

    public const JOIN = 'join';

    public const JOIN_CONTACT_EMAIL_TABLE = [
        'table' => 'contact_emails',
        'first' => 'contact_emails.contact_id',
        'second' => 'contacts.id'
    ];

    public const JOIN_CONTACT_SOCIAL_NETWORK_TABLE =[
        'table' => 'contact_social_networks',
        'first' => 'contact_social_networks.contact_id',
        'second' => 'contacts.id'
    ];

    public const JOIN_CONTACT_PHONES_TABLE  = [
        'table' => 'contact_phones',
        'first' => 'contact_phones.contact_id',
        'second' => 'contacts.id'
    ];

    public const JOIN_CONTACT_COLLEAGUES_TABLE = [
        'table' => 'contact_colleagues',
        'first' => 'contact_colleagues.contact_id',
        'second' => 'contacts.id'
    ];

    public const JOIN_CONTACT_CAMPAIGNS_TABLE = [
        'table' => 'contact_campaigns',
        'first' => 'contact_campaigns.contact_id',
        'second' => 'contacts.id'
    ];

    public const JOIN_CONTACT_CAMPAIGN_STATUSES_TABLE = [
        self::JOIN_CONTACT_CAMPAIGNS_TABLE,
        [
            'table' => 'campaign_statuses',
            'first' => 'campaign_statuses.id',
            'second' => 'contact_campaigns.status_id'
        ]
    ];

    public const JOIN_CONTACT_MAILS_TABLE = [
        'table' => 'contact_mails',
        'first' => 'contact_mails.contact_id',
        'second' => 'contacts.id'
    ];

    public const JOIN_CONTACT_NOTES_TABLE = [
        'table' => 'contact_notes',
        'first' => 'contact_notes.contact_id',
        'second' => 'contacts.id'
    ];

    public const COMPANY_ID_FIELD = 'company_id';
    public const FIRST_NAME_FIELD = 'first_name';
    public const LAST_NAME_FIELD = 'last_name';
    public const FULL_NAME_FIELD = 'full_name';
    public const CONFIDENCE_FIELD = 'confidence';
    public const POSITION_FIELD = 'position';
    public const GENDER_FIELD = 'gender';
    public const LINKEDIN_FIELD = 'linkedin';
    public const SKYPE_FIELD = 'skype';
    public const RESPONSIBLE_ID_FIELD = 'responsible_id';
    public const RESPONSIBLE = 'responsible';
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
    public const IN_BLACKLIST_FIELD = 'in_blacklist';
    public const IS_IN_WORK_FIELD = 'is_in_work';
    public const NO_EMAIL = 'no_email';

    public const EMAIL_COLLECTION_FIELD = 'email_collection';
    public const PHONE_COLLECTION_FIELD = 'phone_collection';
    public const SOCIAL_NETWORK_COLLECTION_FIELD = 'social_network_collection';
    public const COLLEAGUE_COLLECTION_FIELD = 'colleague_collection';
    public const SEQUENCE_COLLECTION_FIELD = 'sequence_collection';
    public const MAIL_COLLECTION_FIELD = 'mail_collection';
    public const NOTE_COLLECTION_FIELD = 'note_collection';
    public const SALE_COLLECTION_FIELD = 'sale_collection';
    public const IS_UPLOAD_COLLECTION_FIELD = 'is_upload_collection';

    public const FIELDS = [
        self::ID_FIELD => [
            self::SORT => true,
            self::SEARCH => false,
        ],
        self::COMPANY_ID_FIELD => [
            self::SORT => false,
            self::SEARCH => false,
        ],
        self::RESPONSIBLE_ID_FIELD => [
            self::SORT => true,
            self::SEARCH => true,
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_MULTI_SELECT_STRICT,
            self::FIELD => 'contacts.responsible_id'
        ],
        self::CREATED_AT_FIELD => [
            self::SORT => true,
            self::SEARCH => true,
            self::FORMAT => self::DATE_TIME_FORMAT,
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_DATA_RANGE,
            self::FIELD => 'contacts.created_at'
        ],
        self::DATE_OF_USE_FIELD => [
            self::SORT => true,
            self::SEARCH => true,
            self::FORMAT => self::DATE_TIME_FORMAT,
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_DATA_RANGE,
            self::FIELD => 'contacts.date_of_use'
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
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_MULTI_SELECT
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
        self::IN_BLACKLIST_FIELD => [
            self::SORT => true,
            self::SEARCH => true,
            self::FIELD => 'contacts.in_blacklist',
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_MULTI_SELECT_STRICT
        ],
        self::IS_IN_WORK_FIELD => [
            self::SORT => true,
            self::SEARCH => true,
            self::FIELD => 'contacts.is_in_work',
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_MULTI_SELECT_STRICT,
        ],
        self::NO_EMAIL => [
            self::SORT => true,
            self::SEARCH => true,
            self::FIELD => 'contact_emails.email',
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_MULTI_SELECT_STRICT,
            self::JOIN => [self::JOIN_CONTACT_EMAIL_TABLE]
        ],
        Company::COMPANY_FIELD => [
            self::SORT => false,
            self::SEARCH => true,
        ],
        ContactEmails::EMAIL_FIELD => [
            self::SORT => false,
            self::SEARCH => true,
            self::FIELD => 'contact_emails.email',
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_TEXT_LIKE,
            self::JOIN => [self::JOIN_CONTACT_EMAIL_TABLE]
        ],
        ContactPhones::PHONE_FIELD => [
            self::SORT => false,
            self::SEARCH => true,
            self::FIELD => 'contact_phones.phone',
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_TEXT_LIKE,
            self::JOIN => [self::JOIN_CONTACT_PHONES_TABLE]
        ],
        ContactSocialNetworks::SOCIAL_NETWORKS_FIELD => [
            self::SORT => false,
            self::SEARCH => true,
            self::FIELD => 'contact_social_networks.link',
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_TEXT_LIKE,
            self::JOIN => [self::JOIN_CONTACT_SOCIAL_NETWORK_TABLE]
        ],
        ContactColleagues::COLLEAGUE_NAME_FIELD => [
            self::SORT => false,
            self::SEARCH => true,
            self::FIELD => 'contact_colleagues.full_name',
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_TEXT_LIKE,
            self::JOIN => [self::JOIN_CONTACT_COLLEAGUES_TABLE]
        ],
        ContactColleagues::COLLEAGUE_LINK_FIELD => [
            self::SORT => false,
            self::SEARCH => true,
            self::FIELD => 'contact_colleagues.link',
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_LINK_COLLEAGUE_TEXT_LIKE,
            self::JOIN => [self::JOIN_CONTACT_COLLEAGUES_TABLE]
        ],
        ContactEmails::REQUIRES_VALIDATION => [
            self::SORT => false,
            self::SEARCH => true,
            self::FIELD => 'contact_emails.verification',
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_VALUE_SELECT,
            self::JOIN => [self::JOIN_CONTACT_EMAIL_TABLE]
        ],
        ContactCampaigns::SEQUENCE_FIELD => [
            self::SORT => false,
            self::SEARCH => true,
            self::FIELD => 'contact_campaigns.sequence',
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_TEXT_LIKE,
            self::JOIN => [self::JOIN_CONTACT_CAMPAIGNS_TABLE]
        ],
        CampaignStatus::STATUS_FIELD => [
            self::SORT => false,
            self::SEARCH => true,
            self::FIELD => 'campaign_statuses.name',
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_MULTI_SELECT,
            self::JOIN => self::JOIN_CONTACT_CAMPAIGN_STATUSES_TABLE
        ],
        ContactMails::MAILS_FIELD => [
            self::SORT => false,
            self::SEARCH => true,
            self::FIELD => 'contact_mails.message',
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_TEXT_LIKE,
            self::JOIN => [self::JOIN_CONTACT_MAILS_TABLE]
        ],
        ContactNotes::MY_NOTES_FIELD => [
            self::SORT => false,
            self::SEARCH => true,
            self::FIELD => 'contact_notes.message',
            self::TYPE_FILTER => SearchType::TYPE_SEARCH_FIELD_TEXT_LIKE,
            self::JOIN => [self::JOIN_CONTACT_NOTES_TABLE]
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
