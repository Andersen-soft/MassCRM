<?php

namespace App\Http\Requests\AttachmentFile;

use App\Http\Requests\AbstractRequest;

class AttachFileRequest extends AbstractRequest
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
            'file' => 'required|file|max:102400',
        ];
    }
}
