<?php

namespace App\Services\Parsers\Import;

use App\Exceptions\Custom\ImportContactsException;
use App\Models\Company\Company;
use App\Models\Industry;
use App\Repositories\Company\CompanyRepository;
use App\Services\Parsers\ParserMain;

class ParserImportCompanyService extends ParserMain
{
    protected CompanyRepository $companyRepository;

    public function __construct(CompanyRepository $companyRepository)
    {
        $this->companyRepository = $companyRepository;
    }

    public function createCompany(array $fields, array $arrayRow, int $id = null): Company
    {
        $companySize = $this->getValue($fields, $arrayRow, Company::SIZE_FIELD);
        $industry = $this->getValue($fields, $arrayRow, Industry::INDUSTRY_FIELD);
        $params = [];
        if ($id) {
            $params['id'] = $id;
        }
        $company = new Company($params);
        $company = $this->setMainFields($fields, $arrayRow, $company);
        if ($companySize !== '') {
            $size = $this->getSizes($companySize);
            $company->setMinEmployees($size['min']);
            $company->setMaxEmployees($size['max']);
        }
        if ($industry !== '') {
            $industry = $this->findIndustry($industry);
            if (!$industry) {
                throw new ImportContactsException('Invalid industry');
            }
        }

        $company->save();
        if ($industry !== '') {
            $company->industries()->sync($industry);
        }
        return $company;
    }

    public function getUnique(array $fields, array $row): ?Company
    {
        $name = '';
        $linkedin = null;
        $website = null;

        foreach ($fields as $key => $field) {
            switch ($field) {
                case 'company':
                    $name = $row[$key];
                    break;
                case 'comp_linkedin':
                    $linkedin = $row[$key];
                    break;
                case 'website':
                    $website = $row[$key];
                    break;
                default:
                    break;
            }
        }

        return $this->companyRepository->checkUniqueCompany($name, $linkedin, $website);
    }

    public function replace(Company $company, array $row, array $fields): Company
    {
        $id = $company->getId();
        $this->companyRepository->deleteById($id);
        return $this->createCompany($fields, $row, $id);
    }

    private function setMainFields(array $fields, array $arrayRow, Company $company, bool $merge = false): Company
    {
        foreach ($fields as $key => $value) {
            if (!isset($arrayRow[$key]) || is_null($arrayRow[$key])) {
                continue;
            }
            $company->setValue($value !== '' ? $value : null, $arrayRow[$key], $merge);
        }

        return $company;
    }

    public function merge(Company $company, array $row, array $fields): Company
    {
        $company = $this->setMainFields($fields, $row, $company, true);
        $company->save();

        return $company;
    }
}
