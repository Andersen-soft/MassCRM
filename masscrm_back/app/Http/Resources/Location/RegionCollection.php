<?php declare(strict_types=1);

namespace App\Http\Resources\Location;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class RegionCollection extends ResourceCollection
{
    /**
     * @OA\Schema(
     *    schema="Region",
     *    required={"id", "name", "code", "country_id"},
     *    @OA\Property(property="id", type="integer", example=1),
     *    @OA\Property(property="name", type="string", example="Vitebsk region"),
     *    @OA\Property(property="code", type="string", example="BY-VI"),
     *    @OA\Property(property="country_id", type="integer", example=1),
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
