<?php

namespace App\Commands\Company\Handlers;

use App\Commands\Company\UpdateCompanyCommand;
use App\Exceptions\Custom\NotFoundException;
use App\Models\Company\Company;
use App\Models\Company\CompanyVacancy;
use App\Models\User\User;
use App\Repositories\Company\CompanyRepository;
use App\Services\TransferCollection\TransferCollectionCompanyService;
use Carbon\Carbon;

class UpdateCompanyHandler
{
    private CompanyRepository $companyRepository;
    private TransferCollectionCompanyService $transferCollectionCompanyService;

    public function __construct(
        CompanyRepository $companyRepository,
        TransferCollectionCompanyService $transferCollectionCompanyService
    )
    {
        $this->companyRepository = $companyRepository;
        $this->transferCollectionCompanyService = $transferCollectionCompanyService;
    }

    public function handle(UpdateCompanyCommand $command)
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
            $query = !empty($vacancy['id'])
                ? $query->where('id', $vacancy['id'])
                : $query->where('vacancy', $vacancy['job']);

            $newVacancy = $query->first();
            if ($newVacancy instanceof CompanyVacancy) {
                unset($companyVacancy[$newVacancy->id]);
            } else {
                $newVacancy = new CompanyVacancy();
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
}
