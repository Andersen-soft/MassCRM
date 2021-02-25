<?php

declare(strict_types=1);

namespace App\Services\Company;

use App\Commands\Company\CreateCompanyCommand;
use App\Commands\Company\UpdateCompanyCommand;
use App\Exceptions\Custom\NotFoundException;
use App\Models\Company\Company;
use App\Models\Company\CompanyVacancy;
use App\Models\User\User;
use App\Repositories\Company\CompanyRepository;
use App\Repositories\Company\VacancyRepository;
use App\Services\TransferCollection\TransferCollectionCompanyService;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;

class CompanyService
{
    protected CompanyRepository $repository;

    private TransferCollectionCompanyService $transferCollectionCompanyService;

    private CompanyRepository $companyRepository;

    private VacancyRepository $vacancyRepository;

    public function __construct(
        CompanyRepository $repository,
        TransferCollectionCompanyService $transferCollectionCompanyService,
        CompanyRepository $companyRepository,
        VacancyRepository $vacancyRepository
    )
    {
        $this->repository = $repository;
        $this->transferCollectionCompanyService = $transferCollectionCompanyService;
        $this->companyRepository = $companyRepository;
        $this->vacancyRepository = $vacancyRepository;
    }

    public function fetchListCompanies(array $search, array $sort): Builder
    {
        return $this->repository->getCompanyList($search, $sort);
    }

    private function createCompany(array $fields): Company
    {
        $company = new Company();
        foreach ($fields as $key => $value) {
            $company->setValue($key, $value);
        }

        return $company;
    }

    private function addIndustries(Company $company, array $industries): Company
    {
        if (!empty($industries)) {
            $company->industries()->sync($industries);
        }

        return $company;
    }

    private function addVacancies(Company $company, array $vacancies): Company
    {
        $vacanciesToSave = [];
        foreach ($vacancies as $vacancy) {
            $vacanciesToSave[] = (new CompanyVacancy())
                ->setVacancy($vacancy['job'])
                ->setSkills($vacancy['skills'] ?? null)
                ->setLink($vacancy['link'] ?? null);
        }
        $company->vacancies()->saveMany($vacanciesToSave);

        return $company;
    }

    private function addSubsidiaries(Company $company, array $subsidiaries): Company
    {
        $company->companySubsidiary()->sync($subsidiaries);

        return $company;
    }

    public function saveCompany(CreateCompanyCommand $command): Company
    {
        $company = $this->createCompany($command->getCompanyFields());
        $company->user()->associate($command->getUser());
        $company->save();
        $this->addIndustries($company, $command->getIndustries());

        if ($command->getUser()->hasRoles([User::USER_ROLE_MANAGER, User::USER_ROLE_NC2])) {
            $this->addVacancies($company, $command->getVacancies());
        }

        $this->addSubsidiaries($company, $command->getSubsidiaries());
        $this->transferCollectionCompanyService->updateCollectionCompany($company);

        return $company;
    }

    public function deleteCompany(int $companyId): int
    {
        $company = Company::destroy($companyId);
        if ($company) {
            return $company;
        }

        throw new NotFoundException('Company with ID ' . $companyId . ' does not exist.');
    }


    public function deleteCompanies(array $companyIds): int
    {
        return Company::destroy($companyIds);
    }

    public function getCompany(int $id, bool $withContacts): Company
    {
        $company = Company::find($id);
        if ($withContacts) {
            $company->loadMissing('contacts');
        }

        if ($company instanceof Company) {
            return $company;
        }

        throw new NotFoundException('Company value(' . $id . ') not found');
    }

    public function updateCompany(UpdateCompanyCommand $command): Company
    {
        $company = Company::find($command->getCompanyId());
        if (!$company instanceof Company) {
            throw new NotFoundException('Company value(' . $command->getCompanyId() . ') not found');
        }

        $previousTypeCompany = $company->type;
        $company->setUpdatedAt(Carbon::now());
        $company->user()->associate($command->getUser());
        $company->update($command->getCompanyFields());
        $this->updateIndustries($company, $command->getIndustries());
        $this->updateSubsidiaries($company, $command->getSubsidiaries(), $previousTypeCompany);
        if ($command->getUser()->hasRoles([User::USER_ROLE_MANAGER, User::USER_ROLE_NC2])) {
            $this->updateVacancies($company, $command->getVacancies());
        }

        return $company;
    }

    private function updateIndustries(Company $company, array $industries): void
    {
        if (!empty($industries)) {
            $company->industries()->sync($industries);
            $company->industries_collection = $this->transferCollectionCompanyService->getIndustries($company);
            $company->save();
        }
    }

    private function updateSubsidiaries(Company $company, ?array $subsidiaries, ?string $previousTypeCompany): void
    {
        if ($previousTypeCompany !== $company->type) {
            $this->companyRepository->deleteCompanyFromSubsidiary($company->id);
        }

        if (isset($subsidiaries)) {
            $company->companySubsidiary()->sync($subsidiaries);
            $company->subsidiaries_collection = $this->transferCollectionCompanyService->getSubsidiaries($company);
            $company->save();
        }
    }

    private function updateVacancies(Company $company, ?array $vacancies): void
    {
        if (!isset($vacancies)) {
            return;
        }

        $companyVacancy = $company->vacancies()->pluck('vacancy', 'id')->toArray();
        foreach ($vacancies as $vacancy) {
            $query = CompanyVacancy::query();
            if (empty($vacancy['id'])) {
                $newVacancy = new CompanyVacancy();
            } else {
                $query = $query->where('id', $vacancy['id']);
                $newVacancy = $query->first();
                if ($newVacancy instanceof CompanyVacancy) {
                    unset($companyVacancy[$newVacancy->id]);
                } else {
                    $newVacancy = new CompanyVacancy();
                }
            }

            $newVacancy->vacancy = $vacancy['job'];
            $newVacancy->skills = $vacancy['skills'] ?? null;
            $newVacancy->link = $vacancy['link'] ?? null;
            $company->vacancies()->save($newVacancy);
        }

        if (!empty($companyVacancy)) {
            CompanyVacancy::destroy(array_keys($companyVacancy));
        }

        $company->vacancies_collection = $this->transferCollectionCompanyService->getVacancies($company);
        $company->save();
    }

    public function deactivateVacancies(int $daysToDeactivate): void
    {
        $vacancies = $this->vacancyRepository->deactivateVacanciesByDate($daysToDeactivate);

        if ($vacancies->isNotEmpty()) {
            $vacancies->pluck(Company::COMPANY_FIELD)->unique(Company::ID_FIELD)->each(function (Company $company) {
                $this->transferCollectionCompanyService->updateCollectionCompany($company->scopeWithoutTimestamps(), [TransferCollectionCompanyService::RELATION_VACANCIES]);
            });
        }
    }
}
