<?php

namespace App\Http\Controllers\Export;

use App\Helpers\Pagination;
use App\Http\Controllers\BaseController;
use App\Http\Requests\Export\ProcessRequest;
use App\Http\Resources\Export\Process as ProcessResources;
use App\Services\Process\ProcessService;
use Illuminate\Http\JsonResponse;

class ProcessController extends BaseController
{
    /**
     * @OA\GET(
     *      path="/export/processes",
     *      tags={"Export processes"},
     *      description="Get list export processes",
     *      security={{"bearerAuth":{}}},
     *      @OA\Parameter(name="page", in="query", required=true,
     *        @OA\Schema(type="integer", example=1)
     *     ),
     *     @OA\Parameter(name="limit", in="query", required=true,
     *        @OA\Schema(type="integer", example=30)
     *     ),
     *     @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(
     *              required={"success", "data"},
     *              @OA\Property(property="success", type="boolean", example=true),
     *              @OA\Property(property="data", type="array",
     *                  @OA\Items(type="object", ref="#/components/schemas/ExportProcess")
     *              ),
     *          ),
     *     ),
     *     @OA\Parameter(name="search", in="query", style="deepObject",
     *         @OA\Schema(type="object",
     *             @OA\Property(property="user", type="string", example="massCrm"),
     *             @OA\Property(property="name", type="string", example="Export blacklist"),
     *             @OA\Property(property="status", type="string", example="done"),
     *             @OA\Property(property="date", type="object",
     *                 @OA\Property(property="min", type="string", format="Y-m-d", example="2020-02-25"),
     *                 @OA\Property(property="max", type="string", format="Y-m-d", example="2020-06-25"),
     *            ),
     *         ),
     *     ),
     *     @OA\Response(response="400", ref="#/components/responses/400"),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     * )
     */
    public function index(
        ProcessRequest $request,
        ProcessService $processService,
        Pagination $pagination
    ): JsonResponse
    {
        $processes = $processService->getListProcessExport(
            $request->get('limit', 5),
            $request->get('search', []),
        );

        return $this->success(ProcessResources::collection($processes), $pagination->getMeta($processes));
    }
}
