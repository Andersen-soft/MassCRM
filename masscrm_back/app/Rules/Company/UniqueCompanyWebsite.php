<?php

declare(strict_types=1);

namespace App\Rules\Company;

use App\Helpers\Url;
use App\Models\Company\Company;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Lang;

class UniqueCompanyWebsite implements Rule
{
    private string $companyName;
    private ?bool $skipValidation;
    private ?int $companyId;

    public function __construct(bool $skipValidate = null, int $companyId = null)
    {
        $this->skipValidation = $skipValidate;
        $this->companyId = $companyId;
    }

    public function passes($attribute, $value): bool
    {
        if ($this->skipValidation || empty($value)) {
            return true;
        }

        $value = Url::getSecondAndFirstDomainsString($value);
        $company = Company::query()
            ->where('website', '~*', Url::getWebsiteMatchString($value));

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
        return Lang::get('validation.company.website_unique', ['companyName' => $this->companyName]);
    }
}
