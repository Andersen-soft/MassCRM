<?php

namespace App\Http\Transformers\Industry;

use App\Models\Industry;
use League\Fractal\TransformerAbstract;

class IndustryTransform extends TransformerAbstract
{
    /**
     * @OA\Schema(
     *    schema="Industry",
     *    required={
     *        "id","name","block","position"
     *    },
     *    @OA\Property(property="id", type="string", example=12),
     *    @OA\Property(property="name", type="string", example="Security"),
     *    @OA\Property(property="block", type="string", example=2),
     *    @OA\Property(property="position", type="string", example=1),
     * )
     */
    public function transform(Industry $industry): array
    {
        return [
            'id' => $industry->getId(),
            'name' => $industry->getName(),
            'block' => $industry->getBlock(),
            'position' => $industry->getPosition(),
        ];
    }
}
