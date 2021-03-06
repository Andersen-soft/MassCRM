<?php declare(strict_types=1);

namespace App\Imports\Contact\Parsers\Import\Company;

use App\Console\Commands\DeactivateCompanyVacancy;
use App\Exceptions\Import\ImportFileException;
use App\Models\Company\Company;
use App\Models\Company\CompanyVacancy;
use App\Models\Contact\Contact;
use App\Models\User\User;
use App\Repositories\ActivityLog\ActivityLogCompanyRepository;
use App\Repositories\Company\CompanyRepository;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
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

    public function createCompanyWithoutCollection(array $row, User $user): ?Company
    {
        $company = $this->importCompany->create($row, $user);

        return $company;
    }

    public function updateCompanyCollection(array $row, Company $company): ?Company
    {
        $this->importVacancy->create($company, $row);
        $this->importSubsidiary->create($company, $row);
        $this->importIndustry->create($company, $row);

        return $company;
    }

    public function replace(Company $company, array $row, User $user): Company
    {
        $company = $this->importCompany->replace($company, $row, $user);
        $this->importVacancy->replace($company, $row);
        $this->importSubsidiary->replace($company, $row);
        $this->importIndustry->replace($company, $row);

        return $company;
    }

    public function merge(Company $company, array $row, User $user): Company
    {
        if ($user->hasRole(User::USER_ROLE_NC2)) {
            $company = $this->importCompany->replace($company, $row, $user);
        } else {
            $company = $this->importCompany->merge($company, $row, $user);
        }

        $this->importVacancy->merge($company, $row, $user);
        $this->importSubsidiary->merge($company, $row);
        $this->importIndustry->merge($company, $row);

        return $company;
    }

    public function getUnique(array $fields, array $row): ?Company
    {
        $name = $this->getFieldValueFromFieldsAndRowArrays('company', $fields, $row);

        if (empty($name)) {
            throw new ImportFileException([
                Lang::get('validationModel.company.company_name_required')
            ]);
        }

        $website = $this->getFieldValueFromFieldsAndRowArrays('website', $fields, $row);

        if (empty($website)) {
            throw new ImportFileException([
                Lang::get('validationModel.company.company_website_required')
            ]);
        }

        return $this->companyRepository->checkUniqueCompany($name, $website);
    }

    public function validateNC2(Company $company, User $user, ?Contact $contact, array $userDate = []): bool
    {
        if (!empty($userDate)){
            if (empty($userDate['companyVacancies'])) {
                throw new ImportFileException([
                    Lang::get('validationModel.company.company_vacancies_doesnt_fill_in')
                ]);
            }
        }
        // if company hasn't any vacancies
        if ($company->vacancies()->doesntExist()) {
            return true;
        }

        // if vacancies are exist and they all have status archive(false)
        if (!$this->companyRepository->hasVacanciesByJobLocation($company, true, $contact)) {
            return true;
        }

        // if active vacancies are exist and were updated today by current NC2
        $updatedVacanciesByCurrentDate = ActivityLogCompanyRepository::hasVacanciesWereUpdatedToday(
            $company->getId(),
            $user->getId()
        );

        if (!$updatedVacanciesByCurrentDate) {
            throw new ImportFileException([
                Lang::get('validationModel.company.company_vacancies_timed_out',
                    ['days' => $this->getDiffVacancyOfCurrentDate($company->getId())]
                )
            ]);
        }

        return true;
    }

    public function getDiffVacancyOfCurrentDate(int $companyId): ?int
    {
        $lastVacancy = CompanyVacancy::query()
            ->where('company_id', $companyId)
            ->where(CompanyVacancy::FIELD_ACTIVE, CompanyVacancy::ACTIVE)
            ->orderByDesc(Model::UPDATED_AT)
            ->first(Model::UPDATED_AT);

        /** @var Carbon $vacancyDate */
        $vacancyDate = $lastVacancy->updated_at ?? false;

        return $vacancyDate
            ? $vacancyDate->addDays(DeactivateCompanyVacancy::DAYS_TO_DEACTIVATE_VACANCY)->diffInDays(now())
            : null;
    }

    private function getFieldValueFromFieldsAndRowArrays(string $fieldKey, array $fields, array $row): ?string
    {
        if (!$key = array_search($fieldKey, $fields, true)) {
            return null;
        }

        return trim((string) $row[$key]);
    }
}
