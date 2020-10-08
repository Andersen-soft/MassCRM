<?php

namespace App\Http\Requests;

use App\Exceptions\Validation\ValidationRequestException;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;

abstract class AbstractRequest extends FormRequest
{
    public const REGEX_PHONE = '/^[0-9+()-]+$/';
    public const REGEX_EMAIL = "/^[a-zA-Z0-9-!#$%&\'*+=?^_`{}~]+(\.[a-zA-Z0-9-!#$%&\'*+=?^_`{}~]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z]+)$/";
    public const REGEX_LINK_LINKEDIN = '/^https?:\/\/((www)\.)?linkedin.com/';
    protected const GENDER_REQUIRED_FOR_COUNTRIES = [
        'Germany',
        'Austria',
        'Luxembourg',
        'Switzerland',
        'Belgium',
        'France'
    ];

    protected function failedValidation(Validator $validator): void
    {
        $errors = (new ValidationException($validator))->errors();
        throw new ValidationRequestException($errors);
    }
}
