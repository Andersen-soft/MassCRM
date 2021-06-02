<?php declare(strict_types=1);

namespace App\Http\Requests\ActivityLog;

use App\Http\Requests\AbstractRequest;

class ShowActivityLogListRequest extends AbstractRequest
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
            'id' => 'required|min:1',
            'page' => 'integer|min:1',
            'limit' => 'integer|min:1|max:200',
            'search' => 'array',
            'search.query' => 'string|max:255',
            'search.from' => 'required_with:search.to|date',
            'search.to' => 'required_with:search.from|date',
        ];
    }
}
