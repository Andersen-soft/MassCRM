<?php

namespace App\Http\Requests\Location;

use App\Http\Requests\AbstractRequest;
use App\Rules\Location\RegexCity;
use App\Rules\Location\RegionInCountry;
use App\Rules\Location\UniqueCity;

class CityRequest extends AbstractRequest
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
            'location' => 'required|array',
            'location.*.country' => 'required|integer|exists:countries,id',
            'location.*.region' => ['required', 'integer', 'exists:regions,id', new RegionInCountry],
            'location.*.city' => ['required', 'string', new UniqueCity, new RegexCity],
        ];
    }
}
