<?php

namespace App\Rules\Location;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Lang;

class RegexCity implements Rule
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
        $cityRegex = '/^\p{Latin}+(?:[\s-][\p{Latin}\'’]+)*$/u';
        return (bool) preg_match($cityRegex, $value);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return Lang::get('validation.regex');
    }
}
