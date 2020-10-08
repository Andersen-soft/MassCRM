<?php

namespace App\Http\Controllers\Blacklist;

use App\Helpers\Pagination;
use App\Http\Controllers\BaseController;
use App\Http\Requests\Blacklist\CreateBlacklistRequest;
use App\Http\Requests\Blacklist\DestroyBlacklistsRequest;
use App\Http\Requests\Blacklist\GetBlacklistRequest;
use App\Http\Requests\Blacklist\UpdateBlacklistRequest;
use App\Services\Blacklist\BlacklistExportService;
use App\Services\Blacklist\BlacklistService;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\Blacklist\Blacklist as BlacklistResources;

class BlacklistController extends BaseController
{
    /**
     * @OA\Post(
     *      path="/blacklists",
     *      tags={"Blacklist"},
     *      description="Add new emails and domains in blacklist",
     *      security={{"bearerAuth":{}}},
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 required={"domains"},
     *                 @OA\Property(property="domains", type="array",
     *                     @OA\Items(type="string", example="peter@pftech.com")
     *                 ),
     *             )
     *         )
     *      ),
     *      @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(ref="#/components/schemas/Blacklist")
     *      ),
     *     @OA\Response(response="400", ref="#/components/responses/400"),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     * )
     */
    public function store(CreateBlacklistRequest $request, BlacklistService $blacklistService): JsonResponse
    {
        $domains = $blacklistService->addNewDomains($request->get('domains'), $request->user());

        return $this->success(BlacklistResources::collection($domains));
    }

    /**
     * @OA\Put(
     *      path="/blacklists/{id}",
     *      tags={"Blacklist"},
     *      description="Update email and domain in blacklist",
     *      security={{"bearerAuth":{}}},
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 required={"domain"},
     *                 @OA\Property(property="domain", type="string", example="peter@pftech.com")
     *             )
     *         )
     *      ),
     *      @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(ref="#/components/schemas/Blacklist")
     *      ),
     *     @OA\Response(response="400", ref="#/components/responses/400"),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     * )
     */
    public function update(int $id, UpdateBlacklistRequest $request, BlacklistService $blacklistService): JsonResponse
    {
        $domains = $blacklistService->updateDomain($id, $request->get('domain'), $request->user());

        return $this->success(new BlacklistResources($domains));
    }

    /**
     * @OA\Post(
     *      path="/blacklists/delete",
     *      tags={"Blacklist"},
     *      description="Delete list emails and domains from blacklist",
     *      security={{"bearerAuth":{}}},
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 required={"ids"},
     *                 @OA\Property(property="ids", type="array",
     *                     @OA\Items(type="string")
     *                 ),
     *                 example={
     *                    "ids": {1, 2},
     *                }
     *             )
     *         )
     *      ),
     *      @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(
     *              @OA\Property(property="success", type="boolean", example=true),
     *              @OA\Property(property="data", type="object"),
     *          )
     *      ),
     *     @OA\Response(response="400", ref="#/components/responses/400"),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     * )
     */
    public function destroy(DestroyBlacklistsRequest $request, BlacklistService $blacklistService): JsonResponse
    {
        $blacklistService->deleteListDomains($request->get('ids'), $request->user());

        return $this->success([]);
    }

    /**
     * @OA\GET(
     *      path="/blacklists",
     *      tags={"Blacklist"},
     *      description="Get list emails and domains from blacklist",
     *      security={{"bearerAuth":{}}},
     *      @OA\Parameter(name="page", in="query", required=true,
     *        @OA\Schema(type="integer", example=1)
     *     ),
     *     @OA\Parameter(name="limit", in="query", required=true,
     *        @OA\Schema(type="integer", example=30)
     *     ),
     *     @OA\Parameter(name="search", in="query", style="deepObject",
     *         @OA\Schema(type="object",
     *             @OA\Property(property="user", type="string", example="massCrm"),
     *             @OA\Property(property="domain", type="string", example="mass@andr.com"),
     *             @OA\Property(property="date", type="object",
     *                 @OA\Property(property="min", type="string", format="Y-m-d", example="2020-02-25"),
     *                 @OA\Property(property="max", type="string", format="Y-m-d", example="2020-06-25"),
     *            ),
     *         ),
     *     ),
     *      @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(
     *              required={"success", "data"},
     *              @OA\Property(property="success", type="boolean", example=true),
     *              @OA\Property(property="data", type="array",
     *                  @OA\Items(type="object", ref="#/components/schemas/Blacklist")
     *              ),
     *          ),
     *      ),
     *     @OA\Response(response="400", ref="#/components/responses/400"),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     * )
     */
    public function index(
        GetBlacklistRequest $request,
        BlacklistService $blacklistService,
        Pagination $pagination
    ): JsonResponse
    {
        $domains = $blacklistService->getListDomains(
            $request->get('search', []),
            $request->get('sort', []),
            $request->get('limit', 5)
        );

        return $this->success(BlacklistResources::collection($domains), $pagination->getMeta($domains));
    }

    /**
     * @OA\GET(
     *      path="/blacklists/export",
     *      tags={"Blacklist"},
     *      description="Start export list blacklist for database to file",
     *      security={{"bearerAuth":{}}},
     *      @OA\Parameter(name="search", in="query", style="deepObject",
     *          @OA\Schema(type="object",
     *               @OA\Property(property="user", type="string", example="massCrm"),
     *               @OA\Property(property="domain", type="string", example="mass@andr.com"),
     *               @OA\Property(property="date", type="object",
     *                    required={"min", "max"},
     *                  @OA\Property(property="min", type="string", format="Y-m-d", example="2020-02-25"),
     *                  @OA\Property(property="max", type="string", format="Y-m-d", example="2020-06-25"),
     *               ),
     *         ),
     *     ),
     *     @OA\Property(property="sort", type="object",
     *         @OA\Property(property="field_name", type="user"),
     *         @OA\Property(property="type_sort", type="ASC"),
     *     ),
     *     @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(
     *              required={"success", "data"},
     *              @OA\Property(property="success", type="boolean", example=true),
     *              @OA\Property(property="data", type="array",
     *                  @OA\Items(type="object")
     *              ),
     *          ),
     *      ),
     *     @OA\Response(response="400", ref="#/components/responses/400"),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     * )
     */
    public function export(GetBlacklistRequest $request, BlacklistExportService $blacklistExportService): JsonResponse
    {
        $blacklistExportService->initExport(
            $request->get('search', []),
            $request->get('sort', []),
            $request->user()
        );

        return $this->success([]);
    }
}
