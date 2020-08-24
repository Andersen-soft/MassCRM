<?php

namespace App\Providers\Filters;

use App\Commands\Filter\GetFiltersCommand;
use App\Commands\Filter\GetIndustriesFilterCommand;
use App\Commands\Filter\Handlers\GetFiltersHandler;
use App\Commands\Filter\Handlers\GetIndustriesFiltersHandler;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\ServiceProvider;

class FilterServiceProvider extends ServiceProvider
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
            GetFiltersCommand::class => GetFiltersHandler::class,
            GetIndustriesFilterCommand::class => GetIndustriesFiltersHandler::class,
        ]);
    }
}
