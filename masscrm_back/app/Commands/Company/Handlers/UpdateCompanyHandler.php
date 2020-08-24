<?php

namespace App\Commands\Company\Handlers;

use App\Commands\Company\UpdateCompanyCommand;
use App\Exceptions\Custom\NotFoundException;
use App\Models\Company\Company;
use App\Models\Company\CompanyVacancy;
use App\Models\User\User;
use Carbon\Carbon;

class UpdateCompanyHandler
{
    public function handle(UpdateCompanyCommand $command)
    {
        $company = Company::find($command->getCompanyId());
        if (!$company instanceof Company) {
            throw new NotFoundException('Company value(' . $command->getCompanyId() . ') not found');
        }

        $company->setUpdatedAt(Carbon::now());
        $company->user()->associate($command->getUser());
        $company->update($command->getCompanyFields());
        $this->updateIndustries($company, $command->getIndustries());
        $this->updateSubsidiaries($company, $command->getSubsidiaries());
        if ($command->getUser()->hasRoles([User::USER_ROLE_MANAGER, User::USER_ROLE_NC1])) {
            $this->updateVacancies($company, $command->getVacancies());
        }

        return $company;
    }

    private function updateIndustries(Company $company, array $industries): Company
    {
        if (!empty($industries)) {
            $company->industries()->sync($industries);
        }

        return $company;
    }

    private function updateSubsidiaries(Company $company, array $subsidiaries): Company
    {
        if (!empty($subsidiaries)) {
            $company->companySubsidiary()->sync($subsidiaries);
        }

        return $company;
    }

    private function updateVacancies(Company $company, array $vacancies): Company
    {
        if (empty($vacancies)) {
            return $company;
        }

        $companyVacancy = $company->vacancies()->pluck('vacancy', 'id')->toArray();
        foreach ($vacancies as $vacancy) {
            $query = CompanyVacancy::query();
            $query = isset($vacancy['id'])
                ? $query->where('id', $vacancy['id'])
                : $query->where('vacancy', $vacancy['job']);

            $cV = $query->first();
            if ($cV instanceof CompanyVacancy) {
                unset($companyVacancy[$cV->getId()]);
            } else {
                $cV = new CompanyVacancy(['company_id' => $company->getId()]);
            }

            $cV->setVacancy($vacancy['job'])
                ->setSkills($vacancy['skills'])
                ->setLink($vacancy['link']);
            $cV->save();
        }
        if (!empty($companyVacancy)) {
            CompanyVacancy::destroy(array_keys($companyVacancy));
        }

        return $company;
    }
}
