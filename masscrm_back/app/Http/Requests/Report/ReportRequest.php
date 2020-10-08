<?php

namespace App\Http\Requests\Report;

use App\Http\Requests\AbstractRequest;
use Illuminate\Validation\Rule;
use App\Services\Reports\SearchType;

class ReportRequest extends AbstractRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        $listParams = implode(',', array_keys(SearchType::LIST_FIELDS));

        return [
            'listField' => 'array',
            'listField.*' => 'string|in:' . $listParams,
            'search' => 'array',
            'search.*' => 'in:'. $listParams,
            'search.responsible' => 'array',
            'search.created' => 'array|size:2',
            'search.created.min' => 'required_with:search.created|date',
            'search.created.max' => 'required_with:search.created|date|after_or_equal:search.created.min',
            'search.updated' => 'array|size:2',
            'search.updated.min' => 'required_with:search.updated|date',
            'search.updated.max' => 'required_with:search.updated|date|after_or_equal:search.updated.min',
            'search.first_name' => 'string',
            'search.last_name' => 'string',
            'search.full_name' => 'string',
            'search.gender' => 'array|min:1',
            'search.birthday' => 'array|size:2',
            'search.birthday.min' => 'required_with:search.birthday|string',
            'search.birthday.max' => 'required_with:search.birthday|string',
            'search.country' => 'array|min:1',
            'search.country.*' => 'required_with:search.country|string',
            'search.city' => 'array|min:1',
            'search.city.*' => 'required_with:search.city|string',
            'search.region' => 'array|min:1',
            'search.region.*' => 'required_with:search.region|string',
            'search.location' => 'array|min:1',
            'search.location.*' => 'required_with:search.location|string',
            'search.position' => 'array|min:1',
            'search.position.*' => 'string|max:255',
            'search.in_blacklist' => 'array|min:1',
            'search.in_blacklist.*' => 'required_with:search.in_blacklist|boolean',
            'search.linkedin' => 'string',
            'search.social_networks' => 'string',
            'search.phones' => 'string',
            'search.skype' => 'string',
            'search.emails' => 'string',
            'search.origin' => 'array|min:1',
            'search.origin.*' => 'string',
            'search.requiresValidation' => 'array|between:1,2',
            'search.requiresValidation.*' => 'boolean',
            'search.colleagues' => 'string',
            'search.colleagues_link' => 'string',
            'search.mailing_tool' => 'array|between:1,2',
            'search.service_id' => 'integer|min:1',
            'search.added_to_mailing' => 'array|size:2',
            'search.added_to_mailing.min' => 'required_with:search.added_to_mailing|date',
            'search.added_to_mailing.max'=>
                'required_with:search.added_to_mailing|date|after_or_equal:search.added_to_mailing.min',
            'search.confidence' => 'array|size:2',
            'search.confidence.max' => 'integer',
            'search.confidence.min' => 'integer|lte:search.confidence.max',
            'search.last_touch' => 'array|size:2',
            'search.last_touch.min' => 'required_with:search.last_touch|date',
            'search.last_touch.max' => 'required_with:search.last_touch|date|after_or_equal:search.last_touch.min',
            'search.sequence' => 'string',
            'search.status' => 'array|min:1',
            'search.status.*' => 'string',
            'search.opens' => 'array|size:2',
            'search.opens.max' => 'integer',
            'search.opens.min' => 'integer|lte:search.opens.max',
            'search.views' => 'array|size:2',
            'search.views.max' => 'integer',
            'search.views.min' => 'integer|lte:search.views.max',
            'search.deliveries' => 'array|size:2',
            'search.deliveries.max' => 'integer',
            'search.deliveries.min' => 'integer|lte:search.deliveries.max',
            'search.replies' => 'array|size:2',
            'search.replies.max' => 'integer',
            'search.replies.min' => 'integer|lte:search.replies.max',
            'search.bounces' => 'integer|min:0',
            'search.mails' => 'string',
            'search.my_notes' => 'string',
            'search.sale_created' => 'array|size:2',
            'search.sale_created.min' => 'required_with:search.sale_created|date',
            'search.sale_created.max' =>
                'required_with:search.sale_created|date|after_or_equal:search.sale_created.min',
            'search.source' => 'array|min:1',
            'search.source.*' => 'string',
            'search.sale_link' => 'string',
            'search.sale_status' => 'array|min:1',
            'search.sale_status.*' => 'string',
            'search.sale_project_c1' => 'array|between:1,2',
            'search.sale_project_c1.*' => 'boolean',
            'search.company' => 'array|min:1',
            'search.company.*' => 'string',
            'search.company_website' => 'string',
            'search.company_linkedin' => 'string',
            'search.company_cto' => 'string',
            'search.company_industries' => 'array|min:1',
            'search.company_industries.*' => 'string',
            'search.company_size' => 'array|min:1',
            'search.company_size.max' => 'integer|gte:search.company_size.min',
            'search.company_size.min' => 'integer',
            'search.company_type' => 'array|min:1',
            'search.company_type.*' => 'string',
            'search.company_subsidiary' => 'string',
            'search.company_holding' => 'string',
            'search.company_founded' => 'array|size:2',
            'search.company_founded.min' => 'required_with:search.company_founded|date',
            'search.company_founded.max' =>
                'required_with:search.company_founded|date|after_or_equal:search.company_founded.min',
            'search.company_created' => 'array|size:2',
            'search.company_created.min' => 'required_with:search.company_created|date',
            'search.company_created.max' =>
                'required_with:search.company_created|date|after_or_equal:search.company_created.min',
            'search.jobs' => 'array|min:1',
            'search.jobs.*' => 'string',
            'search.jobs_skills' => 'array|min:1',
            'search.jobs_skills.*' => 'string',
            'search.jobs_urls' => 'string',
            'search.comments' => 'string',
            'sort' => 'array|size:2',
            'sort.fieldName' => 'required_with:sort|string|in:'. $listParams,
            'sort.typeSort' => 'required_with:sort|string', Rule::in(['ASC', 'DESC']),
            'typeFile' => 'required|string|in:csv,xls',
            'limit' => 'integer|min:1'
        ];
    }

    public function messages(): array
    {
        return [
            'listField.*.in' => 'The value :input does not exist. The listField must be the following types: :values',
        ];
    }
}
