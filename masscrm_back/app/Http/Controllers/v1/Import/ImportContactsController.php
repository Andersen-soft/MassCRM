<?php declare(strict_types=1);

namespace App\Http\Controllers\v1\Import;

use App\Commands\Import\ImportContactsCommand;
use App\Commands\Import\ImportStartParseCommand;
use App\Http\Controllers\BaseController;
use App\Http\Requests\Import\ImportLoadingFileRequest;
use App\Http\Requests\Import\ImportStartParsingRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Services\Process\ProcessService;
use App\Services\Import\ImportService;
use App\Http\Resources\Import\Statistic;
use App\Http\Requests\Import\ImportStatisticRequest;

class ImportContactsController extends BaseController
{
    private ImportService $importService;

    public function __construct(ImportService $importService)
    {
        $this->importService = $importService;
    }

    /**
     * @OA\Post(
     *      path="/import/upload-file/",
     *      tags={"Import"},
     *      description="Upload file for import contact",
     *      security={{"bearerAuth":{}}},
     *      @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                  required={"file"},
     *                  @OA\Property(property="file", type="file"),
     *             ),
     *         ),
     *      ),
     *      @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(
     *              required={"success", "data"},
     *              @OA\Property(property="success", type="boolean", example=true),
     *              @OA\Property(property="data", type="object", ref="#/components/schemas/ImportUploadFile")
     *          ),
     *     ),
     *     @OA\Response(response="400", ref="#/components/responses/400"),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     * )
     */
    public function uploadFile(ImportLoadingFileRequest $request): JsonResponse
    {
        $data = new ImportContactsCommand($request->file('file'), $request->user());

        return $this->success($this->importService->uploadFile($data));
    }

    /**
     * @OA\Post(
     *      path="/import/start-parse/",
     *      tags={"Import"},
     *      description="Configurate and start parsing process",
     *      security={{"bearerAuth":{}}},
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(type="object", ref="#/components/schemas/ParamsStartImport")
     *         )
     *      ),
     *      @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(
     *              @OA\Property(property="success", type="boolean", example=true),
     *              @OA\Property(property="data", type="object"),
     *          )
     *     ),
     *     @OA\Response(response="400", ref="#/components/responses/400"),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     *     @OA\Response(response="404", ref="#/components/responses/404"),
     * )
     */
    public function startParse(ImportStartParsingRequest $request): JsonResponse
    {
        $data = new ImportStartParseCommand(
            $request->user(),
            $request->get('fields'),
            $request->get('origin', []),
            (int) $request->get('responsible'),
            (bool) $request->get('is_headers'),
            $request->get('duplication_action'),
            $request->get('column_separator'),
            auth()->guard()->getRequest()->bearerToken(),
            $request->get('comment')
        );

        $this->importService->startParse($data);

        return $this->success([$data]);
    }

    /**
     * @OA\GET(
     *     path="/import/status",
     *     tags={"Import"},
     *     description="Fetch there is processes import from user",
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(
     *         response="200",
     *         description="Successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *                 @OA\Property(property="data", type="object",
     *                     @OA\Property(property="process", type="boolean", example="true"),
     *                )
     *         )
     *     ),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     * )
     */
    public function getStatus(Request $request, ProcessService $processService): JsonResponse
    {
        return $this->success([
            'process' => $processService->isProcessImport($request->user())
        ]);
    }

    /**
     * @OA\GET(
     *     path="/import/statistic",
     *     tags={"Import"},
     *     description="Fetch statistic import",
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(name="id", in="query", required=true,
     *        @OA\Schema(type="integer", example=1)
     *     ),
     *     @OA\Response(
     *         response="200",
     *         description="Successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="data", type="object", ref="#/components/schemas/StatisticImport")
     *         )
     *     ),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     * )
     */
    public function getStatisticImport(ImportStatisticRequest $request, ImportService $importService): JsonResponse
    {
        $result = $importService->getStatisticImport((int) $request->get('id'));

        return $this->success([new Statistic($result)]);
    }
}
