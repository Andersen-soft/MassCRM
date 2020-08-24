<?php

namespace App\Http\Requests\Company;

use App\Http\Requests\AbstractRequest;

class CreateCompanyRequest extends AbstractRequest
{
    private string $regexLinkedIn= '/^https?:\/\/((www)\.)?linkedin.com/';

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
        return [
            'name' => 'required|string|max:150|unique:companies,name',
            'website' => 'string|url|unique:companies,website',
            'linkedin' => 'nullable|string|unique:companies,linkedin|regex:' . $this->regexLinkedIn,
            'sto_full_name' => 'nullable|string|max:150',
            'type' => 'string|max:50',
            'founded' => 'nullable|date',
            'min_employees' => 'integer|min:1|lte:max_employees',
            'max_employees' => 'integer|min:1',
            'industries' => 'array|min:1',
            'industries.*' => 'integer|exists:industries,id',
            'vacancies' => 'array|min:1',
            'vacancies.*' => 'array',
            'vacancies.*.job' => 'required|string',
            'vacancies.*.skills' => 'required|string',
            'vacancies.*.link' => 'required|string|url',
            'subsidiaries' => 'array|min:1',
            'subsidiaries.*' => 'integer|exists:companies,id',
            'comment' => 'nullable|string',
        ];
    }
}
