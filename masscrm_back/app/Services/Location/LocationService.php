<?php declare(strict_types=1);

namespace App\Services\Location;

use App\Commands\Location\GetCitiesCommand;
use App\Commands\Location\GetCountriesCommand;
use App\Commands\Location\GetRegionsCommand;
use App\Exceptions\Custom\NotFoundException;
use App\Http\Requests\Location\CityRequest;
use App\Models\Location\City;
use App\Models\Location\Country;
use App\Models\Location\Location;
use App\Models\Location\Region;
use App\Repositories\Location\LocationRepository;
use Illuminate\Support\Collection;

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

    public function findLocations(string $location): ?Location
    {
        $loc = new Location();
        $city = $this->locationRepository->getCityByName($location);
        if ($city instanceof City) {
            $loc->setCity($city)
                ->setRegion($city->region)
                ->setCountry($city->region->country);
            return $loc;
        }

        $region = $this->locationRepository->getRegionByName($location);

        if ($region instanceof Region) {
            $loc->setRegion($region)
                ->setCountry($region->country);
            return $loc;
        }
        $country = $this->locationRepository->getCountryByName($location);

        if ($country instanceof Country) {
            $loc->setCountry($country);
        }

        if ($loc->isEmpty()) {
            $loc = null;
        }

        return $loc;
    }

    public function getRegions(string $countryCode): Collection
    {
        $regions = $this->locationRepository->getRegions($countryCode);

        if ($regions instanceof Collection) {
            return $regions;
        }

        throw new NotFoundException('Country code(' . $countryCode . ') not found');
    }

    public function getCountries(): Collection
    {
        return $this->locationRepository->getCountries();
    }

    public function getCities(string $regionCode): Collection
    {
        $cities = $this->locationRepository->getCities($regionCode);

        if ($cities instanceof Collection) {
            return $cities;
        }

        throw new NotFoundException('Region code(' . $regionCode . ') not found');
    }

    public function addCities(CityRequest $request): Collection
    {
        $regions = [];
        $validRegions = [];
        foreach ($request->get('location') as $location) {
            if (!isset($validRegions[$location['country']])) {
                $validRegions[$location['country']] = [];
            }

            // Check if country has region
            if (!in_array($location['region'], $validRegions[$location['country']], true)) {
                if (!$this->locationRepository->hasRegionInCountry($location['country'], $location['region'])) {
                    throw new NotFoundException(
                        "Region with ID #{$location['region']} not found in the Country with ID #{$location['country']}"
                    );
                }

                $validRegions[$location['country']][] = $location['region'];
            }

            if (!isset($regions[$location['region']])) {
                $regions[$location['region']] = [];
            }

            $city = ucfirst(strtolower(trim($location['city'])));
            if (!in_array($city, $regions[$location['region']], true)) {
                $regions[$location['region']][] = $city;
            }
        }

        $savedCities = collect();
        foreach ($regions as $regionId => $items) {
            /** @var Region $region */
            $region = Region::query()->find($regionId);

            // Check and remove from array if the city exist in DB
            $cities = collect($items)->map(function ($city) {
                return ['name' => $city];
            })->reject(function ($city) use ($region) {
                return $this->locationRepository->hasCityByNameAndRegionId($city['name'], $region->getId());
            });

            // Save cities
            $savedCities->add($region->cities()->createMany($cities));
        }

        return $savedCities;
    }
}
