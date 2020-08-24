<?php

namespace App\Http\Controllers\User;

use App\Commands\User\Notification\GetUserNotificationListCommand;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\GetUserNotificationListRequest;
use App\Http\Transformers\User\NotificationTransform;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class UserNotificationController extends Controller
{
    /**
     * @OA\Get(
     *     path="/users/notifications",
     *     tags={"User"},
     *     description="Get list notifications users",
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(name="page", in="query", required=true,
     *        @OA\Schema(type="integer", example=1)
     *     ),
     *     @OA\Parameter(name="limit", in="query", required=true,
     *        @OA\Schema(type="integer", example=30)
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
     *                      @OA\Items(type="string", ref="#/components/schemas/Notification")
     *                  ),
     *                  @OA\Property(
     *                      property="first_page_url",
     *                      type="string",
     *                      example="http://localhost/api/users/notifications?page=1"
     *                  ),
     *                  @OA\Property(property="from", type="integer", example=1),
     *                  @OA\Property(property="last_page", type="integer", example=512),
     *                  @OA\Property(
     *                      property="last_page_url",
     *                      type="string",
     *                      example="http://localhost/api/users/notifications?page=512"
     *                  ),
     *                  @OA\Property(
     *                      property="next_page_url",
     *                      type="string",
     *                      example="http://localhost/api/users/notifications?page=2"
     *                  ),
     *                  @OA\Property(
     *                      property="path",
     *                      type="string",
     *                      example="http://localhost/api/users/notifications"
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
    public function index(GetUserNotificationListRequest $request): JsonResponse
    {
        return $this->responseTransform(
            $this->dispatchNow(
                new GetUserNotificationListCommand(
                    Auth::user(),
                    $request->get('limit', 50),
                    $request->get('page', 1)
                )
            ),
            new NotificationTransform()
        );
    }
}
