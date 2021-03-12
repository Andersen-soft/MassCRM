<?php declare(strict_types=1);

namespace App\Imports\Contact\Parsers\Import\Company;

use App\Repositories\Industry\IndustryRepository;
use App\Models\Company\Company;

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

        $idsIndustries = [];
        $industries = $company->industries()->pluck('id')->toArray();

        foreach ($row['companyIndustries']['industry'] as $key => $item) {
            $industry = $this->industryRepository->getIndustryFromName($item);

            if (!$industry) {
                $industry = $this->industryRepository->createIndustry($item);
            }

            $idsIndustries[] = $industry->id;
        }

        if (!empty($idsIndustries)) {
            $company->industries()->sync(array_unique(array_merge($idsIndustries, $industries)));
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
                $industry = $this->industryRepository->createIndustry($item);
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
