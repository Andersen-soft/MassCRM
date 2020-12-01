<?php

declare(strict_types=1);

namespace App\Rules\Company;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Lang;
use App\Models\Company\Company;

class UniqueCompanyNameRule implements Rule
{
    private ?int $companyId;

    public function __construct(int $companyId = null)
    {
        $this->companyId = $companyId;
    }

    public function passes($attribute, $value): bool
    {
        $query = Company::query()->where('name', 'ILIKE', $value);

        if ($this->companyId) {
            $query->where('id', '!=', $this->companyId);
        }

        if ($query->exists()) {
            return false;
        }

        return true;
    }

    public function message(): string
    {
        return Lang::get('validation.company.name_unique');
    }
}
