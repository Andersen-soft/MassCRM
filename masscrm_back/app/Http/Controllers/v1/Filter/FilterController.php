<?php declare(strict_types=1);

namespace App\Http\Controllers\v1\Filter;

use App\Commands\Filter\GetFiltersCommand;
use App\Commands\Filter\GetIndustriesFilterCommand;
use App\Http\Controllers\BaseController;
use App\Http\Requests\Filter\GetFiltersRequest;
use App\Http\Resources\Company\Industry as IndustryResource;
use Illuminate\Http\JsonResponse;

class FilterController extends BaseController
{
    /**
     * @OA\Get(
     *      path="/filters/",
     *      tags={"Filter"},
     *      description="Get one or many filters",
     *      security={{"bearerAuth":{}}},
     *      @OA\Parameter(name="language", in="query",
     *          @OA\Schema(type="string", enum={"ru", "en"})
     *      ),
     *      @OA\Parameter(name="filters[]", in="query",
     *          @OA\Schema(type="array",
     *              @OA\Items(type="string", enum={"column_separator", "contacts_type", "import_source", "fields",
     *                      "genders", "company_size", "origin", "company_type"
     *                  }
     *              )
     *          )
     *      ),
     *      @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(
     *              required={"success", "data"},
     *              @OA\Property(property="success", type="boolean", example=true),
     *              @OA\Property(property="data", type="object",
     *                  @OA\Property(property="column_separator", type="object",
     *                      @OA\Property(property="semicolon", type="string", example="Semicolon"),
     *                      @OA\Property(property="comma", type="string", example="Comma"),
     *                      @OA\Property(property="space", type="string", example="Space"),
     *                      @OA\Property(property="tab", type="string", example="Tab"),
     *                  ),
     *                  @OA\Property(property="genders", type="object",
     *                      @OA\Property(property="f", type="string", example="Female"),
     *                      @OA\Property(property="m", type="string", example="Male"),
     *                  ),
     *              ),
     *          ),
     *     ),
     *     @OA\Response(response="400", ref="#/components/responses/400"),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     * )
     */
    public function index(GetFiltersRequest $request): JsonResponse
    {
        $data = $this->dispatchNow(
            new GetFiltersCommand(
                $request->get('filters', []),
                $request->get('language', 'en')
            )
        );

        return $this->success($data);
    }

    /**
     * @OA\Get(
     *      path="/filters/industries",
     *      tags={"Filter"},
     *      description="Get industry filter",
     *      security={{"bearerAuth":{}}},
     *      @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(
     *              required={"success", "data"},
     *              @OA\Property(property="success", type="boolean", example=true),
     *              @OA\Property(property="data", type="array",
     *                  @OA\Items(type="string", ref="#/components/schemas/Industry")
     *              ),
     *          ),
     *     ),
     *     @OA\Response(response="400", ref="#/components/responses/400"),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     * )
     */
    public function industries(): JsonResponse
    {
        $industries = $this->dispatchNow(new GetIndustriesFilterCommand());

        return $this->success(IndustryResource::collection($industries));
    }
}
