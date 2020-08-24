<?php

namespace App\Http\Controllers\ActivityLog;

use App\Commands\ActivityLog\Contact\ShowActivityLogContactCommand;
use App\Http\Controllers\Controller;
use App\Http\Requests\ActivityLog\ShowActivityLogListRequest;
use App\Http\Transformers\ActivityLog\ActivityLogTransform;

class ActivityLogContactController extends Controller
{
    /**
     * @OA\Get(
     *     path="/activity-log/contact",
     *     tags={"Activity log"},
     *     description="Get list activity log to contact ID",
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
     *                      @OA\Items(type="string", ref="#/components/schemas/ActivityLog")
     *                  ),
     *                  @OA\Property(
     *                      property="first_page_url",
     *                      type="string",
     *                      example="http://localhost/api/activity-log/contact?page=1"
     *                  ),
     *                  @OA\Property(property="from", type="integer", example=1),
     *                  @OA\Property(property="last_page", type="integer", example=512),
     *                  @OA\Property(
     *                      property="last_page_url",
     *                      type="string",
     *                      example="http://localhost/api/activity-log/contact?page=512"
     *                  ),
     *                  @OA\Property(
     *                      property="next_page_url",
     *                      type="string",
     *                      example="http://localhost/api/activity-log/contact?page=2"
     *                  ),
     *                  @OA\Property(
     *                      property="path",
     *                      type="string",
     *                      example="http://localhost/api/activity-log/contact"
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
    public function show(ShowActivityLogListRequest $request)
    {
        return $this->responseTransform(
            $this->dispatchNow(
                new ShowActivityLogContactCommand(
                    $request->get('id'),
                    $request->get('page', 1),
                    $request->get('limit', 50)
                )
            ),
            new ActivityLogTransform()
        );
    }
}
