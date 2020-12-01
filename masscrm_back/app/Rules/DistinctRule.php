<?php

declare(strict_types=1);

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Lang;

class DistinctRule implements Rule
{
    public function passes($attribute, $values): bool
    {
        foreach ($values as $key => $item) {
            $values[$key] = strtolower(trim($item));
        }

        if (collect($values)->duplicates()->count()) {
            return false;
        }

        return true;
    }

    public function message(): string
    {
        return Lang::get('validation.distinct');
    }
}
