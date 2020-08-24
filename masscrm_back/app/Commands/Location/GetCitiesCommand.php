<?php

namespace App\Commands\Location;

class GetCitiesCommand
{
    public string $regionCode;

    public function __construct(string $regionCode)
    {
        $this->regionCode = $regionCode;
    }

    public function getRegionCode(): string
    {
        return $this->regionCode;
    }
}
