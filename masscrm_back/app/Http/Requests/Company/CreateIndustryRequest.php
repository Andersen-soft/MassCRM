<?php

declare(strict_types=1);

namespace App\Http\Requests\Company;

use App\Http\Requests\AbstractRequest;
use App\Rules\UniqueRule;
use Illuminate\Support\Facades\Lang;

class CreateIndustryRequest extends AbstractRequest
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
        return [
            'name' => [
                'required',
                'string',
                'regex:' . AbstractRequest::REGEX_INDUSTRY_NAME,
                new UniqueRule('industries', 'name', 'validation.industry.industry_unique')
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'name.regex' => Lang::get('validation.industry.industry_invalid_regex'),
        ];
    }
}
