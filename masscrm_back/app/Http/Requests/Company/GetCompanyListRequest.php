<?php

namespace App\Http\Requests\Company;

use App\Http\Requests\AbstractRequest;
use App\Models\Company\Company;
use Illuminate\Validation\Rule;

class GetCompanyListRequest extends AbstractRequest
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
            'search.*' => 'in:' . implode(',', Company::getFieldsToSearch()),
            'search.name' => 'array|min:1',
            'search.name.*' => 'string|max:150',
            'search.created_at' => 'array|size:2',
            'search.created_at.min' => 'required_with:search.created_at|date',
            'search.created_at.max' => 'required_with:search.created_at|date|after_or_equal:search.created_at.min',
            'search.updated_at' => 'array|size:2',
            'search.updated_at.min' => 'required_with:search.updated_at|date',
            'search.updated_at.max' => 'required_with:search.updated_at|date|after_or_equal:search.updated_at.min',
            'search.website' => 'string',
            'search.linkedin' => 'string',
            'search.sto_full_name' => 'string|max:150',
            'search.founded' => 'array|size:2',
            'search.founded.min' => 'required_with:search.founded|date',
            'search.founded.max' => 'required_with:search.founded|date|after_or_equal:search.founded.min',
            'search.industry' => 'array|min:1',
            'search.industry.*' => 'string|max:150',
            'search.type' => 'array|min:1',
            'search.type.*' => 'string|max:50',
            'search.company_size' => 'array|size:2',
            'search.company_size.max' => 'integer',
            'search.company_size.min' => 'integer|lte:search.company_size.max',
            'search.jobs' => 'array|min:1',
            'search.jobs.*' => 'string',
            'search.skills' => 'array|min:1',
            'search.link' => 'string',
            'search.skills.*' => 'string',
            'sort' => 'array|size:2',
            'sort.field_name' => 'required_with:sort|string|in:' . implode(',', Company::getFieldsToSort()),
            'sort.type_sort' => 'required_with:sort|string', Rule::in(['ASC', 'DESC']),
            'mode' => 'string|in:all'
        ];
    }
}
