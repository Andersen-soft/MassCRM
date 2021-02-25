<?php

declare(strict_types=1);

namespace App\Repositories\Location;

use App\Models\Location\City;
use App\Models\Location\Country;
use App\Models\Location\Region;
use Illuminate\Support\Collection;

class LocationRepository
{
    public function getCountries(): Collection
    {
        return Country::all();
    }

    public function getRegions(string $countryCode): ?Collection
    {
        $country = Country::query()->where('code', $countryCode)->first();
        if ($country instanceof Country) {
            return $country->regions()->get();
        }

        return null;
    }

    public function getCities(string $stateCode): ?Collection
    {
        $country = Region::query()->where('code', $stateCode)->first();
        if ($country instanceof Region) {
            return $country->cities()->get();
        }

        return null;
    }

    public function getCountryByName(string $name): ?Country
    {
        return Country::query()->where('name', 'ILIKE', $name)->first();
    }

    public function getRegionByName(string $name): ?Region
    {
        return Region::query()->with('country')->where('name', 'ILIKE', $name)->first();
    }

    public function countCitiesByName(string $name): int
    {
        return City::query()->where('name', 'ILIKE', $name)->count();
    }

    public function getCityByName(string $name): ?City
    {
        return City::query()->with('region', 'region.country')
            ->where('name', 'ILIKE', $name)
            ->first();
    }

    public function getCityByNameAndCountryName(string $cityName, string $countryName): ?City
    {
        return City::query()->with('region', 'region.country')
            ->select('cities.*')
            ->leftJoin('regions', 'cities.region_id', '=', 'regions.id')
            ->leftJoin('countries', 'regions.country_id', '=', 'countries.id')
            ->where('cities.name', 'ILIKE', $cityName)
            ->where('countries.name', 'ILIKE', $countryName)
            ->first();
    }

    public function getCityByNameAndRegionName(string $cityName, string $regionName): ?City
    {
        return City::query()->with('region', 'region.country')
            ->select('cities.*')
            ->leftJoin('regions', 'cities.region_id', '=', 'regions.id')
            ->where('cities.name', 'ILIKE', $cityName)
            ->where('regions.name', 'ILIKE', $regionName)
            ->first();
    }

    public function hasRegionInCountry(int $countryId, int $regionId): bool
    {
        return Region::query()
            ->where(['id' => $regionId, 'country_id' => $countryId])
            ->exists();
    }

    public function hasCityByNameAndRegionId(string $cityName, int $regionId): bool
    {
        return City::query()
            ->where(['name' => $cityName, 'region_id' => $regionId])
            ->exists();
    }
}
