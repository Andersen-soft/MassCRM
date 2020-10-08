<?php

namespace App\Http\Controllers\AttachmentFile;

use App\Helpers\Pagination;
use App\Http\Controllers\BaseController;
use App\Http\Resources\AttachmentFile\AttachmentFile as AttachmentFileResources;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

use App\Commands\AttachmentFile\Contact\{
    CheckExistAttachmentFileContactCommand,
    SaveAttachedFileContactCommand,
    DeleteAttachmentFileContactCommand,
    GetAttachedFileListContactCommand
};

use App\Http\Requests\AttachmentFile\{
    AttachFileRequest,
    GetAttachedFilesListRequest,
    CheckExistAttachmentFileRequest
};

class AttachmentFileContactController extends BaseController
{
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
     *                 required={
     *                     "id", "file"
     *                 },
     *                 @OA\Property(property="id", type="int", example=13),
     *                 @OA\Property(property="file", type="string", format="binary"),
     *             )
     *         )
     *      ),
     *      @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(
     *              required={"success", "payload"},
     *              @OA\Property(property="success", type="boolean", example=true),
     *              @OA\Property(property="payload", type="object", ref="#/components/schemas/FileContact")
     *          )
     *     ),
     *     @OA\Response(response="400", ref="#/components/responses/400"),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     * )
     */
    public function store(AttachFileRequest $request): JsonResponse
    {
        $file = $this->dispatchNow(
            new SaveAttachedFileContactCommand(
                $request->user(),
                $request->file('file'),
                $request->post('id')
            )
        );

        return $this->success(new AttachmentFileResources($file));
    }

    /**
     * @OA\Delete(
     *     path="/attachment-files/contact/{id}",
     *     tags={"Attachment"},
     *     description="Delete file ID from contact",
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *      ),
     *      @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(
     *              @OA\Property(property="success", type="boolean", example=true),
     *              @OA\Property(property="payload", type="object"),
     *          )
     *      ),
     *  @OA\Response(response="401", ref="#/components/responses/401"),
     *  @OA\Response(response="404", ref="#/components/responses/404"),
     * )
     */
    public function destroy($id, Request $request): JsonResponse
    {
        return $this->success(
            $this->dispatchNow(
                new DeleteAttachmentFileContactCommand(
                    $request->user(),
                    (int)$id
                )
            ) ?? []
        );
    }

    /**
     * @OA\Get(
     *     path="/attachment-files/contact",
     *     tags={"Attachment"},
     *     description="Get list attached files to contact ID",
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(name="page", in="query", required=true,
     *        @OA\Schema(type="integer", example=1)
     *     ),
     *     @OA\Parameter(name="limit", in="query", required=true,
     *        @OA\Schema(type="integer", example=30)
     *     ),
     *     @OA\Parameter(name="id", in="query", required=true,
     *        @OA\Schema(type="integer", example=5)
     *     ),
     *     @OA\Response(
     *         response="200",
     *         description="Successfully",
     *         @OA\JsonContent(
     *             required={"success", "payload"},
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="payload", type="object",
     *                 required={"current_page", "data", "first_page_url", "from", "last_page",
     *                 "last_page_url", "next_page_url", "path", "per_page", "prev_page_url",
     *                 "to", "total"},
     *                 @OA\Property(property="current_page", type="integer", example=1),
     *                 @OA\Property(property="data", type="array",
     *                      @OA\Items(type="string", ref="#/components/schemas/FileContact")
     *                  ),
     *                  @OA\Property(
     *                      property="first_page_url",
     *                      type="string",
     *                      example="http://localhost/api/attachment-files/contact?page=1"
     *                  ),
     *                  @OA\Property(property="from", type="integer", example=1),
     *                  @OA\Property(property="last_page", type="integer", example=512),
     *                  @OA\Property(
     *                      property="last_page_url",
     *                      type="string",
     *                      example="http://localhost/api/attachment-files/contact?page=512"
     *                  ),
     *                  @OA\Property(
     *                      property="next_page_url",
     *                      type="string",
     *                      example="http://localhost/api/attachment-files/contact?page=2"
     *                  ),
     *                  @OA\Property(
     *                      property="path",
     *                      type="string",
     *                      example="http://localhost/api/attachment-files/contact"
     *                  ),
     *                  @OA\Property(property="per_page", type="integer", example=50),
     *                  @OA\Property(property="prev_page_url", example="null"),
     *                  @OA\Property(property="to", type="integer", example=50),
     *                  @OA\Property(property="total", type="integer", example=25566),
     *              ),
     *          ),
     *      ),
     *     @OA\Response(response="400", ref="#/components/responses/400"),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     * )
     */
    public function index(GetAttachedFilesListRequest $request, Pagination $pagination): JsonResponse
    {
        $files = $this->dispatchNow(
            new GetAttachedFileListContactCommand(
                $request->get('id'),
                $request->get('page', 1),
                $request->get('limit', 50)
            )
        );

        return $this->success(AttachmentFileResources::collection($files), $pagination->getMeta($files));
    }

    /**
     * @OA\Get(
     *      path="/attachment-files/contact/check-exist",
     *      tags={"Attachment"},
     *      description="Check exist attached file to contact ID",
     *      security={{"bearerAuth":{}}},
     *      @OA\Parameter(
     *          name="id",
     *          in="query",
     *          required=true,
     *          @OA\Schema(type="integer")
     *      ),
     *      @OA\Parameter(
     *          name="name",
     *          in="query",
     *          required=true,
     *          @OA\Schema(type="string")
     *      ),
     *     @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(
     *              required={"success", "payload"},
     *              @OA\Property(property="success", type="boolean", example=true),
     *              @OA\Property(property="payload", type="object", ref="#/components/schemas/FileContact")
     *          )
     *      ),
     *      @OA\Response(response="400", ref="#/components/responses/400"),
     *      @OA\Response(response="401", ref="#/components/responses/401"),
     * )
     */
    public function checkExistFile(CheckExistAttachmentFileRequest $request): JsonResponse
    {
        $file = $this->dispatchNow(
            new CheckExistAttachmentFileContactCommand(
                $request->get('id'),
                $request->get('name')
            )
        );

        return $this->success(new AttachmentFileResources($file));
    }
}
