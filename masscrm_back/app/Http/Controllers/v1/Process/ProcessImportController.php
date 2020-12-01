<?php

declare(strict_types=1);

namespace App\Http\Controllers\v1\Process;

use App\Helpers\Pagination;
use App\Http\Controllers\BaseController;
use App\Http\Requests\Process\ProcessRequest;
use App\Http\Resources\Process\Process as ProcessResources;
use App\Services\Process\ProcessService;
use Illuminate\Http\JsonResponse;

class ProcessImportController extends BaseController
{
    /**
     * @OA\GET(
     *      path="/processes/import",
     *      tags={"Export and Import processes"},
     *      description="Get list import processes",
     *      security={{"bearerAuth":{}}},
     *      @OA\Parameter(ref="#/components/parameters/page"),
     *      @OA\Parameter(ref="#/components/parameters/limit"),
     *      @OA\Parameter(name="search", in="query", style="deepObject",
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
     *     @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(
     *              required={"success", "data"},
     *              @OA\Property(property="success", type="boolean", example=true),
     *              @OA\Property(property="data", type="array",
     *                  @OA\Items(type="object", ref="#/components/schemas/Process")
     *              ),
     *          ),
     *     ),
     *     @OA\Response(response="400", ref="#/components/responses/400"),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     * )
     */
    public function __invoke(
        ProcessRequest $request,
        ProcessService $processService,
        Pagination $pagination
    ): JsonResponse {
        $processes = $processService->getListProcessImport(
            $request->get('search', []),
            $request->user()
        )->paginate($request->get('limit', 10));

        return $this->success(ProcessResources::collection($processes), $pagination->getMeta($processes));
    }
}
