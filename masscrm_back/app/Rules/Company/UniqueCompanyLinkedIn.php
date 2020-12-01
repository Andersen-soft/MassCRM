<?php

declare(strict_types=1);

namespace App\Rules\Company;

use App\Models\Company\Company;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Lang;

class UniqueCompanyLinkedIn implements Rule
{
    private string $companyName;
    private string $regex;
    private ?bool $skipValidation;

    public function __construct(string $regex, bool $skipValidation = null)
    {
        $this->regex = $regex;
        $this->skipValidation = $skipValidation;
    }

    public function passes($attribute, $value): bool
    {
        if ($this->skipValidation || empty($value)) {
            return true;
        }

        preg_match($this->regex, $value, $matches);
        $value = str_replace($matches[0], '', $value);

        $company = Company::query()->where('linkedin', 'ILIKE', '%' . $value)->first();

        if ($company) {
            $this->companyName = $company->name;

            return false;
        }

        return true;
    }

    public function message(): string
    {
        return Lang::get('validation.company.linkedIn_unique', ['companyName' => $this->companyName]);
    }
}
