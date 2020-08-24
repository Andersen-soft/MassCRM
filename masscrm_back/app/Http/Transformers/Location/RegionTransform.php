<?php

namespace App\Http\Transformers\Location;

use App\Models\Location\Region;
use League\Fractal\TransformerAbstract;

class RegionTransform extends TransformerAbstract
{
    /**
     * @OA\Schema(
     *    schema="Region",
     *    required={
     *        "id", "name", "code", "country_id"
     *    },
     *    @OA\Property(property="id", type="integer", example=1),
     *    @OA\Property(property="name", type="string", example="Vitebsk region"),
     *    @OA\Property(property="code", type="string", example="BY-VI"),
     *    @OA\Property(property="country_id", type="integer", example=1),
     * )
     */
    public function transform(Region $region): array
    {
        return $region->toArray();
    }
}
