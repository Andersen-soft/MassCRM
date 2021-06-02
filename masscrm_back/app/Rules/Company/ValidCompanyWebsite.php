<?php

namespace App\Rules\Company;

use App\Helpers\Url;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Lang;

class ValidCompanyWebsite implements Rule
{
    private Url $urlHelper;
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->urlHelper = new Url();
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
        return $this->urlHelper->isValidUrl($value);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return Lang::get('validation.url');
    }
}
