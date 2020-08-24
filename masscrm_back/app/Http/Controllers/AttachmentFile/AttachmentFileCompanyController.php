<?php

namespace App\Http\Controllers\AttachmentFile;

use App\Commands\AttachmentFile\Company\{
    SaveAttachedFileCompanyCommand,
    DeleteAttachmentFileCompanyCommand,
    GetAttachedFileListCompanyCommand,
    CheckExistAttachmentFileCompanyCommand
};

use App\Http\Requests\AttachmentFile\{
    AttachFileRequest,
    CheckExistAttachmentFileRequest,
    GetAttachedFilesListRequest
};

use App\Http\Controllers\Controller;
use App\Http\Transformers\AttachmentFile\Company\FileCompanyTransform;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class AttachmentFileCompanyController extends Controller
{
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
     *              @OA\Property(property="payload", type="object", ref="#/components/schemas/FileCompany")
     *          )
     *     ),
     *     @OA\Response(response="400", ref="#/components/responses/400"),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     * )
     */
    public function store(AttachFileRequest $request): JsonResponse
    {
        return $this->responseTransform(
            $this->dispatchNow(
                new SaveAttachedFileCompanyCommand(
                    Auth::user(),
                    $request->file('file'),
                    $request->post('id')
                )
            ),
            new FileCompanyTransform()
        );
    }

    /**
     * @OA\Delete(
     *     path="/attachment-files/company/{id}",
     *     tags={"Attachment"},
     *     description="Delete file ID from company",
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
    public function destroy($id): JsonResponse
    {
        return $this->response(
            $this->dispatchNow(
                new DeleteAttachmentFileCompanyCommand(
                    Auth::user(),
                    (int) $id
                )
            ) ?? []
        );
    }

    /**
     * @OA\Get(
     *     path="/attachment-files/company",
     *     tags={"Attachment"},
     *     description="Get list attached files to company ID",
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
     *                      @OA\Items(type="string", ref="#/components/schemas/FileCompany")
     *                  ),
     *                  @OA\Property(
     *                      property="first_page_url",
     *                      type="string",
     *                      example="http://localhost/api/attachment-files/company?page=1"
     *                  ),
     *                  @OA\Property(property="from", type="integer", example=1),
     *                  @OA\Property(property="last_page", type="integer", example=512),
     *                  @OA\Property(
     *                      property="last_page_url",
     *                      type="string",
     *                      example="http://localhost/api/attachment-files/company?page=512"
     *                  ),
     *                  @OA\Property(
     *                      property="next_page_url",
     *                      type="string",
     *                      example="http://localhost/api/attachment-files/company?page=2"
     *                  ),
     *                  @OA\Property(
     *                      property="path",
     *                      type="string",
     *                      example="http://localhost/api/attachment-files/company"
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
    public function index(GetAttachedFilesListRequest $request): JsonResponse
    {
        return $this->responseTransform(
            $this->dispatchNow(
                new GetAttachedFileListCompanyCommand(
                    $request->get('id'),
                    $request->get('page', 1),
                    $request->get('limit', 50)
                )
            ),
            new FileCompanyTransform()
        );
    }

    /**
     * @OA\Get(
     *      path="/attachment-files/company/check-exist",
     *      tags={"Attachment"},
     *      description="Check exist attached file to company ID",
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
     *              @OA\Property(property="payload", type="object", ref="#/components/schemas/FileCompany")
     *          )
     *      ),
     *      @OA\Response(response="400", ref="#/components/responses/400"),
     *      @OA\Response(response="401", ref="#/components/responses/401"),
     * )
     */
    public function checkExistFile(CheckExistAttachmentFileRequest $request): JsonResponse
    {
        return $this->responseTransform(
            $this->dispatchNow(
                new CheckExistAttachmentFileCompanyCommand(
                    $request->get('id'),
                    $request->get('name')
                )
            ),
            new FileCompanyTransform()
        );
    }
}
