<?php

declare(strict_types=1);

namespace App\Http\Requests\Company;

use App\Http\Requests\AbstractRequest;
use App\Rules\Company\CheckCountSubsidiariesCompany;
use App\Rules\Company\CheckTypeSubsidiariesCompany;
use App\Rules\Company\UniqueCompanyLinkedIn;
use App\Rules\Company\UniqueCompanyNameRule;
use App\Rules\Company\UniqueCompanyWebsite;
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
            'name' => ['required', 'string', 'max:150', new UniqueCompanyNameRule()],
            'website' => [
                'required',
                'string',
                'url',
                new UniqueCompanyWebsite((bool) $this->skip_validation)
            ],
            'linkedin' => [
                'nullable',
                'string',
                'regex:' . static::REGEX_LINK_LINKEDIN,
                new UniqueCompanyLinkedIn(self::REGEX_GET_URL, (bool) $this->skip_validation)
            ],
            'sto_full_name' => 'nullable|string|max:150',
            'type' => 'required_with:subsidiaries|nullable|string|max:50|in:'. $type,
            'founded' => 'nullable|date',
            'min_employees' => 'integer|min:1',
            'max_employees' => 'nullable|integer|min:1|gte:min_employees',
            'industries' => 'array|size:1',
            'industries.*' => 'integer|exists:industries,id',
            'vacancies' => 'array|min:1',
            'vacancies.*' => 'array',
            'vacancies.*.job' => 'required_with:vacancies|string',
            'vacancies.*.skills' => 'nullable|string',
            'vacancies.*.link' => 'nullable|string|url',
            'subsidiaries' => ['array', new CheckCountSubsidiariesCompany($this->type)],
            'subsidiaries.*' => [
                'integer',
                'distinct',
                'exists:companies,id',
                new CheckTypeSubsidiariesCompany($this->type)
            ],
            'skip_validation' => 'nullable|boolean',
            'comment' => 'nullable|string',
        ];
    }
}
