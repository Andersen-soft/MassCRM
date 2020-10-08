<?php

namespace App\RulesValidateModels\Company;

use App\Models\Company\Company;
use App\RulesValidateModels\RulesValidateInterface;
use Illuminate\Support\Facades\Lang;
use App\Http\Requests\AbstractRequest;

class RulesCompany implements RulesValidateInterface
{
    public function rulesCreate(): array
    {
        return [
            'name' => 'required|string|max:150|unique:companies,name',
            'website' => 'nullable|string|url|unique:companies,website',
            'linkedin' => 'nullable|string|unique:companies,linkedin|regex:' . AbstractRequest::REGEX_LINK_LINKEDIN,
            'sto_full_name' => 'nullable|string|max:150',
            'type' => 'nullable|string|max:50|in:' . implode(',', [
                Company::TYPE_COMPANY_SUBSIDIARY,
                Company::TYPE_COMPANY_HOLDING
            ]),
            'founded' => 'nullable|date',
            'min_employees' => 'nullable|integer|min:1',
            'max_employees' => 'nullable|integer|min:1|gte:min_employees',
            'comment' => 'nullable|string'
        ];
    }

    public function rulesUpdate(Company $company): array
    {
        return [
            'name' => 'required|string|max:150|unique:companies,name,' . $company->id,
            'website' => 'nullable|string|url|unique:companies,website,' . $company->id,
            'linkedin' =>
                'nullable|string|regex:' . AbstractRequest::REGEX_LINK_LINKEDIN . '|unique:companies,linkedin,' . $company->id,
            'sto_full_name' => 'nullable|string|max:150',
            'type' => 'nullable|string|max:50|in:' . implode(',', [
                Company::TYPE_COMPANY_SUBSIDIARY,
                Company::TYPE_COMPANY_HOLDING
            ]),
            'founded' => 'nullable|date',
            'min_employees' => 'nullable|integer|min:1',
            'max_employees' => 'nullable|integer|min:1|gte:min_employees',
            'comment' => 'nullable|string'
        ];
    }

    public function messages(): array
    {
        return [
            'name.unique' => Lang::get('validationModel.company.company_name_already_exist'),
            'name.required' => Lang::get('validationModel.company.company_name_required'),
            'name.string' => Lang::get('validationModel.company.company_name_string'),
            'website.unique' => Lang::get('validationModel.company.company_website_already_exist'),
            'website.url' => Lang::get('validationModel.company.company_website_url'),
            'linkedin.unique' => Lang::get('validationModel.company.company_linkedIn_already_exist'),
            'linkedin.regex' => Lang::get('validationModel.company.company_linkedIn_regex'),
            'type.in' => Lang::get('validationModel.company.company_type_error'),
            'founded.date' => Lang::get('validationModel.company.founded_date')
        ];
    }
}
