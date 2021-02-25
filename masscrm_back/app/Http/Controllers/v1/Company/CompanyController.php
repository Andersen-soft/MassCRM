<?php

declare(strict_types=1);

namespace App\Http\Controllers\v1\Company;

use App\Commands\Company\CreateCompanyCommand;
use App\Commands\Company\DestroyManyCompanyCommand;
use App\Commands\Company\GetCompanyCommand;
use App\Commands\Company\UpdateCompanyCommand;
use App\Helpers\Pagination;
use App\Http\Controllers\BaseController;
use App\Http\Requests\Company\CreateCompanyRequest;
use App\Http\Requests\Company\GetCompanyListRequest;
use App\Http\Requests\Company\UpdateCompanyRequest;
use App\Http\Requests\DestroyManyRequest;
use App\Models\Company\Company;
use App\Services\Company\CompanyService;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\Company\Company as CompanyResources;

class CompanyController extends BaseController
{
    private CompanyService $companyService;

    public function __construct(CompanyService $companyService)
    {
        $this->middleware('permission:createCompany', ['only' => ['store']]);
        $this->middleware('permission:deleteCompanyById', ['only' => ['destroy']]);
        $this->middleware('permission:deleteListCompanies', ['only' => ['destroyMany']]);
        $this->middleware('permission:showCompanyById', ['only' => ['show']]);
        $this->middleware('permission:updateCompany', ['only' => ['update']]);
        $this->middleware('permission:getListCompanies', ['only' => ['index']]);
        $this->companyService = $companyService;
    }

    /**
     * @OA\Post(
     *      path="/companies",
     *      tags={"Company"},
     *      description="Create company",
     *      security={{"bearerAuth":{}}},
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(ref="#/components/schemas/ParamsCompanyCreate")
     *         )
     *     ),
     *     @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(
     *              required={"success", "data"},
     *              @OA\Property(property="success", type="boolean", example=true),
     *              @OA\Property(property="data", type="object", ref="#/components/schemas/Company"),
     *          ),
     *     ),
     *     @OA\Response(response="400", ref="#/components/responses/400"),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     * )
     */
    public function store(CreateCompanyRequest $request): JsonResponse
    {
        $companyCommand = new CreateCompanyCommand(
            $this->getCompanyFields($request->toArray()),
            $request->user(),
            $request->get('industries', []),
            $request->get('vacancies', []),
            $request->get('subsidiaries', [])
        );

        $savedCompany = $this->companyService->saveCompany($companyCommand);
        return $this->success([new CompanyResources($savedCompany)]);
    }

    private function getCompanyFields(array $request): array
    {
        $companyFields = [];
        $company = new Company();
        foreach ($request as $key => $value) {
            if ($company->isField($key)) {
                if (!empty($value) && in_array($key, [Company::WEBSITE_FIELD, Company::LINKEDIN_FIELD])) {
                    $value = strtolower($value);
                }
                $companyFields[$key] = $value;
            }
        }

        return $companyFields;
    }

    /**
     * @OA\Delete(
     *      path="/companies/{id}",
     *      tags={"Company"},
     *      description="Delete company by id",
     *      security={{"bearerAuth":{}}},
     *      @OA\Parameter(ref="#/components/parameters/id"),
     *      @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(
     *              @OA\Property(property="success", type="boolean", example=true),
     *              @OA\Property(property="data", type="object"),
     *          )
     *      ),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     * )
     */
    public function destroy(Company $company)
    {
        $company->delete();

        return $this->success([]);
    }

    /**
     * @OA\Post(
     *      path="/companies/delete-list",
     *      tags={"Company"},
     *      description="Delete company by list id",
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
    public function destroyMany(DestroyManyRequest $request): JsonResponse
    {
        $companyIds = new DestroyManyCompanyCommand($request->get('ids'));

        return $this->success([$this->companyService->deleteCompanies($companyIds->getIds())]);
    }

    /**
     * @OA\GET(
     *      path="/companies/{id}/contacts",
     *      tags={"Company"},
     *      description="Get company by id",
     *      security={{"bearerAuth":{}}},
     *      @OA\Parameter(ref="#/components/parameters/id"),
     *      @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(
     *              required={"success", "data"},
     *              @OA\Property(property="success", type="boolean", example=true),
     *              @OA\Property(property="data", type="object", ref="#/components/schemas/Company"),
     *          ),
     *      ),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     *     @OA\Response(response="404", ref="#/components/responses/404"),
     * )
     */
    public function show(int $id, $contacts = null): JsonResponse
    {
        $withContacts = $contacts === 'contacts';
        $company = $this->companyService->getCompany((new GetCompanyCommand((int)$id))->getContactId(), $withContacts);

        return $this->success([new CompanyResources($company)]);
    }

    /**
     * @OA\Put(
     *      path="/companies/{id}",
     *      tags={"Company"},
     *      description="Update company by id",
     *      security={{"bearerAuth":{}}},
     *      @OA\Parameter(ref="#/components/parameters/id"),
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(ref="#/components/schemas/ParamsCompanyUpdate")
     *         )
     *     ),
     *     @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(
     *              required={"success", "data"},
     *              @OA\Property(property="success", type="boolean", example=true),
     *              @OA\Property(property="data", type="object", ref="#/components/schemas/Company"),
     *          ),
     *     ),
     *     @OA\Response(response="400", ref="#/components/responses/400"),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     * )
     */
    public function update(UpdateCompanyRequest $request, int $id): JsonResponse
    {
        $companyCommand = new UpdateCompanyCommand(
            $id,
            $this->getCompanyFields($request->toArray()),
            $request->get('industries', []),
            $request->get('vacancies'),
            $request->get('subsidiaries'),
            $request->user()
        );

        $company = $this->companyService->updateCompany($companyCommand);

        return $this->success([new CompanyResources($company)]);
    }

    /**
     * @OA\Get(
     *      path="/companies",
     *      tags={"Company"},
     *      description="Get contact list",
     *      security={{"bearerAuth":{}}},
     *      @OA\Parameter(ref="#/components/parameters/page"),
     *      @OA\Parameter(ref="#/components/parameters/limit"),
     *      @OA\Parameter(ref="#/components/parameters/ParamsCompanySearch"),
     *      @OA\Parameter(ref="#/components/parameters/ParamsCompanySort"),
     *      @OA\Parameter(name="mode", in="query", required=false,
     *          @OA\Schema(type="string", enum={"all"})
     *      ),
     *      @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(
     *              required={"success", "data"},
     *              @OA\Property(property="success", type="boolean", example=true),
     *              @OA\Property(property="data", type="array",
     *                  @OA\Items(type="string", ref="#/components/schemas/Company")
     *              ),
     *              @OA\Property(property="meta", type="array",
     *                  @OA\Items(type="string", ref="#/components/schemas/Meta")
     *              ),
     *          ),
     *     ),
     *     @OA\Response(response="400", ref="#/components/responses/400"),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     * )
     */
    public function index(
        GetCompanyListRequest $request,
        CompanyService $companyService,
        Pagination $pagination
    ): JsonResponse {
        $companies = $companyService->fetchListCompanies(
            $request->get('search', []),
            $request->get('sort', [])
        )->paginate($request->get('limit', 10));

        return $this->success(CompanyResources::collection($companies), $pagination->getMeta($companies));
    }
}
