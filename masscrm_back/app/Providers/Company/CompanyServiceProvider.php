<?php declare(strict_types=1);

namespace App\Providers\Company;

use App\Models\Company\Company;
use App\Models\Company\CompanyIndustry;
use App\Models\Company\CompanySubsidiary;
use App\Models\Company\CompanyVacancy;
use App\Observers\Company\CompanyIndustryObserver;
use App\Observers\Company\CompanyObserver;
use App\Observers\Company\CompanySubsidiaryObserver;
use App\Observers\Company\CompanyVacancyObserver;
use Illuminate\Support\ServiceProvider;

class CompanyServiceProvider extends ServiceProvider
{
    public function boot()
    {
        Company::observe(CompanyObserver::class);
        CompanyIndustry::observe(CompanyIndustryObserver::class);
        CompanySubsidiary::observe(CompanySubsidiaryObserver::class);
        CompanyVacancy::observe(CompanyVacancyObserver::class);
    }
}
