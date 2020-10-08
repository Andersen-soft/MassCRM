<?php

namespace App\Http\Resources\Contact;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class Colleague extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param Request $request
     * @return array
     */
    public function toArray($request): array
    {
        $link = $this->link;
        if ($this->contact_id_relation) {
            $link = $this->contractRelation->linkedin;
        }

        return [
            'id' => $this->id,
            'link' => $link,
            'full_name' => $this->full_name
        ];
    }
}
