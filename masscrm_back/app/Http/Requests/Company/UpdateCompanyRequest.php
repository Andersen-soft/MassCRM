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

class UpdateCompanyRequest extends AbstractRequest
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
            'name' => ['string', 'max:150', new UniqueCompanyNameRule((int) $this->company)],
            'website' => [
                'nullable',
                'string',
                'url',
                new UniqueCompanyWebsite(self::REGEX_GET_URL, (bool) $this->skip_validation, (int) $this->company)
            ],
            'linkedin' => [
                'nullable',
                'string',
                'regex:' . static::REGEX_LINK_LINKEDIN,
                new UniqueCompanyLinkedIn(self::REGEX_GET_URL, (bool) $this->skip_validation, (int) $this->company)
            ],
            'sto_full_name' => 'nullable|string|max:150',
            'type' => 'required_with:subsidiaries|nullable|string|max:50|in:'. $type,
            'founded' => 'nullable|date',
            'min_employees' => 'nullable|integer|min:1',
            'max_employees' => 'nullable|integer|min:1|gte:min_employees',
            'comment' => 'nullable|string',
            'industries' => 'array|min:1',
            'industries.*' => 'integer|exists:industries,id',
            'vacancies' => 'nullable|array',
            'vacancies.*.id' => 'integer|exists:company_vacancies,id',
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
        ];
    }
}
