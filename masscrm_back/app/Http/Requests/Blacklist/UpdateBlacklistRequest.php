<?php

namespace App\Http\Requests\Blacklist;

use App\Http\Requests\AbstractRequest;
use App\Rules\Blacklist\IgnoreDomain;
use App\Rules\Blacklist\RegexDomain;
use App\Rules\Blacklist\UniqueIgnoreDomain;
use Illuminate\Support\Facades\Lang;

class UpdateBlacklistRequest extends AbstractRequest
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
            'domain' => [
                'required',
                'string',
                new UniqueIgnoreDomain((int) $this->blacklist),
                new IgnoreDomain,
                new RegexDomain
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'domains.unique' => Lang::get('validation.domain_already_exist')
        ];
    }
}
