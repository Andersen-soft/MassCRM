<?php declare(strict_types=1);

namespace App\Http\Resources\User;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class User extends JsonResource
{
    /**
     * @OA\Schema(
     *    schema="User",
     *    required={
     *       "id", "login", "email", "name", "surname", "position", "comment", "roles", "active", "fromActiveDirectory"
     *    },
     *    @OA\Property(property="id", type="integer", example=123),
     *    @OA\Property(property="login", type="string", example="masscrm"),
     *    @OA\Property(property="email", type="string", example="masscrm@andersenlab.com"),
     *    @OA\Property(property="name", type="string", example="Masscrm"),
     *    @OA\Property(property="roles", type="object",
     *        @OA\Property(property="administrator", type="object",
     *            @OA\Property(property="text", type="string", example="Admin"),
     *            @OA\Property(property="description", type="string", example="Administrator"),
     *        ),
     *        @OA\Property(property="manager", type="object",
     *            @OA\Property(property="text", type="string", example="Manager"),
     *            @OA\Property(property="description", type="string", example="Marketer Assistant")
     *        ),
     *    ),
     *    @OA\Property(property="skype", type="string", example="masscrm.ander"),
     *    @OA\Property(property="surname", type="string", example="Masscrm CRM"),
     *    @OA\Property(property="position", type="string", example="Position Test"),
     *    @OA\Property(property="comment", type="string", example="Comment Test"),
     *    @OA\Property(property="active", type="boolean", example=false),
     *    @OA\Property(property="fromActiveDirectory", type="boolean", example=false)
     * )
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
