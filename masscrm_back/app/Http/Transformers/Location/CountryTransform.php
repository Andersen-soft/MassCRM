<?php

namespace App\Http\Transformers\Location;

use App\Models\Location\Country;
use League\Fractal\TransformerAbstract;

class CountryTransform extends TransformerAbstract
{
    /**
     * @OA\Schema(
     *    schema="Country",
     *    required={
     *        "id", "name", "code"
     *    },
     *    @OA\Property(property="id", type="integer", example=1),
     *    @OA\Property(property="name", type="string", example="Belarus"),
     *    @OA\Property(property="code", type="string", example="BY"),
     * )
     */
    public function transform(Country $country): array
    {
        return $country->toArray();
    }
}
