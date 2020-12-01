<?php declare(strict_types=1);

namespace App\Http\Resources\Company;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class Industry extends JsonResource
{
    /**
     * @OA\Schema(
     *    schema="Industry",
     *    required={ "id","name"},
     *    @OA\Property(property="id", type="string", example=12),
     *    @OA\Property(property="name", type="string", example="Banking")
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
