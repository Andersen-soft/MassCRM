<?php declare(strict_types=1);

namespace App\Services\Parsers\Import\Company;

use App\Exceptions\Import\ImportFileException;
use App\Models\Company\Company;
use App\Repositories\Company\CompanyRepository;
use Illuminate\Support\Facades\Lang;

class ImportSubsidiary
{
    private CompanyRepository $companyRepository;

    public function __construct(CompanyRepository $companyRepository)
    {
        $this->companyRepository = $companyRepository;
    }

    public function replace(Company $company, array $row): void
    {
        $company->companySubsidiary()->sync([]);
        $this->merge($company, $row);
    }

    public function create(Company $company, array $row): void
    {
        $this->merge($company, $row);
    }

    public function merge(Company $company, array $row): void
    {
        if (!$company->type) {
            $company->companySubsidiary()->sync([]);
        }

        if (empty($row['companySubsidiaries']['subsidiaries']) && empty($row['companyHolding']['holding'])) {
            return;
        }

        if ($company->type === Company::TYPE_COMPANY_HOLDING) {
            $this->saveSubsidiaryCompanies(
                $company,
                $row['companySubsidiaries']['subsidiaries'],
                Company::TYPE_COMPANY_SUBSIDIARY
            );
        } elseif ($company->type === Company::TYPE_COMPANY_SUBSIDIARY) {
            $this->saveSubsidiaryCompanies(
                $company,
                $row['companyHolding']['holding'],
                Company::TYPE_COMPANY_HOLDING
            );
        }
    }

    private function saveSubsidiaryCompanies(
        Company $company,
        array $nameCompanies,
        string $type
    ): void {
        $subsidiaries = $company->companySubsidiary()->pluck('child_id')->toArray();
        $newSubsidiaries = [];
        $type = strtolower($type);
        foreach ($nameCompanies as $item) {
            $newSubsidiary = $this->companyRepository->getCompanyFromTypeAndName($item, $type);

            if (!$newSubsidiary) {
                throw new ImportFileException([
                    Lang::get('validationModel.' . $type . '.name_not_exist', ['value' => $item])
                ]);
            }

            $newSubsidiaries[] = $newSubsidiary->id;
        }

        if (!empty($newSubsidiaries)) {
            $company->companySubsidiary()->sync(array_unique(array_merge($subsidiaries, $newSubsidiaries)));
        }
    }
}
