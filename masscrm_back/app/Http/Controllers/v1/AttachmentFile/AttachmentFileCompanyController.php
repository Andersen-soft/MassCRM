<?php

declare(strict_types=1);

namespace App\Http\Controllers\v1\AttachmentFile;

use App\Helpers\Pagination;
use App\Http\Requests\AttachmentFile\Company\AttachFileCompanyRequest;
use App\Http\Requests\AttachmentFile\Company\GetAttachmentFileRequest;
use App\Services\AttachmentFile\AttachmentFileCompanyService;
use App\Commands\AttachmentFile\Company\SaveAttachedFileCompanyCommand;
use App\Http\Requests\AttachmentFile\Company\GetAttachedFilesListRequest;
use App\Http\Controllers\BaseController;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\AttachmentFile\AttachmentFile as AttachmentFileResources;

class AttachmentFileCompanyController extends BaseController
{
    private AttachmentFileCompanyService $attachmentFileCompanyService;

    public function __construct(AttachmentFileCompanyService $attachmentFileCompanyService)
    {
        $this->attachmentFileCompanyService = $attachmentFileCompanyService;
    }

    /**
     * @OA\Post(
     *     path="/attachment-files/company",
     *     tags={"Attachment"},
     *     description="Attach new file to company",
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 required={"id", "file"},
     *                 @OA\Property(property="id", type="integer", example=13),
     *                 @OA\Property(property="file", type="string", format="binary"),
     *             )
     *         )
     *      ),
     *      @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(
     *              required={"success", "data"},
     *              @OA\Property(property="success", type="boolean", example=true),
     *              @OA\Property(property="data", type="object", ref="#/components/schemas/AttachmentFile")
     *          )
     *     ),
     *     @OA\Response(response="400", ref="#/components/responses/400"),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     * )
     */
    public function store(AttachFileCompanyRequest $request): JsonResponse
    {
        $file = $this->attachmentFileCompanyService->saveAttachFile(
            new SaveAttachedFileCompanyCommand(
                $request->user(),
                $request->file('file'),
                (int) $request->post('id')
            )
        );

        return $this->success([new AttachmentFileResources($file)]);
    }

    /**
     * @OA\Delete(
     *     path="/attachment-files/company/{id}",
     *     tags={"Attachment"},
     *     description="Delete file ID from company",
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(ref="#/components/parameters/id"),
     *     @OA\Response(
     *         response="200",
     *         description="Successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="data", type="object"),
     *         )
     *     ),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     *     @OA\Response(response="404", ref="#/components/responses/404"),
     * )
     */
    public function destroy(int $id): JsonResponse
    {
        $this->attachmentFileCompanyService->deleteAttachFile((int) $id);

        return $this->success([]);
    }

    /**
     * @OA\Get(
     *     path="/attachment-files/company",
     *     tags={"Attachment"},
     *     description="Get list attached files to company ID",
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(ref="#/components/parameters/page"),
     *     @OA\Parameter(ref="#/components/parameters/limit"),
     *     @OA\Parameter(name="id", in="query", required=true,
     *        @OA\Schema(type="integer", example=5)
     *     ),
     *     @OA\Response(
     *         response="200",
     *         description="Successfully",
     *         @OA\JsonContent(
     *             required={"success", "data", "meta"},
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="data", type="array",
     *                 @OA\Items(type="string", ref="#/components/schemas/AttachmentFile")
     *             ),
     *             @OA\Property(property="meta", type="array",
     *                  @OA\Items(type="string", ref="#/components/schemas/Meta")
     *             ),
     *         ),
     *     ),
     *     @OA\Response(response="400", ref="#/components/responses/400"),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     * )
     */
    public function index(
        GetAttachedFilesListRequest $request,
        Pagination $pagination
    ): JsonResponse {
        $files = $this->attachmentFileCompanyService
            ->getAttachedFilesCompany((int) $request->get('id'))
            ->paginate($request->get('limit', self::DEFAULT_PAGE_LIMIT));

        return $this->success(AttachmentFileResources::collection($files), $pagination->getMeta($files));
    }

    /**
     * @OA\Get(
     *      path="/attachment-files/company/check-exist",
     *      tags={"Attachment"},
     *      description="Check exist attached file to company ID",
     *      security={{"bearerAuth":{}}},
     *      @OA\Parameter(name="id", in="query", required=true,
     *          @OA\Schema(type="integer")
     *      ),
     *      @OA\Parameter(name="name", in="query", required=true,
     *          @OA\Schema(type="string")
     *      ),
     *     @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(
     *              required={"success", "data"},
     *              @OA\Property(property="success", type="boolean", example=true),
     *              @OA\Property(property="data", type="object", ref="#/components/schemas/AttachmentFile")
     *          )
     *      ),
     *      @OA\Response(response="400", ref="#/components/responses/400"),
     *      @OA\Response(response="401", ref="#/components/responses/401"),
     * )
     */
    public function checkExistFile(GetAttachmentFileRequest $request): JsonResponse
    {
        $file = $this->attachmentFileCompanyService->getAttachmentFile(
            $request->get('id'),
            $request->get('name')
        );

        return $this->success([(new AttachmentFileResources($file))]);
    }
}
