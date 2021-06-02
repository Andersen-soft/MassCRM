<?php declare(strict_types=1);

namespace App\Http\Requests\User;

use App\Http\Requests\AbstractRequest;

class GetUserNotificationListRequest extends AbstractRequest
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
            'limit' => 'integer|min:1|max:200',
            'new' => 'boolean'
        ];
    }
}
