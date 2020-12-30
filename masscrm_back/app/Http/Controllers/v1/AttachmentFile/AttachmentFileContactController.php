<?php

declare(strict_types=1);

namespace App\Http\Controllers\v1\AttachmentFile;

use App\Helpers\Pagination;
use App\Http\Controllers\BaseController;
use App\Http\Requests\AttachmentFile\Company\GetAttachmentFileRequest;
use App\Http\Requests\AttachmentFile\Contact\AttachFileContactRequest;
use App\Http\Resources\AttachmentFile\AttachmentFile as AttachmentFileResources;
use App\Services\AttachmentFile\AttachmentFileContactService;
use Illuminate\Http\JsonResponse;
use App\Commands\AttachmentFile\Contact\SaveAttachedFileContactCommand;
use App\Http\Requests\AttachmentFile\Contact\GetAttachedFilesListRequest;

class AttachmentFileContactController extends BaseController
{
    private AttachmentFileContactService $attachmentFileContactService;

    public function __construct(AttachmentFileContactService $attachmentFileContactService)
    {
        $this->attachmentFileContactService = $attachmentFileContactService;
    }

    /**
     * @OA\Post(
     *     path="/attachment-files/contact",
     *     tags={"Attachment"},
     *     description="Attach new file to contact",
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
    public function store(AttachFileContactRequest $request): JsonResponse
    {
        $file = $this->attachmentFileContactService->saveAttachFile(
            new SaveAttachedFileContactCommand(
                $request->user(),
                $request->file('file'),
                (int) $request->post('id')
            )
        );

        return $this->success([new AttachmentFileResources($file)]);
    }

    /**
     * @OA\Delete(
     *     path="/attachment-files/contact/{id}",
     *     tags={"Attachment"},
     *     description="Delete file ID from contact",
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(ref="#/components/parameters/id"),
     *     @OA\Response(
     *         response="200",
     *         description="Successfully",
     *         @OA\JsonContent(
     *             required={"success", "data"},
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
        $this->attachmentFileContactService->deleteAttachFile((int) $id);

        return $this->success([]);
    }

    /**
     * @OA\Get(
     *     path="/attachment-files/contact",
     *     tags={"Attachment"},
     *     description="Get list attached files to contact ID",
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
     *                  @OA\Items(type="string", ref="#/components/schemas/AttachmentFile")
     *             ),
     *             @OA\Property(property="meta", type="array",
     *                  @OA\Items(type="string", ref="#/components/schemas/Meta")
     *             ),
     *          ),
     *      ),
     *     @OA\Response(response="400", ref="#/components/responses/400"),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     * )
     */
    public function index(
        GetAttachedFilesListRequest $request,
        AttachmentFileContactService $attachmentFileContactService,
        Pagination $pagination
    ): JsonResponse {
        $files = $attachmentFileContactService->getAttachedFilesContact((int) $request->get('id'))
            ->paginate($request->get('limit', 50));

        return $this->success(AttachmentFileResources::collection($files), $pagination->getMeta($files));
    }

    /**
     * @OA\Get(
     *      path="/attachment-files/contact/check-exist",
     *      tags={"Attachment"},
     *      description="Check exist attached file to contact ID",
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
        $file = $this->attachmentFileContactService->getAttachmentFile(
            $request->get('id'),
            $request->get('name')
        );

        return $this->success([new AttachmentFileResources($file)]);
    }
}
