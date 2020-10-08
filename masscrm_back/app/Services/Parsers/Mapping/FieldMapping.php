<?php

namespace App\Services\Parsers\Mapping;

use App\Exceptions\Import\ImportFileException;
use App\Models\Company\Fields\CompanyFields;
use App\Models\Company\CompanyVacancy;
use App\Models\Contact\Contact;
use App\Models\Contact\ContactEmails;
use App\Models\Contact\ContactPhones;
use App\Models\Contact\ContactCampaigns;
use App\Models\Contact\ContactSale;
use App\RulesValidateModels\MainRulesValidate;
use App\Services\Validator\ValidatorService;

class FieldMapping
{
    private array $separators = [
        'semicolon' => ';',
        'comma' => ',',
        'space' => ' ',
        'tab' => PHP_EOL,
    ];

    private const FIELDS_TRANSFORM = [
        'job',
        'job_skills',
        'job_urls',
        'industry',
        'subsidiaries',
        'holding',
        'c_social',
        'mails',
        'my_notes',
        'colleague',
        'email',
        'requires_validation',
        'phone',
        'sequence',
        'status',
        'sale_id',
        'sale_created',
        'source',
        'sale_status',
        'sale_project_c1'
    ];

    private MainRulesValidate $mainRulesValidate;
    private ValidatorService $validatorService;

    public function __construct(MainRulesValidate $mainRulesValidate, ValidatorService $validatorService)
    {
        $this->mainRulesValidate = $mainRulesValidate;
        $this->validatorService = $validatorService;
    }

    private function getMapEntity(): array
    {
        return [
            'company' => [
                'company' => CompanyFields::NAME_FIELD,
                'website' => CompanyFields::WEBSITE_FIELD,
                'comp_linkedin' => CompanyFields::LINKEDIN_FIELD,
                'sto' => CompanyFields::STO_FULL_NAME_FIELD,
                'comp_type' => CompanyFields::TYPE_FIELD,
                'founded' => CompanyFields::FOUNDED_FIELD,
                'comp_size' => 'companySize',
            ],
            'companyVacancies' => [
                'job' => CompanyVacancy::VACANCY,
                'job_skills' => CompanyVacancy::SKILLS,
                'job_urls' => CompanyVacancy::LINK,
            ],
            'companyIndustries' => [
                'industry' => 'industry'
            ],
            'companySubsidiaries' => [
                'subsidiaries' => 'subsidiaries'
            ],
            'companyHolding' => [
                'holding' => 'holding'
            ],
            'contact' => [
                'first_name' => Contact::FIRST_NAME_FIELD,
                'last_name' => Contact::LAST_NAME_FIELD,
                'full name' => Contact::FULL_NAME_FIELD,
                'gender' => Contact::GENDER_FIELD,
                'date_of_birth' => Contact::BIRTHDAY_FIELD,
                'country' => Contact::COUNTRY_FIELD,
                'region' => Contact::REGION_FIELD,
                'city' => Contact::CITY_FIELD,
                'position' => Contact::POSITION_FIELD,
                'c_linkedin' => Contact::LINKEDIN_FIELD,
                'skype' => Contact::SKYPE_FIELD,
                'last_touch' => Contact::LAST_TOUCH_FIELD,
                'added_to_mailing' => Contact::ADDED_TO_MAILING_FIELD,
                'opens' => Contact::OPENS_FIELD,
                'views' => Contact::VIEWS_FIELD,
                'deliveries' => Contact::DELIVERIES_FIELD,
                'replies' => Contact::REPLIES_FIELD,
                'bounces' => Contact::BOUNCES_FIELD,
                'confidence' => Contact::CONFIDENCE_FIELD,
                'service_id' => Contact::SERVICE_ID_FIELD,
                'c_comment' => Contact::COMMENT_FIELD
            ],
            'contactSocialNetwork' => [
                'c_social' => 'link'
            ],
            'contactMail' => [
                'mails' => 'message'
            ],
            'contactNote' => [
                'my_notes' => 'message'
            ],
            'contactColleague' => [
                'colleague' => 'full_name'
            ],
            'contactEmail' => [
                'email' => ContactEmails::EMAIL_FIELD,
                'requires_validation' => ContactEmails::REQUIRES_VALIDATION,
            ],
            'contactPhone' => [
                'phone' => ContactPhones::PHONE_FIELD
            ],
            'contactCampaigns' => [
                'sequence' => ContactCampaigns::SEQUENCE_FIELD,
                'status' => ContactCampaigns::STATUS_ID_FIELD,
            ],
            'contactSales' => [
                'sale_id' => ContactSale::LINK_FIELD,
                'sale_created' => ContactSale::CREATED_AT_FIELD,
                'source' => ContactSale::SOURCE_ID_FIELD,
                'sale_status' => ContactSale::STATUS_ID_FIELD,
                'sale_project_c1' => ContactSale::PROJECT_C1_FIELD
            ]
        ];
    }

    public function mappingFields(array $data, array $fields, string $separator): array
    {
        $valueFields = [];
        $entityValues = [];

        foreach ($fields as $key => $field) {

            if ($field === 'job'){
                $valueFields[$field][] = $data[$key];
                continue;
            }

            if ($field === 'job_skills'){
                $valueFields[$field][] = $data[$key];
                continue;
            }

            if ($field === 'job_urls'){
                $valueFields[$field][] = $data[$key];
                continue;
            }

            if (array_key_exists($key, $data)) {
                $valueFields[$field] = $data[$key];
            }
        }

        foreach ($this->getMapEntity() as $entity => $item) {
            $this->mapEntityFields($item, $valueFields, $entity, $separator,$entityValues);
        }

        $entityValues['companyVacancies']['vacancy'] = $this->formJobData($valueFields);

        $this->validate($entityValues);

        return $entityValues;
    }

    private function mapEntityFields(
        array $item,
        array $valueFields,
        $entity,
        string $separator,
        array &$entityValues
    ): void
    {
        foreach ($item as $key => $field) {
            if (array_key_exists($key, $valueFields) && !is_array($valueFields[$key])) {
                $this->parseSingleField($entity, $valueFields, $key, $separator,$entityValues, $field);
            }
        }
    }

    private function formJobData(array $valueFields): array
    {
        $formedJobData = [];

        if(isset($valueFields['job'])) {
            foreach ($valueFields['job'] as $key => $jobValue) {
                $formedJobData[$key]['job'] = $jobValue;
            }
        }

        if(isset($valueFields['job_skills'])){
            foreach ($valueFields['job_skills'] as $key => $skillValue){
                $formedJobData[$key]['job_skills'] = $skillValue;
            }
        }

        if(isset($valueFields['job_urls'])){
            foreach ($valueFields['job_urls'] as $key =>  $urlValue){
                $formedJobData[$key]['job_urls'] = $urlValue;
            }
        }

        return $formedJobData;
    }

    private function parseSingleField(
        $entity,
        array $valueFields,
        $key,
        $separator,
        array &$entityValues,
        string $field): void
    {
        if (in_array($key, self::FIELDS_TRANSFORM, true)) {
            $entityValues[$entity][$field] = $this->getSplitString($valueFields[$key], $separator);
        } else {
            $entityValues[$entity][$field] = trim($valueFields[$key]) ?: null;
        }

    }

    private function validate(array $entityValues): void
    {
        if (!$this->validatorService->basicValidate($entityValues, $this->mainRulesValidate)) {
            throw new ImportFileException($this->validatorService->getErrors());
        }
    }

    private function getSplitString(?string $str, string $separator): array
    {
        if (!$str) {
            return [];
        }

        if (!array_key_exists($separator, $this->separators)) {
            return trim($str);
        }

        $list = explode($this->separators[$separator], trim($str));
        foreach ($list as $key => $value) {
            $list[$key] = trim($value);
        }

        return $list;
    }
}
