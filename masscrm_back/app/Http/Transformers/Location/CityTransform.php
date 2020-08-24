<?php

namespace App\Http\Transformers\Location;

use App\Models\Location\City;
use League\Fractal\TransformerAbstract;

class CityTransform extends TransformerAbstract
{
    /**
     * @OA\Schema(
     *    schema="City",
     *    required={
     *        "id", "name", "region_id"
     *    },
     *    @OA\Property(property="id", type="integer", example=1),
     *    @OA\Property(property="name", type="string", example="Vitebsk"),
     *    @OA\Property(property="region_id", type="integer", example=1),
     * )
     */
    public function transform(City $city): array
    {
        return $city->toArray();
    }
}
