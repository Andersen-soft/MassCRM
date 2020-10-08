<?php

namespace App\Http\Resources\Export;

use App\Http\Resources\User\User as UserResource;
use Illuminate\Http\Resources\Json\JsonResource;

class Process extends JsonResource
{
    private const DATE_TIME_FORMAT = 'd.m.Y H:i';

    /**
     * @OA\Schema(
     *    schema="ExportProcess",
     *    required={
     *       "id", "created_at", "updated_at", "domain", "source", "user"
     *    },
     *    @OA\Property(property="id", type="integer", example=123),
     *    @OA\Property(property="created_at", type="string", format="d.m.Y H:i", example="18.06.2020 13:15"),
     *    @OA\Property(property="updated_at", type="string", format="d.m.Y H:i", example="18.08.2020 13:15"),
     *    @OA\Property(property="name", type="string", example="Export blacklist"),
     *    @OA\Property(property="file_path", type="string", example="/var/www/storage/export/export.csv"),
     *    @OA\Property(property="status", type="string", example="Done"),
     *    @OA\Property(property="type", type="string", example="export_contact"),
     *    @OA\Property(property="user", type="object", ref="#/components/schemas/User"),
     * )
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'created_at' => $this->created_at->format(self::DATE_TIME_FORMAT),
            'updated_at' => $this->updated_at->format(self::DATE_TIME_FORMAT),
            'name' => $this->name,
            'file_path' => $this->file_path,
            'status' => $this->getStatusName(),
            'type' => $this->type,
            'user' => $this->user_id ? new UserResource($this->user) : null
        ];
    }
}
