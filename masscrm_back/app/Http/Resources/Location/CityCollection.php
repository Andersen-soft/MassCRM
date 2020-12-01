<?php declare(strict_types=1);

namespace App\Http\Resources\Location;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class CityCollection extends ResourceCollection
{
    /**
     * @OA\Schema(
     *    schema="City",
     *    required={"id", "name", "region_id"},
     *    @OA\Property(property="id", type="integer", example=1),
     *    @OA\Property(property="name", type="string", example="Vitebsk"),
     *    @OA\Property(property="region_id", type="integer", example=1),
     * )
     *
     * @param Request $request
     * @return array
     */
    public function toArray($request): array
    {
        return parent::toArray($request);
    }
}
