<?php

namespace App\Http\Transformers\AttachmentFile\Company;

use App\Models\AttachmentFile\CompanyAttachment;
use League\Fractal\TransformerAbstract;
use App\Http\Transformers\User\UserTransform;

class FileCompanyTransform extends TransformerAbstract
{
    /**
     * @OA\Schema(
     *    schema="FileCompany",
     *    required={"id", "createdAt", "updatedAt", "companyId", "fileName", "url", "user"},
     *    @OA\Property(property="id", type="integer", example=123),
     *    @OA\Property(property="createdAt", type="string", format="d.m.Y", example="13.07.2020"),
     *    @OA\Property(property="updatedAt", type="string", format="d.m.Y", example="14.07.2020"),
     *    @OA\Property(property="companyId", type="integer", example=3),
     *    @OA\Property(property="fileName", type="string", example="masscrm_test.pdf"),
     *    @OA\Property(property="url", type="string",
     *        example="https://mass-crm.s3.eu-central-1.amazonaws.com/masscrm_test.pdf"
     *    ),
     *    @OA\Property(property="user", type="object",
     *        required={
     *            "id", "login", "email", "name", "surname", "position", "comment", "roles", "active",
     *            "fromActiveDirectory"
     *        },
     *        @OA\Property(property="id", type="integer", example=123),
     *        @OA\Property(property="login", type="string", example="masscrm"),
     *        @OA\Property(property="email", type="string", example="masscrm@andersenlab.com"),
     *        @OA\Property(property="name", type="string", example="Masscrm"),
     *        @OA\Property(property="roles", type="object",
     *        @OA\Property(property="nc1", type="object",
     *        @OA\Property(property="text", type="string", example="NC1"),
     *        @OA\Property(property="description", type="string",
     *            example="Ordinary Network Coordinator, who fills database"),
     *        ),
     *    ),
     *    @OA\Property(property="skype", type="string", example="masscrm.ander"),
     *    @OA\Property(property="surname", type="string", example="Masscrm CRM"),
     *    @OA\Property(property="position", type="string", example="Position Test"),
     *    @OA\Property(property="comment", type="string", example="Comment Test"),
     *    @OA\Property(property="active", type="boolean", example=false),
     *    @OA\Property(property="fromActiveDirectory", type="boolean", example=false),
     *           ),
     *  )
     */
    public function transform(?CompanyAttachment $companyAttachment): array
    {
        if (!$companyAttachment) {
            return [];
        }

        return [
            'id' => $companyAttachment->getId(),
            'createdAt' => $companyAttachment->getCreatedAt()->format('d.m.Y'),
            'updatedAt' => $companyAttachment->getUpdatedAt()->format('d.m.Y'),
            'companyId' => $companyAttachment->getCompanyId(),
            'fileName' => $companyAttachment->getFileName(),
            'url' => $companyAttachment->getUrl(),
            'user' => (new UserTransform)->transform($companyAttachment->user)
        ];
    }
}
