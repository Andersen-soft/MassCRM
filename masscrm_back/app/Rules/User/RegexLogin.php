<?php

namespace App\Rules\User;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Lang;

class RegexLogin implements Rule
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
        $loginRegex = '/^[^\W\d_]+(?:[-\.][^\W_]+)*$/';
        return (bool) preg_match($loginRegex, $value);
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
