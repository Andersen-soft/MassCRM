<?php

namespace App\Http\Transformers\User;

use App\Models\User\UsersNotification;
use League\Fractal\TransformerAbstract;

class NotificationTransform extends TransformerAbstract
{
    /**
     * @OA\Schema(
     *    schema="Notification",
     *    required={"id", "type", "data"},
     *    @OA\Property(property="id", type="integer", example=123),
     *    @OA\Property(property="type", type="string", example="finish_import"),
     *    @OA\Property(property="data", type="object",
     *        @OA\Property(property="message", type="string", example="Import file finished")
     *     ),
     *  )
     */
    public function transform(UsersNotification $usersNotification): array
    {
        return [
            'id' => $usersNotification->getId(),
            'type' => $usersNotification->getTypeNotification(),
            'data' => [
                'message' => $usersNotification->getMessage()
            ]
        ];
    }
}
