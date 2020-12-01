<?php

declare(strict_types=1);

namespace App\Http\Transformers\Industry;

use App\Models\Industry;
use League\Fractal\TransformerAbstract;

class IndustryTransform extends TransformerAbstract
{
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
