<?php

namespace App\Rules\Contact;

use App\Repositories\Location\LocationRepository;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Lang;

class ValidContactLocationArray implements Rule
{
    private LocationRepository $locationRepository;
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->locationRepository = app()->make(LocationRepository::class);
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        if (!isset($value['country']) ||
            !$this->locationRepository->getCountryByName($value['country']) ||
            (!isset($value['region']) && isset($value['city']))
        ) {
            return false;
        }

        if (!isset($value['region']) && !isset($value['city'])) {
            return true;
        }

        if (!$this->locationRepository->hasRegionByNameInCountryByName($value['country'], $value['region'])) {
            return false;
        };

        if (!isset($value['city'])) {
            return true;
        }

        if (!$this->locationRepository->getCityByNameAndRegionName($value['city'], $value['region'])) {
            return false;
        };

        return true;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return Lang::get('validation.location.invalid_contact_location_array');
    }
}
