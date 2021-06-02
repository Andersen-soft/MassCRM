<?php declare(strict_types=1);

namespace App\Http\Resources\ReportPage;

use Illuminate\Http\Resources\Json\JsonResource;

class ReportPageForManager extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->user_id,
            'name' => $this->name,
            'surname' => $this->surname,
            'role' => json_decode($this->role),
            'created' => $this->created,
            'updated' => $this->updated,
            'total' => $this->total,
        ];
    }
}
