<?php

namespace App\Rules\Company;

use App\Models\Company\Company;
use App\Repositories\Company\CompanyRepository;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Lang;

class CheckTypeSubsidiariesCompany implements Rule
{
    private Company $company;
    private ?string $companyType;

    public function __construct(?string $typeCompany)
    {
        $this->companyType = $typeCompany;
    }

    public function passes($attribute, $value): bool
    {
        /** @var CompanyRepository $companyRepository */
        $companyRepository = app()->make(CompanyRepository::class);

        if ($this->companyType === Company::TYPE_COMPANY_SUBSIDIARY) {
            $company = $companyRepository->checkTypeCompany($value, Company::TYPE_COMPANY_HOLDING);
        } else {
            $company = $companyRepository->checkTypeCompany($value, Company::TYPE_COMPANY_SUBSIDIARY);
        }

        if ($company) {
            $this->company = $company;
            return false;
        }

        return true;
    }

    public function message(): string
    {
        return Lang::get('validation.subsidiaries.company_have_other_type', ['input' => $this->company->name]);
    }
}