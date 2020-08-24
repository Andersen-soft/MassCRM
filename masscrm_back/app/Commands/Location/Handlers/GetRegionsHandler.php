<?php

namespace App\Commands\Location\Handlers;

use App\Commands\Location\GetRegionsCommand;
use App\Exceptions\Custom\NotFoundException;
use App\Repositories\Location\LocationRepository;
use Illuminate\Support\Collection;

class GetRegionsHandler
{
    private LocationRepository $repository;

    public function __construct(LocationRepository $repository)
    {
        $this->repository = $repository;
    }

    public function handle(GetRegionsCommand $command): Collection
    {
        $regions = $this->repository->getRegions($command->getCountryCode());

        if ($regions instanceof Collection) {
            return $regions;
        }

        throw new NotFoundException('Country code(' . $command->getCountryCode() . ') not found');
    }
}
