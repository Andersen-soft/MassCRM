<?php

namespace App\Search\Contact\Transformers;

use App\Models\CampaignStatus;
use App\Models\Company\Fields\CompanyFields;
use App\Models\Contact\Contact;
use App\Models\Contact\ContactCampaigns;
use App\Models\Contact\ContactEmails;
use App\Models\Contact\ContactMails;
use App\Models\Contact\ContactNotes;
use App\Models\Contact\ContactPhones;
use App\Models\Contact\ContactSale;
use App\Models\Contact\ContactSocialNetworks;
use App\Models\SaleStatus;
use App\Models\Source;
use App\Search\SearchableTransform;

class ContactTransformer extends SearchableTransform
{
    protected array $data = [];

    public function transform(Contact $contact): array
    {
        $this->data = [
            // Contact
            Contact::POSITION_FIELD => $contact->getPosition(),
            Contact::FIRST_NAME_FIELD => $contact->getFirstName(),
            Contact::LAST_NAME_FIELD => $contact->getLastName(),
            Contact::COUNTRY_FIELD => $contact->getCountry(),
            Contact::REGION_FIELD => $contact->getRegion(),
            Contact::CITY_FIELD => $contact->getCity(),
            Contact::COMMENT_FIELD => $contact->getComment(),
            Contact::RESPONSIBLE => $contact->getResponsibleUser(),
            Contact::FULL_NAME_FIELD => $contact->getFullName(),
            Contact::CONFIDENCE_FIELD => $contact->getConfidence(),

            // Dates
            Contact::CREATED_AT => $contact->getCreatedAt()->format(self::DATE_FORMAT),
            Contact::UPDATED_AT => $contact->getUpdatedAt()->format(self::DATE_FORMAT),
            Contact::DATE_OF_USE_FIELD => $contact->getDateOfUse() ? $contact->getDateOfUse()->format(self::DATE_FORMAT) : null,
            Contact::LAST_TOUCH_FIELD => $contact->getLastTouch() ? $contact->getLastTouch()->format(self::DATE_FORMAT) : null,
            Contact::BIRTHDAY_FIELD => $contact->getBirthday() ? $contact->getBirthday()->format(self::DATE_FORMAT) : null,
        ];

        // Relations
        $this->addEmails($contact);
        $this->addPhones($contact);
        $this->addSequences($contact);
        $this->addMails($contact);
        $this->addNotes($contact);
        $this->addSales($contact);

        $this->addCompany($contact);

        return $this->data;
    }

    public function addEmails(Contact $contact): void
    {
        $this->data[Contact::EMAIL_COLLECTION_FIELD] = $contact->contactEmails()
            ->pluck(ContactEmails::EMAIL_FIELD);
    }

    public function addPhones(Contact $contact): void
    {
        $this->data[Contact::PHONE_COLLECTION_FIELD] = $contact->contactPhones()
            ->pluck(ContactPhones::PHONE_FIELD);
    }

    public function addSocialNetworks(Contact $contact): void
    {
        $this->data[Contact::SOCIAL_NETWORK_COLLECTION_FIELD] = $contact->contactSocialNetworks()
            ->pluck(ContactSocialNetworks::SOCIAL_LINK_FIELD);
    }

    public function addSequences(Contact $contact): void
    {
        $sequences = $contact->sequences()->with(CampaignStatus::STATUS_FIELD)->get();

        if (!$sequences->count()) {
            return;
        }

        $this->data[Contact::SEQUENCE_COLLECTION_FIELD] = [
            ContactCampaigns::SEQUENCE_FIELD => $sequences->pluck(ContactCampaigns::SEQUENCE_FIELD),
            CampaignStatus::STATUS_FIELD => $sequences->pluck(CampaignStatus::STATUS_FIELD . CampaignStatus::NAME_FIELD)
        ];
    }

    public function addMails(Contact $contact): void
    {
        $this->data[Contact::MAIL_COLLECTION_FIELD] = $contact->mails()->pluck(ContactMails::FIELD_MESSAGE);
    }

    public function addNotes(Contact $contact): void
    {
        $this->data[Contact::NOTE_COLLECTION_FIELD] = $contact->notes()->pluck(ContactNotes::FIELD_MESSAGE);
    }

    public function addSales(Contact $contact): void
    {
        $sales = $contact->sales()->with([SaleStatus::STATUS, Source::SOURCE])->get();

        if (!$sales->count()) {
            return;
        }

        $saleDates = [];
        $sales->pluck(ContactSale::CREATED_AT)->each(function ($date) use (&$saleDates) {
            $saleDates[] = $date->format(self::DATE_FORMAT);
        });

        $this->data[Contact::SALE_COLLECTION_FIELD] = [
            ContactSale::CREATED_AT => $saleDates,
            ContactSale::PROJECT_C1_FIELD => $sales->pluck(ContactSale::PROJECT_C1_FIELD),
            SaleStatus::STATUS => $sales->pluck(SaleStatus::STATUS . SaleStatus::NAME_FIELD),
            Source::SOURCE => $sales->pluck(Source::SOURCE . Source::NAME_FIELD)
        ];
    }

    public function addCompany(Contact $contact): void
    {
        if (!empty($contact->company)) {
            $this->data[CompanyFields::COMPANY_FIELD] = (new CompanyTransformer())->transform($contact->company);
        }
    }
}
