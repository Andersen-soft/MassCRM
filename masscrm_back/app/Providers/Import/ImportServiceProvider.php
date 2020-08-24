<?php

namespace App\Providers\Import;

use App\Commands\Import\Handlers\ImportContactsHandler;
use App\Commands\Import\Handlers\ImportStartParseHandler;
use App\Commands\Import\ImportContactsCommand;
use App\Commands\Import\ImportStartParseCommand;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\ServiceProvider;

class ImportServiceProvider extends ServiceProvider
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
            ImportContactsCommand::class => ImportContactsHandler::class,
            ImportStartParseCommand::class => ImportStartParseHandler::class
        ]);
    }
}
