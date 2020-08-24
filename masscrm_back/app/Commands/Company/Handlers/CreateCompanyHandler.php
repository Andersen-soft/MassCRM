<?php

namespace App\Commands\Company\Handlers;

use App\Commands\Company\CreateCompanyCommand;
use App\Models\Company\Company;
use App\Models\User\User;
use App\Models\Company\CompanySubsidiary;
use App\Models\Company\CompanyVacancy;

class CreateCompanyHandler
{
    public function handle(CreateCompanyCommand $command): Company
    {
        $company = $this->createCompany($command->getCompanyFields());
        $company->user()->associate($command->getUser());
        $company->save();
        $this->addIndustries($company, $command->getIndustries());

        if ($command->getUser()->hasRoles([User::USER_ROLE_MANAGER, User::USER_ROLE_NC1])) {
            $this->addVacancies($company, $command->getVacancies());
        }

        $this->addSubsidiaries($company, $command->getSubsidiaries());

        return $company;
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
                ->setSkills($vacancy['skills'])
                ->setLink($vacancy['link']);
        }
        $company->vacancies()->saveMany($vacanciesToSave);

        return $company;
    }

    private function addSubsidiaries(Company $company, array $subsidiaries): Company
    {
        $subsidiariesToSave = [];
        foreach ($subsidiaries as $subsidiary) {
            $subsidiariesToSave[] = (new CompanySubsidiary())
                ->setParentId($company->getId())
                ->setChildId($subsidiary);
        }
        $company->companySubsidiary()->saveMany($subsidiariesToSave);

        return $company;
    }
}
