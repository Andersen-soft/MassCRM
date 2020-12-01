<?php declare(strict_types=1);

namespace App\Http\Resources\Company;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SubsidiaryCompany extends JsonResource
{
    /**
     * @OA\Schema(
     *    schema="SubsidiaryCompany",
     *    required={"id", "name"},
     *    @OA\Property(property="id", type="integer", example=123),
     *    @OA\Property(property="name", type="string", format="Subsidiary Company"),
     * )
     *
     * @param Request $request
     * @return array
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name
        ];
    }
}
