<?php

namespace App\Rules\Location;

use App\Repositories\Location\LocationRepository;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Lang;

class UniqueCity implements Rule
{
    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        /** @var LocationRepository $locationRepository */
        $locationRepository = app()->make(LocationRepository::class);

        $index = explode('.', $attribute)[1];
        $regionId = request()->input("location.${index}.region");

        if ($locationRepository->hasCityByNameAndRegionId($value, $regionId)) {
            return false;
        }

        return true;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return Lang::get('validation.location.city_already_exist');
    }
}
