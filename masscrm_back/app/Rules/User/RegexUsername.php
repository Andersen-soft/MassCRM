<?php

namespace App\Rules\User;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Lang;

class RegexUsername implements Rule
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
        $usernameRegex = '/^[^\W\d_]+(?:[-\s][^\W\d_]+)*$/u';
        return (bool) preg_match($usernameRegex, $value);
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
