<?php

namespace App\Http\Transformers\ActivityLog;

use App\Models\ActivityLog\AbstractActivityLog;
use App\Models\User\User;
use League\Fractal\TransformerAbstract;
use Illuminate\Support\Facades\Lang;

class ActivityLogTransform extends TransformerAbstract
{
    /**
     * @OA\Schema(
     *    schema="ActivityLog",
     *    required={"id", "description", "date", "user"},
     *    @OA\Property(property="id", type="integer", example=123),
     *    @OA\Property(property="date", type="string", format="d.m.Y", example="13.07.2020"),
     *    @OA\Property(property="description", type="string",
     *        example="File Сотрудники (нет зарплатного счета).xlsx deleted from Attachments"
     *    ),
     *    @OA\Property(property="user", type="object",
     *        required={"id", "name", "surname"},
     *        @OA\Property(property="id", type="integer", example=123),
     *        @OA\Property(property="name", type="string", example="Masscrm"),
     *        @OA\Property(property="surname", type="string", example="Masscrm"),
     *    ),
     *  )
     */
    public function transform(AbstractActivityLog $activityLog): array
    {
        /** @var User $user */
        $user = $activityLog->user;

        return [
            'id' => $activityLog->getId(),
            'description' => Lang::get(
                'activityLog.' . $activityLog->getModelName() . '_'
                . $activityLog->getActivityType() . '_' . $activityLog->getModelField(),
                [
                    'modelField' => $activityLog->getModelField(),
                    'dataOld' => $activityLog->getDataOld(),
                    'dataNew' => $activityLog->getDataNew(),
                    'additionalInfoForData' => $activityLog->getAdditionalInfoForData()
                ]
            ),
            'date' => $activityLog->getCreatedAt()->format('d.m.Y H:i'),
            'user' => [
                'id' => $user->getId(),
                'name' => $user->getName(),
                'surname' => $user->getSurname(),
            ]
        ];
    }
}
