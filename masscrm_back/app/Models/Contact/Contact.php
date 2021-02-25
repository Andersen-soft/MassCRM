<?php

declare(strict_types=1);

namespace App\Models\Contact;

use App\Models\AttachmentFile\ContactAttachment;
use App\Models\Company\Company;
use App\Models\Contact\Fields\ContactFields;
use App\Models\User\User;
use App\Scopes\disableTimestampsScope;
use App\Search\Contact\ContactIndexConfigurator;
use App\Search\Contact\Rules\ContactSearchRule;
use App\Search\Contact\Transformers\ContactTransformer;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use ScoutElastic\Searchable;

/**
 * Class Contact
 * @package App
 * @property int $id
 * @property int|null $user_id
 * @property int|null $company_id
 * @property int|null $opens
 * @property int|null $views
 * @property int|null $deliveries
 * @property int|null $replies
 * @property int|null $bounces
 * @property int|null $confidence
 * @property string|null $service_id
 * @property int|null $responsible_id
 * @property string|null $colleague_first
 * @property string|null $colleague_second
 * @property string|null $mailing_tool
 * @property string|null $origin
 * @property string|null $comment
 * @property string|null $first_name
 * @property string|null $last_name
 * @property string|null $full_name
 * @property string|null $gender
 * @property string|null $country
 * @property string|null $city
 * @property string|null $region
 * @property string|null $position
 * @property string|null $linkedin
 * @property string|null $skype
 * @property string|null $location
 * @property Carbon|null $last_touch
 * @property Carbon|null $added_to_mailing
 * @property Carbon|null $date_of_use
 * @property Carbon|null $birthday
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property bool $is_upload_collection
 * @property bool|null $is_in_work
 * @property bool|null $no_email
 * @property bool $in_blacklist
 * @property array $email_collection
 * @property array $phone_collection
 * @property array $social_network_collection
 * @property array $colleague_collection
 * @property array $sequence_collection
 * @property array $mail_collection
 * @property array $note_collection
 * @property array $sale_collection
 */
class Contact extends ContactFields
{
    use Searchable, disableTimestampsScope;

    public const CONTACT = 'contact';
    public const EXCEPT_EMAIL_TEMPLATE = 'noemail@noemail.com';

    protected $fillable = [
        self::ID_FIELD,
        self::COMPANY_ID_FIELD,
        self::RESPONSIBLE_ID_FIELD,
        self::CREATED_AT,
        self::UPDATED_AT,
        self::FIRST_NAME_FIELD,
        self::LAST_NAME_FIELD,
        self::FULL_NAME_FIELD,
        self::GENDER_FIELD,
        self::BIRTHDAY_FIELD,
        self::COUNTRY_FIELD,
        self::CITY_FIELD,
        self::REGION_FIELD,
        self::POSITION_FIELD,
        self::LINKEDIN_FIELD,
        self::SKYPE_FIELD,
        self::LAST_TOUCH_FIELD,
        self::LOCATION_FIELD,
        self::ADDED_TO_MAILING_FIELD,
        self::MAILING_TOOL_FIELD,
        self::ORIGIN_FIELD,
        self::OPENS_FIELD,
        self::VIEWS_FIELD,
        self::DELIVERIES_FIELD,
        self::REPLIES_FIELD,
        self::BOUNCES_FIELD,
        self::CONFIDENCE_FIELD,
        self::SERVICE_ID_FIELD,
        self::COMMENT_FIELD,
        self::EMAIL_COLLECTION_FIELD,
        self::PHONE_COLLECTION_FIELD,
        self::SOCIAL_NETWORK_COLLECTION_FIELD,
        self::COLLEAGUE_COLLECTION_FIELD,
        self::SEQUENCE_COLLECTION_FIELD,
        self::MAIL_COLLECTION_FIELD,
        self::NOTE_COLLECTION_FIELD,
        self::SALE_COLLECTION_FIELD,
        self::IS_UPLOAD_COLLECTION_FIELD,
        self::USER_ID_FIELD,
        self::IN_BLACKLIST_FIELD,
        self::IS_IN_WORK_FIELD,
        self::DATE_OF_USE_FIELD
    ];

    protected $casts = [
        self::COMPANY_ID_FIELD => 'integer',
        self::CREATED_AT => 'datetime',
        self::UPDATED_AT => 'datetime',
        self::DATE_OF_USE_FIELD => 'datetime',
        self::FIRST_NAME_FIELD => 'string',
        self::LAST_NAME_FIELD => 'string',
        self::FULL_NAME_FIELD => 'string',
        self::GENDER_FIELD => 'string',
        self::BIRTHDAY_FIELD => 'datetime',
        self::COUNTRY_FIELD => 'string',
        self::CITY_FIELD => 'string',
        self::REGION_FIELD => 'string',
        self::POSITION_FIELD => 'string',
        self::LINKEDIN_FIELD => 'string',
        self::SKYPE_FIELD => 'string',
        self::LAST_TOUCH_FIELD => 'datetime',
        self::LOCATION_FIELD => 'string',
        self::ADDED_TO_MAILING_FIELD => 'datetime',
        self::MAILING_TOOL_FIELD => 'string',
        self::ORIGIN_FIELD => 'string',
        self::OPENS_FIELD => 'integer',
        self::VIEWS_FIELD => 'integer',
        self::DELIVERIES_FIELD => 'integer',
        self::REPLIES_FIELD => 'integer',
        self::BOUNCES_FIELD => 'integer',
        self::CONFIDENCE_FIELD => 'integer',
        self::SERVICE_ID_FIELD => 'string',
        self::COMMENT_FIELD => 'string',
        self::EMAIL_COLLECTION_FIELD => 'array',
        self::PHONE_COLLECTION_FIELD => 'array',
        self::SOCIAL_NETWORK_COLLECTION_FIELD => 'array',
        self::COLLEAGUE_COLLECTION_FIELD => 'array',
        self::SEQUENCE_COLLECTION_FIELD => 'array',
        self::MAIL_COLLECTION_FIELD => 'array',
        self::NOTE_COLLECTION_FIELD => 'array',
        self::SALE_COLLECTION_FIELD => 'array',
        self::IS_UPLOAD_COLLECTION_FIELD => 'boolean',
        self::USER_ID_FIELD => 'integer',
        self::RESPONSIBLE_ID_FIELD => 'integer',
        self::IN_BLACKLIST_FIELD => 'boolean',
        self::IS_IN_WORK_FIELD => 'boolean'
    ];

    protected string $indexConfigurator = ContactIndexConfigurator::class;

    protected array $searchRules = [
        ContactSearchRule::class
    ];

    public function getId(): int
    {
        return $this->id;
    }

    public function getCompanyId(): ?int
    {
        return $this->company_id;
    }

    public function getResponsible(): ?int
    {
        return $this->responsible_id;
    }

    public function getResponsibleUser(): ?string
    {
        return $this->responsible_id ? $this->responsibleUser->name . ' ' . $this->responsibleUser->surname : null;
    }

    public function setResponsible(?int $responsibleId): Contact
    {
        $this->responsible_id = $responsibleId;

        return $this;
    }

    public function getCreatedAt(): Carbon
    {
        return $this->created_at;
    }

    public function getDateOfUse(): ?Carbon
    {
        return $this->date_of_use;
    }

    public function getUpdatedAt(): Carbon
    {
        return $this->updated_at;
    }

    public function getCreatedAtDateTime(): string
    {
        return $this->created_at->format(self::DATE_TIME_FORMAT);
    }

    public function getUpdatedAtDateTime(): string
    {
        return $this->updated_at->format(self::DATE_TIME_FORMAT);
    }

    public function getFirstName(): ?string
    {
        return $this->first_name;
    }

    public function setFirstName(?string $firstName): Contact
    {
        $this->first_name = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->last_name;
    }

    public function setLastName(?string $lastName): Contact
    {
        $this->last_name = $lastName;

        return $this;
    }

    public function setFullName(?string $fullName): Contact
    {
        $this->full_name = $fullName;

        return $this;
    }

    public function getFullName(): ?string
    {
        return $this->full_name;
    }

    public function setGender(?string $gender): Contact
    {
        $this->gender = $gender;

        return $this;
    }

    public function getGender(): ?string
    {
        return $this->gender;
    }

    public function getCountry(): ?string
    {
        return $this->country;
    }

    public function setCountry(?string $country): Contact
    {
        $this->country = $country;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(?string $city): Contact
    {
        $this->city = $city;

        return $this;
    }

    public function getRegion(): ?string
    {
        return $this->region;
    }

    public function setRegion(?string $region): Contact
    {
        $this->region = $region;

        return $this;
    }

    public function setPosition(?string $position): Contact
    {
        $this->position = $position;

        return $this;
    }

    public function getPosition(): ?string
    {
        return $this->position;
    }

    public function getLinkedin(): ?string
    {
        return $this->linkedin;
    }

    public function setLinkedin(?string $linkedin): Contact
    {
        $this->linkedin = $linkedin;

        return $this;
    }

    public function getSkype(): ?string
    {
        return $this->skype;
    }

    public function setSkype(?string $skype): Contact
    {
        $this->skype = $skype;

        return $this;
    }

    public function getLastTouch(): ?Carbon
    {
        return $this->last_touch;
    }

    public function getLastTouchDateTime(): ?string
    {
        if ($this->last_touch) {
            return $this->last_touch->format(self::DATE_TIME_FORMAT);
        }

        return $this->last_touch;
    }

    public function setLastTouch(?Carbon $lastTouch): Contact
    {
        $this->last_touch = $lastTouch;

        return $this;
    }

    public function getBirthday(): ?Carbon
    {
        return $this->birthday;
    }

    public function getBirthdayDate(): ?string
    {
        if ($this->birthday) {
            return $this->birthday->format(self::DATE_FORMAT);
        }

        return $this->birthday;
    }

    public function setBirthday(?Carbon $birthday): Contact
    {
        $this->birthday = $birthday;

        return $this;
    }

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class, 'company_id');
    }

    public function attachments(): HasMany
    {
        return $this->hasMany(ContactAttachment::class, 'contact_id');
    }

    public function contactSocialNetworks(): HasMany
    {
        return $this->hasMany(ContactSocialNetworks::class, 'contact_id');
    }

    public function contactPhones(): HasMany
    {
        return $this->hasMany(ContactPhones::class, 'contact_id');
    }

    public function contactColleagues(): HasMany
    {
        return $this->hasMany(ContactColleagues::class, 'contact_id');
    }

    public function contactColleaguesRelation(): HasMany
    {
        return $this->hasMany(ContactColleagues::class, 'contact_id_relation');
    }

    public function contactEmails(): HasMany
    {
        return $this->hasMany(ContactEmails::class, 'contact_id');
    }

    public function getLocation(): ?string
    {
        return $this->location;
    }

    public function setLocation(?string $location): Contact
    {
        $this->location = $location;
        return $this;
    }

    public function getAddedToMailingDateTime(): ?string
    {
        if ($this->added_to_mailing) {
            return $this->added_to_mailing->format(self::DATE_TIME_FORMAT);
        }

        return $this->added_to_mailing;
    }

    public function getAddedToMailing(): ?Carbon
    {
        return $this->added_to_mailing;
    }

    public function setAddedToMailing(?Carbon $addedToMailing): Contact
    {
        $this->added_to_mailing = $addedToMailing;

        return $this;
    }

    public function getMailingTool(): ?string
    {
        return $this->mailing_tool;
    }

    public function setMailingTool(?string $mailingTool): Contact
    {
        $this->mailing_tool = $mailingTool;

        return $this;
    }

    public function getOrigin(): ?string
    {
        return $this->origin;
    }

    public function setOrigin(?string $origin): Contact
    {
        $this->origin = $origin;

        return $this;
    }

    public function getOpens(): ?int
    {
        return $this->opens;
    }

    public function setOpens(?int $opens): Contact
    {
        $this->opens = $opens;

        return $this;
    }

    public function getViews(): ?int
    {
        return $this->views;
    }

    public function setViews(?int $views): Contact
    {
        $this->views = $views;

        return $this;
    }

    public function getDeliveries(): ?int
    {
        return $this->deliveries;
    }

    public function setDeliveries(?int $deliveries): Contact
    {
        $this->deliveries = $deliveries;

        return $this;
    }

    public function getReplies(): ?int
    {
        return $this->replies;
    }

    public function setReplies(?int $replies): Contact
    {
        $this->replies = $replies;

        return $this;
    }

    public function getBounces(): ?int
    {
        return $this->bounces;
    }

    public function setBounces(?int $bounces): Contact
    {
        $this->bounces = $bounces;

        return $this;
    }

    public function getConfidence(): ?int
    {
        return $this->confidence;
    }

    public function setConfidence(?int $confidence): Contact
    {
        $this->confidence = $confidence;

        return $this;
    }

    public function getServiceId(): ?string
    {
        return $this->service_id;
    }

    public function setServiceId(?string $serviceId): Contact
    {
        $this->service_id = $serviceId;

        return $this;
    }

    public function sequences(): HasMany
    {
        return $this->hasMany(ContactCampaigns::class, 'contact_id');
    }

    //TODO: investigate how to pass here strict param
    /** @phpstan-ignore-next-line */
    public function setValue(string $field, $value = null, bool $merge = false): Contact
    {
        switch ($field) {
            case self::FIRST_NAME_FIELD:
                if ($this->notMerge($merge, self::FIRST_NAME_FIELD)) {
                    break;
                }
                $this->setFirstName($value);
                break;
            case self::LAST_NAME_FIELD:
                if ($this->notMerge($merge, self::LAST_NAME_FIELD)) {
                    break;
                }
                $this->setLastName($value);
                break;
            case self::CITY_FIELD:
                if ($this->notMerge($merge, self::CITY_FIELD)) {
                    break;
                }
                $this->setCity($value);
                break;
            case self::REGION_FIELD:
                if ($this->notMerge($merge, self::REGION_FIELD)) {
                    break;
                }
                $this->setRegion($value);
                break;
            case self::COUNTRY_FIELD:
                if ($this->notMerge($merge, self::COUNTRY_FIELD)) {
                    break;
                }
                $this->setCountry($value);
                break;
            case self::CONFIDENCE_FIELD:
                if ($this->notMerge($merge, self::CONFIDENCE_FIELD)) {
                    break;
                }
                $this->setConfidence((int)$value);
                break;
            case self::POSITION_FIELD:
                if ($this->notMerge($merge, self::POSITION_FIELD)) {
                    break;
                }
                $this->setPosition($value);
                break;
            case self::SERVICE_ID_FIELD:
                $this->setServiceId($value);
                break;
            case self::ADDED_TO_MAILING_FIELD:
                if ($this->notMerge($merge, self::ADDED_TO_MAILING_FIELD)) {
                    break;
                }

                if ($value === null && $this->getAddedToMailing() === null) {
                    $this->setAddedToMailing($value);
                    break;
                } elseif ($value === null && $this->getAddedToMailing() !== null) {
                    break;
                }

                $this->setAddedToMailing(Carbon::parse($value));
                break;
            case self::LAST_TOUCH_FIELD:
                if ($value === null && $this->getLastTouch() === null) {
                    $this->setLastTouch($value);
                    break;
                } elseif ($value === null && $this->getLastTouch() !== null) {
                    break;
                }

                $this->setLastTouch(Carbon::parse($value));
                break;
            case self::OPENS_FIELD:
                $this->setOpens((int)$value);
                break;
            case self::VIEWS_FIELD:
                $this->setViews((int)$value);
                break;
            case self::DELIVERIES_FIELD:
                $this->setDeliveries((int)$value);
                break;
            case self::REPLIES_FIELD:
                $this->setReplies((int)$value);
                break;
            case self::BOUNCES_FIELD:
                $this->setBounces((int)$value);
                break;
            case self::LINKEDIN_FIELD:
            case self::CONTACT_PREFIX . self::LINKEDIN_FIELD:
                if ($this->notMerge($merge, self::LINKEDIN_FIELD)) {
                    break;
                }
                $this->setLinkedin($value);
                break;
            case self::GENDER_FIELD:
                if ($this->notMerge($merge, self::GENDER_FIELD)) {
                    break;
                }
                $this->setGender($value);
                break;
            case self::FULL_NAME_FIELD:
                if ($this->notMerge($merge, self::FULL_NAME_FIELD)) {
                    break;
                }
                $this->setFullName($value);
                break;
            case  self::SKYPE_FIELD:
                if ($this->notMerge($merge, self::SKYPE_FIELD)) {
                    break;
                }
                $this->setSkype($value);
                break;
            case self::MAILING_TOOL_FIELD:
                if ($this->notMerge($merge, self::MAILING_TOOL_FIELD)) {
                    break;
                }
                $this->setMailingTool($value);
                break;
            case self::RESPONSIBLE_ID_FIELD:
                if ($this->notMerge($merge, self::RESPONSIBLE_ID_FIELD)) {
                    break;
                }
                $this->setResponsible($value);
                break;
            case self::BIRTHDAY_FIELD:
                if ($this->notMerge($merge, self::BIRTHDAY_FIELD)) {
                    break;
                }
                $this->setBirthday(Carbon::parse($value));
                break;
            case self::CONTACT_PREFIX . self::COMMENT_FIELD:
            case self::COMMENT_FIELD:
                if ($this->notMerge($merge, self::COMMENT_FIELD)) {
                    break;
                }
                $this->setComment($value);
                break;
        }
        return $this;
    }

    public function notMerge(bool $merge, string $field): bool
    {
        if ($merge && !is_null($this->{$field})) {
            return true;
        }

        return false;
    }

    public function updateIsInWorkAndDate(Builder $contacts): void
    {
        $contacts->each(function ($item) {
            /** @var self $item */
            $item->scopeWithoutTimestamps()->update(
                [
                    'is_in_work' => true,
                    'date_of_use' => Carbon::now()
                ]
            );
        });
    }

    public function createAssociate(string $field, string $value): Contact
    {
        switch ($field) {
            case ContactEmails::EMAIL_FIELD:
                $this->contactEmails()->create([
                    'email' => $value,
                    'verification' => false
                ]);
                break;
            case ContactPhones::PHONE_FIELD:
                $this->contactPhones()->create(['phone' => $value]);
                break;
            case ContactSocialNetworks::SOCIAL_FIELD:
                if (filter_var($value, FILTER_VALIDATE_URL) !== false) {
                    $this->contactSocialNetworks()->create(['link' => $value]);
                }
                break;
            default:
                break;
        }

        return $this;
    }

    public function mails(): HasMany
    {
        return $this->hasMany(ContactMails::class, 'contact_id');
    }

    public function notes(): HasMany
    {
        return $this->hasMany(ContactNotes::class, 'contact_id');
    }

    public function sales(): HasMany
    {
        return $this->hasMany(ContactSale::class, 'contact_id');
    }

    public function isField(string $field): bool
    {
        return in_array($field, $this->fillable);
    }

    public function getComment(): ?string
    {
        return $this->comment;
    }

    public function setComment(?string $comment): Contact
    {
        $this->comment = $comment;

        return $this;
    }

    public function getUserId(): ?int
    {
        return $this->user_id;
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function responsibleUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'responsible_id');
    }

    public function createContact(array $fields, User $user, array $origin = null): self
    {
        $contact = new self();
        foreach ($fields as $key => $value) {
            $contact->setValue($key, $value);
        }

        $contact->origin = !empty($origin) ? implode(';', $origin) : null;
        $contact->user()->associate($user);
        $contact->responsibleUser()->associate($user);
        $contact->save();

        return $contact;
    }

    public function updateContact(self $contact, array $fields, User $user, array $origin = null): self
    {
        $updateData = [
            $contact->user()->getForeignKeyName() => $user->id,
        ];

        if ($user->hasRole(User::USER_ROLE_NC2) && $contact->responsibleUser->hasRole(User::USER_ROLE_NC1)) {
            $updateData[$contact->responsibleUser()->getForeignKeyName()] = $user->id;
        }

        $updateData = array_merge($fields, $updateData);
        $contact->update($updateData);
        $contact->setUpdatedAt(Carbon::now());

        if ($origin !== null) {
            $contact->origin = implode(';', $origin);
        }

        return $contact;
    }

    public function toSearchableArray(): array
    {
        return (new ContactTransformer())->transform($this);
    }
}
