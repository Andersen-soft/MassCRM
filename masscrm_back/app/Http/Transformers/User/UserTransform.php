<?php

namespace App\Http\Transformers\User;

use App\Models\User\User;
use League\Fractal\TransformerAbstract;

class UserTransform extends TransformerAbstract
{
    /**
     * @OA\Schema(
     *    schema="User",
     *    required={
     *       "id", "login", "email", "name", "surname", "position", "comment", "roles", "active",
     *       "fromActiveDirectory"
     *    },
     *    @OA\Property(property="success", type="boolean", example=true),
     *        @OA\Property(property="payload", type="object",
     *            @OA\Property(property="id", type="integer", example=123),
     *            @OA\Property(property="login", type="string", example="masscrm"),
     *            @OA\Property(property="email", type="string", example="masscrm@andersenlab.com"),
     *            @OA\Property(property="name", type="string", example="Masscrm"),
     *            @OA\Property(property="roles", type="object",
     *                @OA\Property(property="administrator", type="object",
     *                    @OA\Property(property="text", type="string", example="Admin"),
     *                    @OA\Property(property="description", type="string", example="Administrator"),
     *                ),
     *                @OA\Property(property="manager", type="object",
     *                    @OA\Property(property="text", type="string", example="Manager"),
     *                    @OA\Property(property="description", type="string",
     *                       example="Marketer, Marketer Assistant and other authorized employees"),
     *                ),
     *            ),
     *            @OA\Property(property="skype", type="string", example="masscrm.ander"),
     *            @OA\Property(property="surname", type="string", example="Masscrm CRM"),
     *            @OA\Property(property="position", type="string", example="Position Test"),
     *            @OA\Property(property="comment", type="string", example="Comment Test"),
     *            @OA\Property(property="active", type="boolean", example=false),
     *            @OA\Property(property="fromActiveDirectory", type="boolean", example=false)
     *    )
     * )
     */
    public function transform(User $user): array
    {
        return [
            'id' => $user->getId(),
            'login' => $user->getLogin(),
            'email' => $user->getEmail(),
            'name' => $user->getName(),
            'surname' => $user->getSurname(),
            'position' => $user->getPosition(),
            'comment' => $user->getComment(),
            'roles' => $user->getRolesTranslate(),
            'skype' => $user->getSkype(),
            'active' => $user->isActive(),
            'fromActiveDirectory' => $user->fromActiveDirectory()
        ];
    }
}
