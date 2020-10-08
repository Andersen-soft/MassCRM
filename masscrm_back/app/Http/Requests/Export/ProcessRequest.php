<?php

namespace App\Http\Requests\Export;

use App\Http\Requests\AbstractRequest;

class ProcessRequest extends AbstractRequest
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
            'search.*' => 'in:name,user,status,date',
            'search.name' => 'string|max:255',
            'search.status' => 'string|max:255',
            'search.user' => 'string|max:255',
            'search.date' => 'array|size:2',
            'search.date.min' => 'required_with:search.date|date',
            'search.date.max' => 'required_with:search.date|date|after_or_equal:search.date.min',
        ];
    }
}
