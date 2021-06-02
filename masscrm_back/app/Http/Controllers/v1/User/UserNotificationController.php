<?php declare(strict_types=1);

namespace App\Http\Controllers\v1\User;

use App\Helpers\Pagination;
use App\Http\Controllers\BaseController;
use App\Http\Requests\User\GetUserNotificationListRequest;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\User\Notification as NotificationResources;
use App\Services\User\NotificationService;

class UserNotificationController extends BaseController
{
    /**
     * @OA\Get(
     *     path="/users/notifications",
     *     tags={"User"},
     *     description="Get list notifications users",
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(ref="#/components/parameters/page"),
     *     @OA\Parameter(ref="#/components/parameters/limit"),
     *     @OA\Response(
     *         response="200",
     *         description="Successfully",
     *         @OA\JsonContent(
     *             required={"success", "data"},
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="data", type="array",
     *                  @OA\Items(type="string", ref="#/components/schemas/Notification")
     *             ),
     *         ),
     *    ),
     *    @OA\Response(response="400", ref="#/components/responses/400"),
     *    @OA\Response(response="401", ref="#/components/responses/401"),
     * )
     */
    public function index(
        GetUserNotificationListRequest $request,
        Pagination $pagination,
        NotificationService $notificationService
    ): JsonResponse {
        $notifications = $notificationService->getNotificationList(
            $request->user(),
            $request->get('new')
        )->paginate($request->get('limit', self::DEFAULT_PAGE_LIMIT));

        return $this->success(NotificationResources::collection($notifications), $pagination->getMeta($notifications));
    }

    /**
     * @OA\Get(
     *     path="/users/notifications/{id}",
     *     tags={"User"},
     *     description="Update status notification",
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(
     *         response="200",
     *         description="Successfully",
     *         @OA\JsonContent(
     *             required={"success", "data"},
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="data", type="object", ref="#/components/schemas/Notification")
     *         ),
     *    ),
     *    @OA\Response(response="400", ref="#/components/responses/400"),
     *    @OA\Response(response="401", ref="#/components/responses/401"),
     * )
     */
    public function update(int $id, NotificationService $notificationService): JsonResponse
    {
        $notification = $notificationService->updateStatus($id);

        return $this->success([new NotificationResources($notification)]);
    }
}
