<?php

use Illuminate\Database\Seeder;
use App\Models\Location\{
    Country,
    Region,
    City
};
use MenaraSolutions\Geographer\Earth;

class LocationSeeder extends Seeder
{
    public function run(): void
    {
        Country::query()->truncate();
        Region::query()->truncate();
        City::query()->truncate();
        $earth = new Earth();
        $countryIndex = 1;
        $regionIndex = 1;
        $cityIndex = 1;
        /** @var $country \MenaraSolutions\Geographer\Country */
        foreach ($earth->getCountries()->setLocale('en') as $country) {
            $countryDB = $this->addCountry($country->getName(), $country->getCode(), $countryIndex);
            /** @var $state \MenaraSolutions\Geographer\State */
            foreach ($country->getStates()->setLocale('en') as $state) {
                $regionDB = $this->addRegions(
                    $state->getName(),
                    $state->getIsoCode(),
                    $regionIndex,
                    $countryDB->getId()
                );
                /** @var $city \MenaraSolutions\Geographer\City*/
                $cities = [];
                foreach ($state->getCities()->setLocale('en') as $city){
                    $cities[]=$this->addCity($city->getName(),$cityIndex, $regionDB->getId());
                }
                $regionDB->cities()->saveMany($cities);
            }
        }
    }

    private function addCountry(string $name, string $code, int &$index): Country
    {
        $country = (new Country(['id' => $index, 'name' => $name, 'code' => $code]));
        $country->save();
        $index++;

        return $country;
    }

    private function addRegions(string $name, string $code, int &$index, int $countryId): Region
    {
        $region = (new Region(['id' => $index, 'name' => $name, 'code' => $code, 'country_id' => $countryId]));
        $region->save();
        $index++;

        return $region;
    }

    private function addCity(string $name, int &$index, int $regionId): City
    {
        $city = new City(['id' => $index, 'name' => $name, 'region_id' => $regionId]);
        $index++;
        return $city;
    }
}
