<?php

namespace App\Http\Requests\Blacklist;

use App\Http\Requests\AbstractRequest;
use App\Rules\Blacklist\IgnoreDomain;
use App\Rules\Blacklist\RegexDomain;
use Illuminate\Support\Facades\Lang;
use App\Rules\Blacklist\UniqueDomain;
use App\Rules\Blacklist\DistinctDomain;

class CreateBlacklistRequest extends AbstractRequest
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
            'domains' => ['required', 'array', 'min:1',  new DistinctDomain],
            'domains.*' => [
                'string',
                'distinct',
                'unique:blacklists,domain',
                new UniqueDomain,
                new IgnoreDomain,
                new RegexDomain
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'domains.*.unique' => Lang::get('validation.blacklist.domain_already_exist'),
            'domains.*.distinct' => Lang::get('validation.blacklist.domain_distinct')
        ];
    }
}
