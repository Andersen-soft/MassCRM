<?php

declare(strict_types=1);

namespace App\Http\Resources\ActivityLog;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Lang;

class ActivityLog extends JsonResource
{
    private const DATE_TIME_FORMAT = 'd.m.Y H:i';

    /**
     * @OA\Schema(
     *     schema="ActivityLog",
     *     required={"id", "description", "date", "user"},
     *     @OA\Property(property="id", type="integer", example=123),
     *     @OA\Property(property="date", type="string", format="d.m.Y", example="13.07.2020"),
     *     @OA\Property(property="description", type="string",
     *         example="File Сотрудники (нет зарплатного счета).xlsx deleted from Attachments"
     *     ),
     *     @OA\Property(property="user", type="object",
     *         required={"id", "name", "surname"},
     *         @OA\Property(property="id", type="integer", example=123),
     *         @OA\Property(property="name", type="string", example="Masscrm"),
     *         @OA\Property(property="surname", type="string", example="Masscrm"),
     *     ),
     * )
     *
     * @param Request $request
     * @return array
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'description' => Lang::get(
                'activityLog.' . $this->model_name . '_' . $this->activity_type . '_' . $this->model_field,
                [
                    'modelField' => $this->model_field,
                    'dataOld' => $this->data_old,
                    'dataNew' => $this->data_new,
                ]
            ),
            'date' => $this->created_at->format(self::DATE_TIME_FORMAT),
            'user' => [
                'id' => $this->user->id,
                'name' => $this->user->name,
                'surname' => $this->user->surname,
            ]
        ];
    }
}
