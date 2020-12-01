<?php declare(strict_types=1);

namespace App\Http\Resources\Location;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class CountryCollection extends ResourceCollection
{
    /**
     * @OA\Schema(
     *    schema="Country",
     *    required={"id", "name", "code"},
     *    @OA\Property(property="id", type="integer", example=1),
     *    @OA\Property(property="name", type="string", example="Belarus"),
     *    @OA\Property(property="code", type="string", example="BY"),
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
