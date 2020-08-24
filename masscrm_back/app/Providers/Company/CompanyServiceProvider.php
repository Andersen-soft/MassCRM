<?php

namespace App\Providers\Company;


use App\Observers\Company\{
    CompanyObserver,
    CompanyVacancyObserver,
    CompanySubsidiaryObserver,
    CompanyIndustryObserver
};

use App\Models\Company\{
    Company,
    CompanyVacancy,
    CompanySubsidiary,
    CompanyIndustry
};

use App\Commands\Company\{
    CreateCompanyCommand,
    DestroyCompanyCommand,
    DestroyManyCompanyCommand,
    GetCompanyCommand,
    GetCompanyListCommand
};

use App\Commands\Company\Handlers\{
    CreateCompanyHandler,
    DestroyCompanyHandler,
    DestroyManyCompanyHandler,
    GetCompanyHandler,
    GetCompanyListHandler,
    UpdateCompanyHandler
};

use App\Commands\Company\UpdateCompanyCommand;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\ServiceProvider;

class CompanyServiceProvider extends ServiceProvider
{
    public function boot()
    {
        Company::observe(CompanyObserver::class);
        CompanyVacancy::observe(CompanyVacancyObserver::class);
        CompanySubsidiary::observe(CompanySubsidiaryObserver::class);
        CompanyIndustry::observe(CompanyIndustryObserver::class);
        $this->registerCommandHandlers();
    }

    public function register()
    {
    }

    private function registerCommandHandlers()
    {
        Bus::map([
            CreateCompanyCommand::class => CreateCompanyHandler::class,
            DestroyCompanyCommand::class => DestroyCompanyHandler::class,
            DestroyManyCompanyCommand::class => DestroyManyCompanyHandler::class,
            GetCompanyCommand::class => GetCompanyHandler::class,
            UpdateCompanyCommand::class => UpdateCompanyHandler::class,
            GetCompanyListCommand::class => GetCompanyListHandler::class,
        ]);
    }
}
