<?php

namespace App\Commands\Company\Handlers;

use App\Commands\Company\GetCompanyCommand;
use App\Exceptions\Custom\NotFoundException;
use App\Models\Company\Company;

class GetCompanyHandler
{
    public function handle(GetCompanyCommand $command): Company
    {
        $company = Company::find($command->getContactId());
        if ($company instanceof Company){
            return $company;
        }

        throw new NotFoundException('Company value(' . $command->getContactId() . ') not found');
    }
}
