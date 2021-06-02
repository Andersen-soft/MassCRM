<?php

declare(strict_types=1);

namespace App\Repositories\Industry;

use App\Models\ActivityLog\ActivityLogCompany;
use App\Models\Company\CompanyIndustry;
use App\Models\Industry;
use Illuminate\Support\Collection;

class IndustryRepository
{
    public function getIndustries(): Collection
    {
        return Industry::where('active', true)
            ->orderBy('name')
            ->get();
    }

    public function getIndustryFromName(string $name): ?Industry
    {
        return Industry::query()->where('name', 'ILIKE', '%'. $name .'%')->first();
    }

    public function createIndustry(string $name): Industry
    {
        $industry = new Industry();
        $industry->name = $name;
        $industry->save();

        return $industry;
    }

    public function deleteIndustryFromCompany(int $companyId): void
    {
        CompanyIndustry::where(ActivityLogCompany::COMPANY_ID_FIELD, $companyId)->delete();
    }
}
