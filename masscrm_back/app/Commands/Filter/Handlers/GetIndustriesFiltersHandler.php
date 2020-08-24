<?php

namespace App\Commands\Filter\Handlers;

use App\Commands\Filter\GetIndustriesFilterCommand;
use App\Repositories\Industry\IndustryRepository;
use Illuminate\Support\Collection;

class GetIndustriesFiltersHandler
{
    private IndustryRepository $repository;

    public function __construct(IndustryRepository $repository)
    {
        $this->repository = $repository;
    }

    public function handle(GetIndustriesFilterCommand $command): Collection
    {
        return $this->repository->getIndustries();
    }
}
