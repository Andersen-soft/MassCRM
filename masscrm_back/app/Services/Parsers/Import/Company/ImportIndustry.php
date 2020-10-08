<?php

namespace App\Services\Parsers\Import\Company;

use App\Exceptions\Import\ImportFileException;
use App\Repositories\Industry\IndustryRepository;
use App\Models\Company\Company;
use Illuminate\Support\Facades\Lang;

class ImportIndustry
{
    private IndustryRepository $industryRepository;

    public function __construct(IndustryRepository $industryRepository)
    {
        $this->industryRepository = $industryRepository;
    }

    public function merge(Company $company, array $row): void
    {
        if (empty($row['companyIndustries']['industry'])) {
            return;
        }

        $newIndustries = [];
        $industries = $company->industries()->pluck('id')->toArray();

        foreach ($row['companyIndustries']['industry'] as $key => $item) {
            $industry = $this->industryRepository->getIndustryFromName($item);

            if (!$industry) {
                throw new ImportFileException([
                    Lang::get('validationModel.industry.name_not_exist', ['value' => $item])
                ]);
            }

            $idsIndustries[] = $industry->id;
        }

        if (!empty($newIndustries)) {
            $company->industries()->sync(array_unique(array_merge($newIndustries, $industries)));
        }
    }

    public function replace(Company $company, array $row): void
    {
        if (!isset($row['companyIndustries'])) {
            return;
        }

        $idsIndustries = [];
        $nameIndustries = $row['companyIndustries']['industry'];

        foreach ($nameIndustries as $item) {
            $industry =  $this->industryRepository->getIndustryFromName($item);

            if (!$industry) {
                throw new ImportFileException([
                    Lang::get('validationModel.industry.name_not_exist', ['value' => $item])
                ]);
            }

            $idsIndustries[] = $industry->id;
        }

        $company->industries()->sync($idsIndustries);
    }

    public function create(Company $company, array $row): void
    {
        $this->replace($company, $row);
    }
}