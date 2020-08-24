<?php

namespace App\Commands\Location;

class GetRegionsCommand
{
    public string $countryCode;

    public function __construct(string $countryCode)
    {
        $this->countryCode = $countryCode;
    }

    public function getCountryCode(): string
    {
        return $this->countryCode;
    }
}
