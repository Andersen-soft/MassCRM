<?php

namespace App\Rules\Contact;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Lang;

class RegexContactName implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
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
