<?php declare(strict_types=1);

namespace App\Http\Controllers\v1\ActivityLog;

use App\Helpers\Pagination;
use App\Http\Controllers\BaseController;
use App\Http\Requests\ActivityLog\ShowActivityLogListRequest;
use App\Http\Resources\ActivityLog\ActivityLog;
use App\Services\ActivityLog\ActivityLogContactService;
use Illuminate\Http\JsonResponse;

class ActivityLogContactController extends BaseController
{
    /**
     * @OA\Get(
     *     path="/activity-log/contact",
     *     tags={"Activity log"},
     *     description="Get list activity log by contact ID",
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(ref="#/components/parameters/page"),
     *     @OA\Parameter(ref="#/components/parameters/limit"),
     *     @OA\Parameter(name="id", in="query", required=true,
     *         @OA\Schema(type="integer", example=5)
     *     ),
     *     @OA\Response(
     *         response="200",
     *         description="Successfully",
     *         @OA\JsonContent(
     *             required={"success", "data", "meta", "errors"},
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="data", type="array",
     *                  @OA\Items(type="string", ref="#/components/schemas/ActivityLog")
     *             ),
     *             @OA\Property(property="meta", type="array",
     *                  @OA\Items(type="string", ref="#/components/schemas/Meta")
     *             ),
     *         ),
     *     ),
     *     @OA\Response(response="400", ref="#/components/responses/400"),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     * )
     * @param ShowActivityLogListRequest $request
     * @param ActivityLogContactService $activityLogContactService
     * @param Pagination $pagination
     * @return JsonResponse
     */
    public function show(
        ShowActivityLogListRequest $request,
        ActivityLogContactService $activityLogContactService,
        Pagination $pagination
    ): JsonResponse {
        $activityLogsContact = $activityLogContactService
            ->getActivityLogContact((int) $request->get('id'),  $request->get('search', []))
            ->paginate($request->get('limit', 50));

        return $this->success(ActivityLog::collection($activityLogsContact), $pagination->getMeta($activityLogsContact));
    }
}
