<?php declare(strict_types=1);

namespace App\Http\Resources\Auth;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Request;

class Login extends JsonResource
{
    /**
     * @OA\Schema(
     *     schema="AuthLogin",
     *     required={"access_token", "token_type", "expires_in"},
     *     @OA\Property(property="success", type="boolean", example=true),
     *          @OA\Property(property="payload", type="object",
     *              @OA\Property(property="access_token", type="string", example="eyJ0ufgeX.OiJKV1QiLCJh.iOiJIUzI1NiJ9"),
     *              @OA\Property(property="token_type", type="string", example="Bearer"),
     *              @OA\Property(property="expires_in", type="integer", example=3600),
     *          )
     *     )
     * )
     *
     * @param Request $request
     * @return array
     */
    public function toArray($request): array
    {
        return [
            'access_token' => $this->resource,
            'token_type' => 'Bearer',
            'expires_in' => $this->getExpiresIn()
        ];
    }

    /**
     * @return int
     */
    private function getExpiresIn(): int
    {
        return auth()->factory('api')->call($this)->getTtl() * 60;
    }
}
