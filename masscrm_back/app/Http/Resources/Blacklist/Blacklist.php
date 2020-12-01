<?php

declare(strict_types=1);

namespace App\Http\Resources\Blacklist;

use App\Http\Resources\User\User as UserResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class Blacklist extends JsonResource
{
    private const DATE_TIME_FORMAT = 'd.m.Y H:i';

    /**
     * @OA\Schema(
     *     schema="Blacklist",
     *     required={"id", "created_at", "updated_at", "domain", "source", "user"},
     *     @OA\Property(property="id", type="integer", example=123),
     *     @OA\Property(property="created_at", type="string", format="d.m.Y H:i", example="18.06.2020 13:15"),
     *     @OA\Property(property="updated_at", type="string", format="d.m.Y H:i", example="18.08.2020 13:15"),
     *     @OA\Property(property="domain", type="string", example="peter@pftech.co"),
     *     @OA\Property(property="source", type="string", example="Reply"),
     *     @OA\Property(property="user", type="object", ref="#/components/schemas/User"),
     * )
     *
     * @param Request $request
     * @return array
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'created_at' => $this->created_at->format(self::DATE_TIME_FORMAT),
            'updated_at' => $this->updated_at->format(self::DATE_TIME_FORMAT),
            'domain' => $this->domain,
            'source' => $this->source,
            'user' => $this->user_id ? new UserResource($this->user) : null
        ];
    }
}
