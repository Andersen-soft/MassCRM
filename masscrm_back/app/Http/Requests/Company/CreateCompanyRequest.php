<?php

namespace App\Http\Requests\Company;

use App\Http\Requests\AbstractRequest;
use App\Rules\Company\CheckCountSubsidiariesCompany;
use App\Rules\Company\CheckTypeSubsidiariesCompany;
use Illuminate\Support\Facades\Lang;

class CreateCompanyRequest extends AbstractRequest
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
        $type = implode(',', Lang::get('filters.company_type'));

        return [
            'name' => 'required|string|max:150|unique:companies,name',
            'website' => 'string|url|unique:companies,website',
            'linkedin' => 'nullable|string|unique:companies,linkedin|regex:' . static::REGEX_LINK_LINKEDIN,
            'sto_full_name' => 'nullable|string|max:150',
            'type' => 'required_with:subsidiaries|nullable|string|max:50|in:'. $type,
            'founded' => 'nullable|date',
            'min_employees' => 'integer|min:1',
            'max_employees' => 'nullable|integer|min:1|gte:min_employees',
            'industries' => 'array|min:1',
            'industries.*' => 'integer|exists:industries,id',
            'vacancies' => 'array|min:1',
            'vacancies.*' => 'array',
            'vacancies.*.job' => 'required_with:vacancies|string',
            'vacancies.*.skills' => 'string',
            'vacancies.*.link' => 'string|url',
            'subsidiaries' => ['array', new CheckCountSubsidiariesCompany($this->type)],
            'subsidiaries.*' => [
                'integer',
                'distinct',
                'exists:companies,id',
                new CheckTypeSubsidiariesCompany($this->type)
            ],
            'comment' => 'nullable|string',
        ];
    }
}
