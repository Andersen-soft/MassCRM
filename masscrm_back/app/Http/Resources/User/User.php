<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class User extends JsonResource
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
            'login' => $this->login,
            'email' => $this->email,
            'name' => $this->name,
            'surname' => $this->surname,
            'position' => $this->position,
            'comment' => $this->comment,
            'roles' => $this->getRolesTranslate(),
            'skype' => $this->skype,
            'active' => $this->active,
            'fromActiveDirectory' => $this->from_active_directory
        ];
    }
}
