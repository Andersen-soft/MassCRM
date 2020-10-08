<?php

namespace App\Http\Resources\AttachmentFile;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\User\User as UserResource;

class AttachmentFile extends JsonResource
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
        if (!$this->resource) {
            return [];
        }

        return [
            'id' => $this->id,
            'createdAt' => $this->created_at->format(self::DATE_FORMAT),
            'updatedAt' => $this->updated_at->format(self::DATE_FORMAT),
            'companyId' => $this->company_id,
            'fileName' => $this->file_name,
            'url' => $this->url,
            'user' => new UserResource($this->user),
        ];
    }
}
