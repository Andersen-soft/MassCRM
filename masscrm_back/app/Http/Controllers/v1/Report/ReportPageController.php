<?php declare(strict_types=1);

namespace App\Http\Controllers\v1\Report;

use App\Commands\Report\GetReportPageListCommand;
use App\Http\Controllers\BaseController;
use App\Http\Requests\Report\ReportPageRequest;
use App\Helpers\Pagination;
use App\Http\Resources\ReportPage\ReportPageForManager;
use App\Http\Resources\ReportPage\ReportPageForNC;
use App\Services\Reports\ReportPageService;
use Illuminate\Http\JsonResponse;

class ReportPageController extends BaseController
{
    private ReportPageService $reportPageService;

    public function __construct(ReportPageService $reportPageService)
    {
        $this->reportPageService = $reportPageService;
    }

    /**
     * @OA\Get(
     *      path="/report",
     *      tags={"report"},
     *      description="Get contact list",
     *      security={{"bearerAuth":{}}},
     *      @OA\Parameter(ref="#/components/parameters/page"),
     *      @OA\Parameter(ref="#/components/parameters/limit"),
     *      @OA\Parameter(ref="#/components/parameters/contactSearh"),
     *      @OA\Parameter(ref="#/components/parameters/contactSort"),
     *      @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(
     *              required={"success", "data"},
     *              @OA\Property(property="success", type="boolean", example=true),
     *              @OA\Property(property="data", type="array",
     *                  @OA\Items(type="string", ref="#/components/schemas/Contact")
     *              ),
     *              @OA\Property(property="meta", type="array",
     *                  @OA\Items(type="string", ref="#/components/schemas/Meta")
     *              ),
     *          ),
     *      ),
     *     @OA\Response(response="400", ref="#/components/responses/400"),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     * )
     */
    public function index(ReportPageRequest $request, Pagination $pagination)
    {
        $command = new GetReportPageListCommand(
            $request->user(),
            $request->get('search', []),
            $request->get('sort', [])
        );

        $list = $this->reportPageService->getReportList($command)
            ->paginate((int) $request->get('limit', 10));

        foreach ($request->user()->roles as $role) {
            if ($role === 'manager') {
                return $this->success(ReportPageForManager::collection($list), $pagination->getMeta($list));
            }
            if ($role === 'nc1' || 'nc2') {
                return $this->success(ReportPageForNC::collection($list), $pagination->getMeta($list));
            }
        }


    }
}
