<?php declare(strict_types=1);

namespace App\RulesValidateModels\Company;

use App\Models\BaseModel;
use App\Models\Company\Company;
use App\Rules\Company\UniqueCompanyWebsite;
use App\Rules\Company\ValidCompanyWebsite;
use App\RulesValidateModels\RulesValidateInterface;
use Illuminate\Support\Facades\Lang;
use App\Http\Requests\AbstractRequest;

class RulesCompany implements RulesValidateInterface
{
    public function rules(): array
    {
        return [];
    }

    public function rulesCreate(): array
    {
        return [
            'name' => ['required', 'string', 'max:150'],
            'website' => [
                'required', 'string', 'url',
                new ValidCompanyWebsite(),
                new UniqueCompanyWebsite()
            ],
            'linkedin' => 'nullable|string|regex:' . AbstractRequest::REGEX_LINK_LINKEDIN,
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

    public function rulesUpdate(BaseModel $company): array
    {
        return [
            'name' => 'required|string|max:150',
            'website' => [
                'required', 'string', 'url',
                new ValidCompanyWebsite(),
                new UniqueCompanyWebsite(null, $company->id)
            ],
            'linkedin' =>
                'nullable|string|regex:' . AbstractRequest::REGEX_LINK_LINKEDIN,
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
            'name.required' => Lang::get('validationModel.company.company_name_required'),
            'name.string' => Lang::get('validationModel.company.company_name_string'),
            'website.url' => Lang::get('validationModel.company.company_website_url'),
            'linkedin.regex' => Lang::get('validationModel.company.company_linkedIn_regex'),
            'type.in' => Lang::get('validationModel.company.company_type_error'),
            'founded.date' => Lang::get('validationModel.company.founded_date'),
            'website.required' => Lang::get('validationModel.company.company_website_required')
        ];
    }
}
