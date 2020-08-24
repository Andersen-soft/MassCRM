<?php

namespace App\Commands\Company\Handlers;

use App\Commands\Company\GetCompanyListCommand;
use App\Models\BaseModel;
use App\Repositories\Company\CompanyRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class GetCompanyListHandler
{
    protected CompanyRepository $repository;

    public function __construct(CompanyRepository $repository)
    {
        $this->repository = $repository;
    }

    public function handle(GetCompanyListCommand $command): LengthAwarePaginator
    {
        return $this->repository->getCompanyList(
            $command->getSearch(),
            $command->getSort(),
            $command->getLimit(),
            $command->getMode() !== BaseModel::MODE_ALL ? $command->getUser() : null
        );
    }
}
