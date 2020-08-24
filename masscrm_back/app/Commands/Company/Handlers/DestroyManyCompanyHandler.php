<?php

namespace App\Commands\Company\Handlers;

use App\Commands\Company\DestroyManyCompanyCommand;
use App\Models\Company\Company;

class DestroyManyCompanyHandler
{
    public function handle(DestroyManyCompanyCommand $command): void
    {
        Company::destroy($command->getIds());
    }
}
