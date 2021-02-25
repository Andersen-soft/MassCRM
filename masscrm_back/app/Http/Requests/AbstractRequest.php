<?php

declare(strict_types=1);

namespace App\Http\Requests;

use App\Exceptions\Validation\ValidationRequestException;
use App\Models\Company\Company;
use App\Models\Contact\Contact;
use App\Models\Contact\ContactSale;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Lang;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

abstract class AbstractRequest extends FormRequest
{
    public const REGEX_PHONE = '/^[0-9+()-]+$/';
    public const REGEX_INDUSTRY_NAME = '/^[a-zA-Z& \\\,-\/]+$/';
    public const REGEX_LINK_LINKEDIN = '/^https?:\/\/((www)\.)?linkedin.com/';
    public const REGEX_GET_URL = '/^(http|https?):\/\/((www)\.)?/';
    public const GENDER_REQUIRED_FOR_COUNTRIES = [
        'Germany',
        'Austria',
        'Luxembourg',
        'Switzerland',
        'Belgium',
        'France'
    ];

    protected function failedValidation(Validator $validator): void
    {
        $errors = (new ValidationException($validator))->errors();
        throw new ValidationRequestException($errors);
    }

    public function getSearchValidationRules(): array
    {
        $gender = array_keys(Lang::get('filters.genders'));
        return [
            'page' => 'integer|min:1',
            'limit' => 'integer|min:1|max:50',
            'search' => 'array',
            'search.*' => 'in:' . implode(',', Contact::getFieldsToSearch()),
            'search.global' => 'array',
            'search.global.query' => 'string|max:255',
            'search.global.from' => 'required_with:search.global.to|date',
            'search.global.to' => 'required_with:search.global.from|date',
            'search.responsible_id' => 'array|min:1',
            'search.responsible_id.*' => 'integer',
            'search.responsible_roles' => 'array|min:1',
            'search.responsible.roles.*' => 'string',
            'search.created_at' => 'array|size:2',
            'search.created_at.min' => 'required_with:search.created_at|date',
            'search.created_at.max' => 'required_with:search.created_at|date|after_or_equal:search.created_at.min',
            'search.date_of_use' => 'array|size:2',
            'search.date_of_use.min' => 'required_with:search.date_of_use|date',
            'search.date_of_use.max' => 'required_with:search.date_of_use|date|after_or_equal:search.is_in_work.min',
            'search.updated_at' => 'array|size:2',
            'search.updated_at.min' => 'required_with:search.updated_at|date',
            'search.updated_at.max' => 'required_with:search.updated_at|date|after_or_equal:search.updated_at.min',
            'search.first_name' => 'string|max:255',
            'search.last_name' => 'string|max:255',
            'search.full_name' => 'string|max:255',
            'search.gender' => 'array|min:1|max:2',
            'search.gender.*' => 'string|in:' . implode(',', $gender),
            'search.birthday' => 'array|size:2',
            'search.birthday.min' => 'required_with:search.birthday|string|max:30',
            'search.birthday.max' => 'required_with:search.birthday|string|max:30',
            'search.country' => 'array|min:1',
            'search.country.*' => 'required_with:search.country|string|max:255',
            'search.city' => 'array|min:1',
            'search.city.*' => 'required_with:search.city|string|max:255',
            'search.is_in_work' => 'array|min:1',
            'search.is_in_work.*' => 'required_with:search.is_in_work|boolean',
            'search.skip_responsibility' => 'boolean',
            'search.in_blacklist' => 'array|min:1',
            'search.in_blacklist.*' => 'required_with:search.in_blacklist|boolean',
            'search.region' => 'array|min:1',
            'search.region.*' => 'required_with:search.region|string|max:255',
            'search.position' => 'array|min:1',
            'search.position.*' => 'string|max:255',
            'search.linkedin' => 'string|max:255',
            'search.social_networks' => 'string|max:255',
            'search.phone' => 'string|max:255',
            'search.skype' => 'string|max:255',
            'search.email' => 'string|max:255',
            'search.no_email' => 'string|max:255',
            'search.origin' => 'array|min:1',
            'search.origin.*' => 'string|max:255',
            'search.requires_validation' => 'boolean',
            'search.colleague_name' => 'string|max:255',
            'search.colleague_link' => 'string',
            'search.mailing_tool' => 'array|between:1,2',
            'search.service_id' => 'string',
            'search.added_to_mailing' => 'array|size:2',
            'search.added_to_mailing.min' => 'required_with:search.added_to_mailing|date',
            'search.added_to_mailing.max' => 'required_with:search.added_to_mailing|date|after_or_equal:search.added_to_mailing.min',
            'search.confidence' => 'array|size:2',
            'search.confidence.max' => 'integer',
            'search.confidence.min' => 'integer|lte:search.confidence.max',
            'search.last_touch' => 'array|size:2',
            'search.last_touch.min' => 'required_with:search.last_touch|date',
            'search.last_touch.max' => 'required_with:search.last_touch|date|after_or_equal:search.last_touch.min',
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
            'search.bounces' => 'array|min:1',
            'search.bounces.*' => 'required_with:search.bounces|boolean',
            'search.sequence' => 'string|max:255',
            'search.status' => 'array|min:1',
            'search.status.*' => 'string|max:100',
            'search.mails' => 'string|max:255',
            'search.my_notes' => 'string|max:255',
            'search.comment' => 'string|max:255',
            'search.sale' => 'array|min:1',
            'search.sale.*' => 'in:' . implode(',', ContactSale::getFieldsToSearch()),
            'search.sale.id' => 'integer|min:0',
            'search.sale.created_at' => 'array|size:2',
            'search.sale.created_at.min' => 'required_with:search.sale.created_at|date',
            'search.sale.created_at.max' =>
                'required_with:search.sale.created_at|date|after_or_equal:search.sale.created_at.min',
            'search.sale.source' => 'array|min:1',
            'search.sale.source.*' => 'string|max:150',
            'search.sale.link' => 'string',
            'search.sale.status' => 'array|min:1',
            'search.sale.status.*' => 'string|max:150',
            'search.sale.project_c1' => 'boolean',
            'search.company' => 'array|min:1',
            'search.company.*' => 'in:' . implode(',', Company::getFieldsToSearch()),
            'search.company.created_at' => 'array|size:2',
            'search.company.created_at.min' => 'required_with:search.company.created_at|date',
            'search.company.created_at.max' =>
                'required_with:search.company.created_at|date|after_or_equal:search.company.created_at.min',
            'search.company.name' => 'array|min:1',
            'search.company.name.*' => 'string|max:150',
            'search.company.website' => 'string',
            'search.company.linkedin' => 'string',
            'search.company.sto_full_name' => 'string|max:150',
            'search.company.founded' => 'array|size:2',
            'search.company.founded.min' => 'required_with:search.founded|date',
            'search.company.founded.max' => 'required_with:search.founded|date|after_or_equal:search.founded.min',
            'search.company.industry' => 'array|min:1',
            'search.company.industry.*' => 'string|max:150',
            'search.company.type' => 'array|min:1',
            'search.company.type.*' => 'string|max:50',
            'search.company.company_size' => 'array|min:1',
            'search.company.company_size.max' => 'integer|gte:search.company.company_size.min',
            'search.company.company_size.min' => 'integer',
            'search.company.has_jobs' => 'boolean',
            'search.company.jobs_status' => 'boolean',
            'search.company.jobs' => 'array|min:1',
            'search.company.jobs.*' => 'string',
            'search.company.skills' => 'array|min:1',
            'search.company.skills.*' => 'string',
            'search.company.link' => 'string',
            'search.company.subsidiary' => 'string',
            'search.company.holding' => 'string',
            'sort' => 'array|size:2',
            'sort.field_name' => 'required_with:sort|string|in:' . implode(',', Contact::getFieldsToSort()),
            'sort.type_sort' => 'required_with:sort|string', Rule::in(['ASC', 'DESC'])
        ];
    }
}
