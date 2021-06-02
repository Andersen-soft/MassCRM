<?php declare(strict_types=1);

namespace App\Http\Resources\ReportPage;

use Illuminate\Http\Resources\Json\JsonResource;

class ReportPageForNC extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'created' => $this->created,
            'updated' => $this->updated,
            'total' => $this->total,
            'date' => $this->date
        ];
    }
}
