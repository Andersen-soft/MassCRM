<?php

namespace App\Http\Resources\ActivityLog;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Lang;

class ActivityLog extends JsonResource
{
    private const DATE_TIME_FORMAT = 'd.m.Y H:i';

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
            'description' => Lang::get(
                'activityLog.' . $this->activity_type,
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
