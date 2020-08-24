<?php

namespace App\Commands\Location\Handlers;

use App\Commands\Location\GetCountriesCommand;
use App\Repositories\Location\LocationRepository;
use Illuminate\Support\Collection;

class GetCountriesHandler
{
    private LocationRepository $repository;

    public function __construct(LocationRepository $repository)
    {
        $this->repository = $repository;
    }

    public function handle(GetCountriesCommand $command): Collection
    {
        return $this->repository->getCountries();
    }
}
