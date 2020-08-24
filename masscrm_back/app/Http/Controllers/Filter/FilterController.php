<?php

namespace App\Http\Controllers\Filter;

use App\Commands\Filter\GetFiltersCommand;
use App\Commands\Filter\GetIndustriesFilterCommand;
use App\Http\Controllers\Controller;
use App\Http\Requests\Filter\GetFiltersRequest;
use App\Http\Transformers\Industry\IndustryTransform;

class FilterController extends Controller
{
    /**
     * @OA\Get(
     *      path="/filters/",
     *      tags={"Filter"},
     *      description="Get one or many filters",
     *      security={{"bearerAuth":{}}},
     *      @OA\Parameter(
     *          name="language",
     *          in="query",
     *          @OA\Schema(type="string", enum={"ru", "en"})
     *      ),
     *      @OA\Parameter(
     *          name="filters[]",
     *          in="query",
     *          @OA\Schema(type="array",
     *              @OA\Items(
     *                  type="string",
     *                  enum={
     *                      "column_separator",
     *                      "contacts_type",
     *                      "import_source",
     *                      "fields",
     *                      "genders",
     *                      "company_size",
     *                      "origin",
     *                      "company_type"
     *                  }
     *              )
     *          )
     *      ),
     *      @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(
     *              required={"success", "payload"},
     *              @OA\Property(property="success", type="boolean", example=true),
     *              @OA\Property(property="payload", type="object",
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
    public function index(GetFiltersRequest $request)
    {
        return $this->response(
            $this->dispatchNow(
                new GetFiltersCommand(
                    $request->get('filters', []),
                    $request->get('language', 'en')
                )
            )
        );
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
     *              required={"success", "payload"},
     *              @OA\Property(property="success", type="boolean", example=true),
     *              @OA\Property(property="payload", type="array",
     *                  @OA\Items(type="string", ref="#/components/schemas/Industry")
     *              ),
     *          ),
     *     ),
     *     @OA\Response(response="400", ref="#/components/responses/400"),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     * )
     */
    public function industries()
    {
        return $this->responseTransform(
            $this->dispatchNow(
                new GetIndustriesFilterCommand()
            ),
            new IndustryTransform()
        );
    }
}
