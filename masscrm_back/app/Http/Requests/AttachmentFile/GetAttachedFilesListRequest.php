<?php

namespace App\Http\Requests\AttachmentFile;

use App\Http\Requests\AbstractRequest;

class GetAttachedFilesListRequest extends AbstractRequest
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
            'id' => 'required|integer|min:1',
            'page' => 'integer|min:1',
            'limit' => 'integer|min:1|max:50',
        ];
    }
}
