<?php declare(strict_types=1);

namespace App\Rules\Company;

use App\Models\Company\Company;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Lang;

class CheckCountSubsidiariesCompany implements Rule
{
    private ?string $companyType;

    public function __construct(?string $typeCompany)
    {
        $this->companyType = $typeCompany;
    }

    public function passes($attribute, $values): bool
    {
        return !($this->companyType === Company::TYPE_COMPANY_SUBSIDIARY && count($values) > 1);
    }

    public function message(): string
    {
        return Lang::get('validation.subsidiaries.wrong_count_relation_companies');
    }
}
