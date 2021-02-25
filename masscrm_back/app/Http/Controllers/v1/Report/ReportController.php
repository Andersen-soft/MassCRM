<?php declare(strict_types=1);

namespace App\Http\Controllers\v1\Report;

use App\Http\Controllers\BaseController;
use App\Repositories\Report\ReportRepository;
use App\Services\Reports\ReportFileService;
use App\Http\Requests\Report\ReportRequest;
use App\Exceptions\Report\ReportException;
use Illuminate\Http\JsonResponse;

class ReportController extends BaseController
{
    public function __construct()
    {
        $this->middleware('permission:downloadReport', ['only' => ['download', 'downloadCount']]);
    }

    /**
     * @OA\Post(
     *    path="/contact/reports/download-count",
     *    tags={"Report"},
     *    description="Counts ids in request",
     *    security={{"bearerAuth":{}}},
          @OA\RequestBody(
     *        required=true,
     *        @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 required={"ids"},
     *                 @OA\Property(property="ids", type="array",
     *                     @OA\Items(type="string")
     *                 ),
     *                 example={
     *                    "ids": {1, 2},
     *                }
     *           )
     *         )
     *      ),
     *     @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(
     *              @OA\Property(property="success", type="boolean", example=true),
     *              @OA\Property(property="data", type="object"),
     *          )
     *     ),
     *     @OA\Response(response="400", ref="#/components/responses/400"),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     * )
     */
    public function downloadCount(ReportRequest $request, ReportRepository $reportRepository): JsonResponse
    {
        $contactsCount = $reportRepository->buildQueryReportCount(
            $request->post('search', []),
            $request->post('ids', []),
        );

        $data = [
            'count' => $contactsCount
        ];

        return $this->success($data);
    }

    /**
     * @OA\Post(
     *    path="/contact/reports/download",
     *    tags={"Report"},
     *    security={{"bearerAuth":{}}},
     *    @OA\RequestBody(
     *      required=true,
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(ref="#/components/schemas/ReportSearchParams")
     *         )
     *     ),
     *     @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(
     *              @OA\Property(property="success", type="boolean", example=true),
     *              @OA\Property(property="data", type="object"),
     *          )
     *     ),
     *     @OA\Response(
     *        response="400",
     *        description="Error: Bad Request",
     *        @OA\JsonContent(
     *            @OA\Property(property="success", type="boolean", example=false),
     *            @OA\Property(property="payload", type="object",
     *                @OA\Property(property="errors", type="object"),
     *            )
     *        )
     *     )
     * )
     * @throws ReportException
     */
    public function download(ReportRequest $request, ReportFileService $reportFileService) : JsonResponse
    {
        $reportFileService->initExport(
            $request->post('listField', []),
            $request->post('search', []),
            $request->post('sort', []),
            $request->post('typeFile', 'csv'),
            $request->user(),
            (bool) $request->get('isInWork', false),
            $request->post('ids', []),
            auth()->guard()->getRequest()->bearerToken(),
        );

        return $this->success([]);
    }
}
