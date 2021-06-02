<?php

declare(strict_types=1);

namespace App\Http\Resources\Company;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class Vacancy extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param Request $request
     * @return array
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'job' => $this->vacancy,
            'skills' => $this->skills,
            'link' => $this->link,
            'job_country' => $this->job_country,
            'job_city' => $this->job_city,
            'job_region' => $this->job_region
        ];
    }
}
