<?php

namespace App\Providers\Location;

use App\Commands\Location\{
    GetCitiesCommand,
    GetCountriesCommand,
    GetRegionsCommand
};

use App\Commands\Location\Handlers\{
    GetCitiesHandler,
    GetCountriesHandler,
    GetRegionsHandler
};
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\ServiceProvider;

class LocationServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->registerCommandHandlers();
    }

    public function register()
    {
    }

    private function registerCommandHandlers()
    {
        Bus::map([
            GetCountriesCommand::class => GetCountriesHandler::class,
            GetRegionsCommand::class => GetRegionsHandler::class,
            GetCitiesCommand::class => GetCitiesHandler::class,
        ]);
    }
}
