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
    private ?int $companyId;

    public function __construct(string $regex, bool $skipValidation = null, int $companyId = null)
    {
        $this->regex = $regex;
        $this->skipValidation = $skipValidation;
        $this->companyId = $companyId;
    }

    public function passes($attribute, $value): bool
    {
        if ($this->skipValidation || empty($value)) {
            return true;
        }

        preg_match($this->regex, $value, $matches);
        $value = str_replace($matches[0], '', $value);
        $company = Company::query()->where('linkedin', 'ILIKE', '%' . $value);

        if ($this->companyId) {
            $company->where('id', '!=', $this->companyId);
        }

        if ($company = $company->first()) {
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
