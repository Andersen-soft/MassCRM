<?php declare(strict_types=1);

namespace App\Http\Resources\User;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class Notification extends JsonResource
{
    /**
     * @OA\Schema(
     *    schema="Notification",
     *    required={
     *       "id", "type", "payload", "created_at", "updated_at", "new", "message", "operation_id", "file_path"
     *    },
     *    @OA\Property(property="id", type="integer", example=123),
     *    @OA\Property(property="type", type="string", example="import_type"),
     *    @OA\Property(property="payload", type="object",
     *        @OA\Property(property="created_at", type="string", format="d.m.Y H:i", example="18.06.2020 13:15"),
     *        @OA\Property(property="updated_at", type="string", format="d.m.Y H:i", example="18.06.2020 13:15"),
     *        @OA\Property(property="new", type="boolean", example=false),
     *        @OA\Property(property="message", type="string", example="Message notitfication"),
     *        @OA\Property(property="operation_id", type="integer", example=20),
     *        @OA\Property(property="file_path", type="string", example="/var/wwww/storage/bash/startQue.sh"),
     *    )
     * )
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
                'file_path' => $this->file_path,
                'user' => $this->user->full_name,
            ]
        ];
    }
}
