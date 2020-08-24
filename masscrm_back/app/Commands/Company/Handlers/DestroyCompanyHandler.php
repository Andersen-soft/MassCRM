<?php

namespace App\Commands\Company\Handlers;

use App\Commands\Company\DestroyCompanyCommand;
use App\Models\Company\Company;

class DestroyCompanyHandler
{
    public function handle(DestroyCompanyCommand $command): void
    {
        Company::destroy($command->getCompanyId());
    }
}
