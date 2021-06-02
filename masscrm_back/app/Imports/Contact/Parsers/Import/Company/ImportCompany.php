<?php

declare(strict_types=1);

namespace App\Imports\Contact\Parsers\Import\Company;

use App\Models\Company\Company;
use App\Models\User\User;
use App\Services\Validator\ValidatorService;
use App\Exceptions\Import\ImportFileException;
use App\RulesValidateModels\Company\RulesCompany;
use App\Helpers\Url;

class ImportCompany
{
    private ValidatorService $validatorService;
    private RulesCompany $rulesCompany;
    private Url $urlHelper;

    public function __construct(ValidatorService $validatorService, RulesCompany $rulesCompany, Url $urlHelper)
    {
        $this->validatorService = $validatorService;
        $this->rulesCompany = $rulesCompany;
        $this->urlHelper = $urlHelper;
    }

    public function merge(Company $company, array $row, User $user): Company
    {
        if (empty($row['company'])) {
            return $company;
        }

        $company = $this->setUserToCompany($company, $user);

        foreach ($row['company'] as $key => $item) {
            if ($key === 'companySize') {
                if (!$company->min_employees && !$company->max_employees) {
                    $companySize = $this->getSizes($item);
                    $company->min_employees = $companySize['min'];
                    $company->max_employees = $companySize['max'];
                }
                continue;
            }

            if ($company->{$key} === null && !empty($item)) {
                if ($key === Company::WEBSITE_FIELD || $key === Company::LINKEDIN_FIELD) {
                    $item = $this->urlHelper->getUrlWithSchema($item);
                }

                $company->{$key} = $item;
            }
        }

        if (!$this->validatorService->validateUpdate($company, $this->rulesCompany)) {
            throw new ImportFileException($this->validatorService->getErrors());
        }

        $company->save();

        return $company;
    }

    public function replace(Company $company, array $row, User $user): Company
    {
        if (empty($row['company'])) {
            return $company;
        }

        $company = $this->setNewDataCompany($company, $row, $user);

        if (!$this->validatorService->validateUpdate($company, $this->rulesCompany)) {
            throw new ImportFileException($this->validatorService->getErrors());
        }

        $company->save();

        return $company;
    }

    public function create(array $row, User $user): ?Company
    {
        if (empty($row['company'])) {
            return null;
        }

        $company = new Company();
        $company = $this->setNewDataCompany($company, $row, $user);

        if (!$this->validatorService->validateCreate($company, $this->rulesCompany)) {
            throw new ImportFileException($this->validatorService->getErrors());
        }

        $company->save();

        return $company;
    }

    private function setNewDataCompany(Company $company, array $row, User $user): Company
    {
        $company = $this->setUserToCompany($company, $user);

        foreach ($row['company'] as $key => $item) {
            if ($key === 'companySize') {
                $companySize = $this->getSizes($item);
                $company->min_employees = $companySize['min'];
                $company->max_employees = $companySize['max'];

                continue;
            }

            if ($key === Company::WEBSITE_FIELD || $key === Company::LINKEDIN_FIELD) {
                $item = $this->urlHelper->getUrlWithSchema($item);
            }

            $company->{$key} = $item;
        }

        return $company;
    }

    private function setUserToCompany(Company $company, User $user): Company
    {
        $company->user()->associate($user);

        return $company;
    }

    private function getSizes(?string $size): array
    {
        $sizes = [
            'min' => null,
            'max' => null
        ];
        if (!$size) {
            return $sizes;
        }

        $replace = ['+', '.', ',', '-', ' '];

        if (strpos($size, '+') !== false) {
            $sizes['min'] = (int)str_replace(['+', '.', ',', ' '], '', $size);
        } elseif (strpos($size, '-') !== false) {
            [$min, $max] = explode('-', $size);
            $sizes['min'] = (int)str_replace($replace, '', $min);
            $sizes['max'] = (int)str_replace($replace, '', $max);
        } else {
            $sizes['max'] = (int)str_replace($replace, '', $size);
        }

        return $sizes;
    }
}
