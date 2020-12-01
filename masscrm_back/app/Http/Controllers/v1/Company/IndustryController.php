<?php

declare(strict_types=1);

namespace App\Http\Controllers\v1\Company;

use App\Http\Controllers\BaseController;
use App\Http\Requests\Company\CreateIndustryRequest;
use App\Http\Resources\Company\Industry as IndustryResources;
use App\Services\Industry\IndustryService;
use Illuminate\Http\JsonResponse;

class IndustryController extends BaseController
{
    /**
     * @OA\Post(
     *      path="/industries",
     *      tags={"Industries"},
     *      description="Create new Industry",
     *      security={{"bearerAuth":{}}},
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 required={"name"},
     *                 @OA\Property(property="name", type="string", example="Banking"),
     *             )
     *         )
     *      ),
     *      @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(ref="#/components/schemas/Industry")
     *      ),
     *     @OA\Response(response="400", ref="#/components/responses/400"),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     * )
     */
    public function store(CreateIndustryRequest $request, IndustryService $industryService): JsonResponse
    {
        $industry = $industryService->saveIndustry($request->post('name'));

        return $this->success([new IndustryResources($industry)]);
    }
}
