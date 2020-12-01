<?php declare(strict_types=1);

namespace App\Http\Requests\AttachmentFile\Company;

use App\Http\Requests\AbstractRequest;

class AttachFileCompanyRequest extends AbstractRequest
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
            'id' => 'required|integer|min:1|exists:companies,id',
            'file' => 'required|file|max:102400',
        ];
    }
}
