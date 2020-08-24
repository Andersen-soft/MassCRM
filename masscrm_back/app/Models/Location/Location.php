<?php

namespace App\Models\Location;

class Location
{
    protected ?Country $country;
    protected ?Region $region;
    protected ?City $city;

    public function __construct(
        Country $country = null,
        Region $region = null,
        City $city = null
    ) {
        $this->country = $country;
        $this->region = $region;
        $this->city = $city;
    }

    public function getCountry(): ?Country
    {
        return $this->country;
    }

    public function setCountry(?Country $country): Location
    {
        $this->country = $country;

        return $this;
    }

    public function getRegion(): ?Region
    {
        return $this->region;
    }

    public function setRegion(?Region $region): Location
    {
        $this->region = $region;

        return $this;
    }

    public function getCity(): ?City
    {
        return $this->city;
    }

    public function setCity(?City $city): Location
    {
        $this->city = $city;

        return $this;
    }

    public function isEmpty(): bool
    {
        return is_null($this->country) && is_null($this->region) && is_null($this->city);
    }
}
