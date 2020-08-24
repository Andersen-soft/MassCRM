<?php

namespace App\Http\Requests\Filter;

use App\Commands\Filter\Handlers\GetFiltersHandler;
use App\Http\Requests\AbstractRequest;

class GetFiltersRequest extends AbstractRequest
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
            'filters' => 'array',
            'filters.*' => 'string|in:' . implode(',', GetFiltersHandler::FILTERS),
            'language' => 'string|in:en,ru'
        ];
    }
}
