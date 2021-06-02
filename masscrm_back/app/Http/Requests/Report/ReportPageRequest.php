<?php declare(strict_types=1);

namespace App\Http\Requests\Report;

use App\Http\Requests\AbstractRequest;
use App\Models\User\User;

class ReportPageRequest extends AbstractRequest
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
        $roles = [User::USER_ROLE_NC2, User::USER_ROLE_NC1];

        return [
            'page' => 'integer|min:1',
            'limit' => 'integer|min:1|max:200',
            'search.employee' => 'string|max:255',
            'search.role' => 'array|min:1|in:' . implode(',', $roles) ,
            'search.date' => 'array|min:1',
            'search.date.from' => 'required_with:search.date.to|date',
            'search.date.to' => 'required_with:search.date.from|date|after_or_equal:search.date.from',
        ];
    }
}
