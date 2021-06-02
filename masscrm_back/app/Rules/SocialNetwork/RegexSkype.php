<?php

namespace App\Rules\SocialNetwork;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Lang;

class RegexSkype implements Rule
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
        $skypeRegex = '/^[A-z][A-z\d\.,:\-_]{5,31}$/';
        return (bool) preg_match($skypeRegex, $value);
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
