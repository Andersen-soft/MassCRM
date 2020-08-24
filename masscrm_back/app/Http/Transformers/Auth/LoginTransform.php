<?php

namespace App\Http\Transformers\Auth;

use League\Fractal\TransformerAbstract;

class LoginTransform extends TransformerAbstract
{
    /**
     * @OA\Schema(
     *    schema="AuthLogin",
     *     required={
     *       "access_token", "token_type", "expires_in"
     *    },
     *    @OA\Property(property="success", type="boolean", example=true),
     *        @OA\Property(property="payload", type="object",
     *            @OA\Property(property="access_token", type="string", example="eyJ0ufgeX.OiJKV1QiLCJh.iOiJIUzI1NiJ9"),
     *            @OA\Property(property="token_type", type="string", example="Bearer"),
     *            @OA\Property(property="expires_in", type="integer", example="3600"),
     *        )
     *    )
     * )
     */
    public function transform(string $token): array
    {
        return [
            'access_token' => $token,
            'token_type' => 'Bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ];
    }
}
