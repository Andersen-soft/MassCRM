<?php

namespace App\Commands\Location\Handlers;

use App\Commands\Location\GetCitiesCommand;
use App\Exceptions\Custom\NotFoundException;
use App\Repositories\Location\LocationRepository;
use Illuminate\Support\Collection;

class GetCitiesHandler
{
    private LocationRepository $repository;

    public function __construct(LocationRepository $repository)
    {
        $this->repository = $repository;
    }

    public function handle(GetCitiesCommand $command): Collection
    {
        $cities = $this->repository->getCities($command->getRegionCode());

        if ($cities instanceof Collection) {
            return $cities;
        }

        throw new NotFoundException('Region code(' . $command->getRegionCode() . ') not found');
    }
}
