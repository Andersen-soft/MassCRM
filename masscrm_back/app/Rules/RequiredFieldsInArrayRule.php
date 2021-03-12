<?php

declare(strict_types=1);

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Lang;

class RequiredFieldsInArrayRule implements Rule
{
    private array $requiredFields;

    public function __construct(array $requiredFields)
    {
        $this->requiredFields = $requiredFields;
    }

    public function passes($attribute, $values): bool
    {
        foreach ($this->requiredFields as $field) {
            if (!in_array($field, $values)) {
                return false;
            }
        }

        return true;
    }

    public function message(): string
    {
        return Lang::get('validation.required_fields', ['fields' => implode(',', $this->requiredFields)]);
    }
}
