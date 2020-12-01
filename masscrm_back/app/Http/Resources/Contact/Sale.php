<?php

declare(strict_types=1);

namespace App\Http\Resources\Contact;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Lang;

class Sale extends JsonResource
{
    private const DATE_FORMAT = 'd.m.Y';

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
            'created_at' => $this->created_at->format(self::DATE_FORMAT),
            'link' => $this->link,
            'project_c1' => $this->project_c1 ? Lang::get('report.yes') : Lang::get('report.no'),
            'status' => $this->status ? $this->status->name : '',
            'source' => $this->source ? $this->source->name : '',
        ];
    }
}
