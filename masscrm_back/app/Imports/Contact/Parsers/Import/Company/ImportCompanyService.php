<?php declare(strict_types=1);

namespace App\Imports\Contact\Parsers\Import\Company;

use App\Exceptions\Import\ImportFileException;
use App\Models\Company\Company;
use App\Models\User\User;
use App\Repositories\Company\CompanyRepository;
use Illuminate\Support\Facades\Lang;

class ImportCompanyService
{
    private ImportIndustry $importIndustry;
    private ImportVacancy $importVacancy;
    private ImportSubsidiary $importSubsidiary;
    private ImportCompany $importCompany;
    private CompanyRepository $companyRepository;

    public function __construct(
        ImportIndustry $importIndustry,
        ImportVacancy $importVacancy,
        ImportSubsidiary $importSubsidiary,
        ImportCompany $importCompany,
        CompanyRepository $companyRepository
    )
    {
        $this->importIndustry = $importIndustry;
        $this->importVacancy = $importVacancy;
        $this->importSubsidiary = $importSubsidiary;
        $this->importCompany = $importCompany;
        $this->companyRepository = $companyRepository;
    }

    public function replace(Company $company, array $row, User $user): Company
    {
        $company = $this->importCompany->replace($company, $row, $user);
        $this->importVacancy->replace($company, $row);
        $this->importSubsidiary->replace($company, $row);
        $this->importIndustry->replace($company, $row);

        return $company;
    }

    public function create(array $row, User $user): ?Company
    {
        $company = $this->importCompany->create($row, $user);
        if ($company) {
            $this->importVacancy->create($company, $row);
            $this->importSubsidiary->create($company, $row);
            $this->importIndustry->create($company, $row);
        }

        return $company;
    }

    public function merge(Company $company, array $row, User $user): Company
    {
        $company = $this->importCompany->merge($company, $row, $user);
        $this->importVacancy->merge($company, $row);
        $this->importSubsidiary->merge($company, $row);
        $this->importIndustry->merge($company, $row);

        return $company;
    }

    public function getUnique(array $fields, array $row): ?Company
    {
        if (!$key = array_search('company', $fields, true)) {
            return null;
        }

        $name = trim((string)$row[$key]);

        if (empty($name)) {
            throw new ImportFileException([
                Lang::get('validationModel.company.company_name_required')
            ]);
        }

        return $this->companyRepository->checkUniqueCompany($name);
    }
}
