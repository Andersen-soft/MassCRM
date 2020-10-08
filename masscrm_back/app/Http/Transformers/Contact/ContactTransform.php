<?php

namespace App\Http\Transformers\Contact;

use App\Http\Transformers\Company\CompanyTransform;
use App\Models\Contact\Contact;
use App\Models\Contact\ContactCampaigns;
use App\Models\Contact\ContactColleagues;
use App\Models\Contact\ContactEmails;
use App\Models\Contact\ContactMails;
use App\Models\Contact\ContactNotes;
use App\Models\Contact\ContactPhones;
use App\Models\Contact\ContactSale;
use App\Models\Contact\ContactSocialNetworks;
use Illuminate\Support\Facades\Lang;
use League\Fractal\TransformerAbstract;

class ContactTransform extends TransformerAbstract
{
    protected bool $isNeedCompany;

    public function __construct(bool $isNeedCompany = false)
    {
        $this->isNeedCompany = $isNeedCompany;
    }

    /**
     * @OA\Schema(
     *    schema="Contact",
     *    required={
     *        "id", "company_id", "responsible", "created_at", "first_name", "last_name", "full_name",
     *        "gender", "birthday", "location", "position", "linkedin", "skype", "last_touch", "added_to_mailing",
     *        "mailing_tool", "origin", "opens", "views", "deliveries", "replies", "bounces", "confidence",
     *        "service_id", "emails", "in_blacklist"
     *    },
     *    @OA\Property(property="id", type="integer", example=123),
     *    @OA\Property(property="company_id", type="integer", example=123),
     *    @OA\Property(property="responsible", type="string", example="Mr. Test"),
     *    @OA\Property(property="created_at", type="string", format="d.m.Y H:i", example="18.06.2020 13:15:00"),
     *    @OA\Property(property="updated_at", type="string", format="d.m.Y H:i", example="18.06.2020 13:15:00"),
     *    @OA\Property(property="first_name", type="string", example="first"),
     *    @OA\Property(property="last_name", type="string", example="last"),
     *    @OA\Property(property="full_name", type="string", example="full"),
     *    @OA\Property(property="gender", type="string", example={"m", "f"}),
     *    @OA\Property(property="birthday", type="string", format="d.m.Y", example="18.06.2020"),
     *    @OA\Property(property="location", type="object",
     *        @OA\Property(property="country", type="string", example="Belarus"),
     *        @OA\Property(property="region", type="string", example="Vitebsk"),
     *        @OA\Property(property="city", type="string", example="Polotsk"),
     *    ),
     *    @OA\Property(property="position", type="string", example="DevOps"),
     *    @OA\Property(property="linkedin", type="string", example="http://test.com/122"),
     *    @OA\Property(property="skype", type="string", example="deev"),
     *    @OA\Property(property="last_touch", type="string", format="d.m.Y H:i", example="18.06.2020 13:15:00"),
     *    @OA\Property(property="added_to_mailing", type="string", format="d.m.Y H:i", example="18.06.2020 13:15:00"),
     *    @OA\Property(property="mailing_tool", type="string", example="replay"),
     *    @OA\Property(property="origin", type="string", example=""),
     *    @OA\Property(property="opens", type="integer", example=0),
     *    @OA\Property(property="views", type="integer", example=0),
     *    @OA\Property(property="deliveries", type="integer", example=0),
     *    @OA\Property(property="replies", type="integer", example=0),
     *    @OA\Property(property="bounces", type="integer", example=0),
     *    @OA\Property(property="confidence", type="integer", example=99),
     *    @OA\Property(property="service_id", type="integer", example=1233654),
     *    @OA\Property(property="comment", type="string", example="good worker"),
     *    @OA\Property(property="in_blacklist", type="boolean", example=false),
     *    @OA\Property(property="emails", type="array",
     *        @OA\Items(type="object",
     *            required={"id", "email","verification"},
     *            @OA\Property(property="email", type="string", example="test1@test.com"),
     *            @OA\Property(property="id", type="integer", example=123),
     *            @OA\Property(property="verification", type="boolean", example="true"),
     *        ),
     *    ),
     *    @OA\Property(property="social_networks", type="array",
     *        @OA\Items(type="object",
     *            required={"id", "link"},
     *            @OA\Property(property="id", type="integer", example=123),
     *            @OA\Property(property="link", type="string", example="http://test.com/12234"),
     *        ),
     *    ),
     *    @OA\Property(property="colleagues", type="array",
     *        @OA\Items(type="object",
     *            required={"id", "link", "full_name"},
     *            @OA\Property(property="id", type="integer", example=123),
     *            @OA\Property(property="link", type="string", example="http://test.com/12234"),
     *            @OA\Property(property="full_name", type="string", example="Test Full Name"),
     *        ),
     *    ),
     *    @OA\Property(property="phones", type="array",
     *        @OA\Items(type="object",
     *            required={"id", "phone"},
     *            @OA\Property(property="id", type="integer", example=123),
     *            @OA\Property(property="phone", type="string", example="375295553322"),
     *        ),
     *    ),
     *    @OA\Property(property="sequences", type="array",
     *        @OA\Items(type="object",
     *            required={"id", "sequence", "status"},
     *            @OA\Property(property="id", type="integer", example=123),
     *            @OA\Property(property="sequence", type="string", example="text"),
     *            @OA\Property(property="status", type="string", example="Actived"),
     *        ),
     *    ),
     *    @OA\Property(property="mail", type="array",
     *        @OA\Items(type="object",
     *            required={"id", "message"},
     *            @OA\Property(property="id", type="integer", example=123),
     *            @OA\Property(property="message", type="string", example="text"),
     *        ),
     *    ),
     *    @OA\Property(property="notes", type="array",
     *        @OA\Items(type="object",
     *            required={"id", "message"},
     *            @OA\Property(property="id", type="integer", example=123),
     *            @OA\Property(property="message", type="string", example="text"),
     *        ),
     *    ),
     *    @OA\Property(property="sales", type="array",
     *        @OA\Items(type="object",
     *            required={"id", "created_at", "link", "project_c1", "status", "source"},
     *            @OA\Property(property="id", type="integer", example=123),
     *            @OA\Property(
     *                  property="created_at",
     *                  type="string",
     *                  format="d.m.Y H:i",
     *                  example="18.06.2020 13:15:00"
     *            ),
     *            @OA\Property(property="link", type="string", example="http://test.com/12234"),
     *            @OA\Property(property="project_c1", type="boolean", example="true"),
     *            @OA\Property(property="status", type="string", example="text"),
     *            @OA\Property(property="source", type="string", example="text"),
     *        ),
     *    ),
     *    @OA\Property(property="company", type="object", ref="#/components/schemas/Company"),
     * )
     */
    public function transform(Contact $contact): array
    {
        $contactToArr = [
            'id' => $contact->getId(),
            'company_id' => $contact->getCompanyId(),
            'responsible' => $contact->getResponsible() ?: '',
            'created_at' => $contact->getCreatedAtDateTime(),
            'updated_at' => $contact->getUpdatedAtDateTime(),
            'first_name' => $contact->getFirstName() ?: '',
            'last_name' => $contact->getLastName() ?: '',
            'full_name' => $contact->getFullName() ?: '',
            'gender' => $contact->getGender() ?: '',
            'birthday' => $contact->getBirthdayDate() ?: '',
            'location' => [
                'country' => $contact->getCountry() ?: '',
                'city' => $contact->getCity() ?: '',
                'region' => $contact->getRegion() ?: '',
            ],
            'position' => $contact->getPosition() ?: '',
            'linkedin' => $contact->getLinkedin() ?: '',
            'skype' => $contact->getSkype() ?: '',
            'last_touch' => $contact->getLastTouchDateTime(),
            'added_to_mailing' => $contact->getAddedToMailingDateTime(),
            'mailing_tool' => $contact->getMailingTool() ?: '',
            'origin' => $contact->getOrigin() ?: '',
            'opens' => $contact->getOpens() ?: 0,
            'views' => $contact->getViews() ?: 0,
            'deliveries' => $contact->getDeliveries() ?: 0,
            'replies' => $contact->getReplies() ?: 0,
            'bounces' => $contact->getBounces() ?: 0,
            'confidence' => $contact->getConfidence() ?: 0,
            'service_id' => $contact->getServiceId() ?: null,
            'comment' => $contact->getComment() ?: '',
        ];
        $this->addEmails($contact, $contactToArr);
        $this->addPhones($contact, $contactToArr);
        $this->addSocialNetworks($contact, $contactToArr);
        $this->addColleagues($contact, $contactToArr);
        $this->addSequences($contact, $contactToArr);
        $this->addMails($contact, $contactToArr);
        $this->addNotes($contact, $contactToArr);
        $this->addSales($contact, $contactToArr);
        if ($this->isNeedCompany) {
            $this->addCompany($contact, $contactToArr);
        }

        return $contactToArr;
    }

    public function addEmails(Contact $contact, array &$contactToArr): void
    {
        /** @var ContactEmails $email */
        foreach ($contact->contactEmails as $email) {
            if ($email->isActive()) {
                $contactToArr['emails'][] = [
                    'id' => $email->getId(),
                    'email' => $email->getEmail(),
                    'verification' => $email->isVerification(),
                ];
            }
        }
    }

    public function addPhones(Contact $contact, array &$contactToArr): void
    {
        /** @var ContactPhones $phone */
        foreach ($contact->contactPhones as $phone) {
            if ($phone->isActive()) {
                $contactToArr['phones'][] = [
                    'id' => $phone->getId(),
                    'phone' => $phone->getPhone()
                ];
            }
        }
    }

    public function addSocialNetworks(Contact $contact, array &$contactToArr): void
    {
        /** @var ContactSocialNetworks $network */
        foreach ($contact->contactSocialNetworks as $network) {
            if ($network->isActive()) {
                $contactToArr['social_networks'][] = [
                    'id' => $network->getId(),
                    'link' => $network->getLink()
                ];
            }
        }
    }

    public function addColleagues(Contact $contact, array &$contactToArr): void
    {
        /** @var ContactColleagues $colleague */
        foreach ($contact->contactColleagues as $colleague) {
            $link = $colleague->getLink();
            if ($colleague->getContactIdRelation()) {
                $link = $colleague->contractRelation->getLinkedin();
            }

            $contactToArr['colleagues'][] = [
                'id' => $colleague->getId(),
                'link' => $link,
                'full_name' => $colleague->getFullName()
            ];
        }
    }

    public function addSequences(Contact $contact, array &$contactToArr): void
    {
        /** @var ContactCampaigns $sequence */
        foreach ($contact->sequences as $sequence) {
            if ($sequence->status->isActive()) {
                $contactToArr['sequences'][] = [
                    'id' => $sequence->getId(),
                    'sequence' => $sequence->getSequence(),
                    'status' => $sequence->status->getName()
                ];
            }
        }
    }

    public function addMails(Contact $contact, array &$contactToArr): void
    {
        /** @var ContactMails $mail */
        foreach ($contact->mails as $mail) {
            $contactToArr['mails'][] = [
                'id' => $mail->getId(),
                'message' => $mail->getMessage()
            ];
        }
    }

    public function addNotes(Contact $contact, array &$contactToArr): void
    {
        /** @var ContactNotes $note */
        foreach ($contact->notes as $note) {
            $contactToArr['notes'][] = [
                'id' => $note->getId(),
                'message' => $note->getMessage()
            ];
        }
    }

    public function addSales(Contact $contact, array &$contactToArr): void
    {
        /** @var ContactSale $sale */
        foreach ($contact->sales as $sale) {
            $contactToArr['sales'][] = [
                'id' => $sale->getId(),
                'created_at' => $sale->getCreatedAtDate(),
                'link' => $sale->getLink(),
                'project_c1' => $sale->isProjectC1() ? Lang::get('report.yes') : Lang::get('report.no'),
                'status' => $sale->status ? $sale->status->getName() : '',
                'source' => $sale->source ? $sale->source->getName() : '',
            ];
        }
    }

    public function addCompany(Contact $contact, array &$contactToArr): void
    {
        if (!empty($contact->company)) {
            $contactToArr['company'] = (new CompanyTransform(false))->transform($contact->company);
        }
    }
}
