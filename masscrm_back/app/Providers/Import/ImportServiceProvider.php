<?php

declare(strict_types=1);

namespace App\Providers\Import;

use App\Http\Requests\Import\StartParsing\ImportRequestFactory;
use App\Http\Requests\Import\StartParsing\ImportStartParsingRequestInterface;
use Illuminate\Support\ServiceProvider;

class ImportServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(ImportStartParsingRequestInterface::class, function () {
            return ImportRequestFactory::createStartParsingValidator();
        });
    }
}
