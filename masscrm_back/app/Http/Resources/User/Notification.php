<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class Notification extends JsonResource
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
            'type' => $this->type_notification,
            'payload' => [
                'created_at' => $this->created_at,
                'updated_at' => $this->updated_at,
                'new' => $this->new,
                'message' => $this->message,
                'operation_id' => $this->operation_id,
                'file_path' => $this->file_path
            ]
        ];
    }
}
