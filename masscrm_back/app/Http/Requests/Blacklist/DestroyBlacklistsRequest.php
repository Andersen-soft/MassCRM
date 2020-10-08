<?php

namespace App\Http\Requests\Blacklist;

use App\Http\Requests\AbstractRequest;

class DestroyBlacklistsRequest extends AbstractRequest
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
            'ids' => 'required|array|min:1',
            'ids.*' => 'integer|min:1|exists:blacklists,id'
        ];
    }
}
