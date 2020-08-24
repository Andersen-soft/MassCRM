<?php

namespace App\Services\Location;

use App\Repositories\Location\LocationRepository;

class IndustryService
{
    private LocationRepository $locationRepository;
    private array $industry = [];

    public function __construct(LocationRepository $locationRepository)
    {
        $this->locationRepository = $locationRepository;
    }

    public function isLocation(string $location): ?string
    {
        return null;
    }
}
