<?php

declare(strict_types=1);

namespace App\Rules\Company;

use App\Models\Company\Company;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Lang;

class UniqueCompanyWebsite implements Rule
{
    private string $companyName;
    private string $regex;
    private ?bool $skipValidate;

    public function __construct(string $regex, bool $skipValidate = null)
    {
        $this->regex = $regex;
        $this->skipValidate = $skipValidate;
    }

    public function passes($attribute, $value): bool
    {
        if ($this->skipValidate || empty($value)) {
            return true;
        }

        preg_match($this->regex, $value, $matches);
        $value = str_replace($matches[0], '', $value);
        $company = Company::query()->where('website', 'ILIKE', '%' . $value)->first();

        if ($company) {
            $this->companyName = $company->name;

            return false;
        }

        return true;
    }

    public function message(): string
    {
        return Lang::get('validation.company.website_unique', ['companyName' => $this->companyName]);
    }
}
