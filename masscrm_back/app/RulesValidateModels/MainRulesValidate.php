<?php

declare(strict_types=1);

namespace App\RulesValidateModels;

use App\Models\BaseModel;
use Illuminate\Support\Facades\Lang;
use App\Http\Requests\AbstractRequest;

class MainRulesValidate implements RulesValidateInterface
{
    private const VALIDATION_INDUSTRY = '/^[a-zA-Z& \\\,-\/]+$/';

    public function rulesCreate(): array
    {
        return [];
    }

    public function rulesUpdate(BaseModel $model): array
    {
        return [];
    }

    public function rules(): array
    {
        return [
            'companyVacancies' => 'array',
            'companyVacancies.vacancy' => 'array',
            'companyVacancies.vacancy.*.job' => 'nullable|string',
            'companyVacancies.vacancy.*.job_skills' => 'nullable|string',
            'companyVacancies.vacancy.*.job_urls' => 'nullable|string',
            'companyIndustries' => 'array',
            'companyIndustries.industry' => 'array|min:1',
            'companyIndustries.industry.*' => 'string|regex:' . self::VALIDATION_INDUSTRY,
            'contactEmail' => 'array',
            'contactEmail.email' => 'array|min:1',
            'contact.position' => 'string',
            'contactEmail.email.*' => 'string|email:filter',
            'contactEmail.requires_validation' => 'array',
            'contactEmail.requires_validation.*' => 'string',
            'contactPhone' => 'array',
            'contactPhone.phone' => 'array',
            'contactPhone.phone.*' => 'string|regex:' . AbstractRequest::REGEX_PHONE,
            'contactCampaigns' => 'array',
            'contactCampaigns.sequence'
                => 'required_with:contactCampaigns.status_id|array|gte:contactCampaigns.status_id',
            'contactCampaigns.sequence.*' => 'string',
            'contactCampaigns.status_id' => 'required_with:contactCampaigns.sequence|array',
            'contactCampaigns.status_id.*' => 'string',
            'contactSales' => 'array',
            'contactSales.link' => 'array',
            'contactSales.link.*' => 'string',
            'contactSales.created_at' => 'array',
            'contactSales.created_at.*' => 'date',
            'contactSales.source_id' => 'array',
            'contactSales.source_id.*' => 'string',
            'contactSales.status_id' => 'array',
            'contactSales.status_id.*' => 'string',
            'contactSales.project_c1' => 'array'
        ];
    }

    public function messages(): array
    {
        return [
            'companyVacancies.vacancy.gte' => Lang::get('validationModel.vacancy.name_invalid_count'),
            'companyVacancies.link
            .*.url' => Lang::get('validationModel.vacancy.url_invalid'),
            'contactEmail.email.*.regex' => Lang::get('validationModel.contactEmail.email_invalid'),
            'contactPhone.phone.*.regex' => Lang::get('validationModel.contactPhone.phone_invalid'),
        ];
    }
}
