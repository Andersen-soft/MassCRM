<?php

namespace App\Services\Location;

use App\Models\Location\City;
use App\Models\Location\Country;
use App\Models\Location\Location;
use App\Models\Location\Region;
use App\Repositories\Location\LocationRepository;

class LocationService
{
    private LocationRepository $locationRepository;
    private array $locations = [];
    private array $notLocations = [];

    public function __construct(LocationRepository $locationRepository)
    {
        $this->locationRepository = $locationRepository;
    }

    public function isLocation(string $location): ?string
    {
        if (in_array($location, array_keys($this->locations))) {
            return $this->locations[$location];
        }
        if (in_array($location, $this->notLocations)) {
            return null;
        }

        $country = $this->locationRepository->getCountryByName($location);
        if ($country) {
            $this->locations[$location] = $country->getName();
            return $country->getName();
        }
        $region = $this->locationRepository->getRegionByName($location);
        if ($region) {
            $this->locations[$location] = $region->getName();
            return $region->getName();
        }

        $this->notLocations[] = $location;
        return null;
    }

    public function findLocations(string $str): ?Location
    {
        $locations = preg_split("/[\s,]+/", $str);
        $count = count($locations);
        for ($i = 0; $i <= $count; $i++) {
            if ($i < $count - 1) {
                $locations[] = $locations[$i] . ' ' . $locations[$i + 1];
            }
        }

        $loc = new Location();
        foreach ($locations as $location) {
            $city = $this->locationRepository->getCityByName($location);
            if ($city instanceof City) {
                $loc->setCity($city)
                    ->setRegion($city->region)
                    ->setCountry($city->region->country);
                break;
            }
            $region = $this->locationRepository->getRegionByName($location);
            if ($region instanceof Region) {
                $loc->setRegion($region)
                    ->setCountry($region->country);
                continue;
            }
            $country = $this->locationRepository->getCountryByName($location);
            if ($country instanceof Country) {
                $loc->setCountry($country);
            }
        }
        if ($loc->isEmpty()) {
            $loc = null;
        }

        return $loc;
    }
}
