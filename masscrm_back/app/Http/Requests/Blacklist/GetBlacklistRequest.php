<?php

namespace App\Http\Requests\Blacklist;

use App\Http\Requests\AbstractRequest;
use Illuminate\Validation\Rule;

class GetBlacklistRequest extends AbstractRequest
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
            'page' => 'integer|min:1',
            'limit' => 'integer|min:1|max:50',
            'search' => 'array',
            'search.*' => 'in:domain,user,date',
            'search.domain' => 'string|max:255',
            'search.user' => 'string|max:255',
            'search.date' => 'array|size:2',
            'search.date.min' => 'required_with:search.date|date',
            'search.date.max' => 'required_with:search.date|date|after_or_equal:search.date.min',
            'sort' => 'array|size:2',
            'sort.field_name' => 'required_with:sort|string|in:domain,user,date',
            'sort.type_sort' => 'required_with:sort|string', Rule::in(['ASC', 'DESC'])
        ];
    }
}
