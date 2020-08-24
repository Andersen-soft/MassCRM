<?php

namespace App\Http\Requests\User;

use App\Models\User\Fields\UserFields;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class GetUserListRequest extends FormRequest
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
        $fields = implode(',', array_keys(UserFields::FIELDS));

        return [
            'page' => 'integer|min:1',
            'limit' => 'integer|min:1|max:50',
            'search' => 'array',
            'search.*' => 'in:' . $fields,
            'search.fullName' => 'string',
            'search.email' => 'string',
            'search.login' => 'string',
            'search.skype' => 'string',
            'search.position' => 'string',
            'search.roles' => 'array|min:1',
            'search.active' => 'boolean',
            'sort' => 'array|size:2',
            'sort.fieldName' => 'required_with:sort|string|in:' . $fields,
            'sort.typeSort' => 'required_with:sort|string', Rule::in(['ASC', 'DESC']),
        ];
    }
}
