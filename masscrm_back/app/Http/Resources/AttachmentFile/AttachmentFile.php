<?php

declare(strict_types=1);

namespace App\Http\Resources\AttachmentFile;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\User\User as UserResource;

class AttachmentFile extends JsonResource
{
    private const DATE_FORMAT = 'd.m.Y';

    /**
     * @OA\Schema(
     *     schema="AttachmentFile",
     *     required={"id", "createdAt", "updatedAt", "companyId", "fileName", "url", "user"},
     *     @OA\Property(property="id", type="integer", example=123),
     *     @OA\Property(property="createdAt", type="string", format="d.m.Y", example="13.07.2020"),
     *     @OA\Property(property="updatedAt", type="string", format="d.m.Y", example="14.07.2020"),
     *     @OA\Property(property="companyId", type="integer", example=3),
     *     @OA\Property(property="fileName", type="string", example="masscrm_test.pdf"),
     *     @OA\Property(property="url", type="string",
     *         example="https://mass-crm.s3.eu-central-1.amazonaws.com/masscrm_test.pdf"
     *     ),
     *     @OA\Property(property="user", type="object", ref="#/components/schemas/User")
     * )
     *
     * @param Request $request
     * @return array
     */
    public function toArray($request): array
    {
        if (!$this->resource) {
            return [];
        }

        return [
            'id' => $this->id,
            'createdAt' => $this->created_at->format(self::DATE_FORMAT),
            'updatedAt' => $this->updated_at->format(self::DATE_FORMAT),
            'companyId' => $this->company_id,
            'fileName' => $this->file_name,
            'url' => $this->url,
            'user' => new UserResource($this->user),
        ];
    }
}
