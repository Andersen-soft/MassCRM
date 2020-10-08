<?php

namespace App\Http\Controllers\Company;

use App\Commands\Company\CreateCompanyCommand;
use App\Commands\Company\DestroyCompanyCommand;
use App\Commands\Company\DestroyManyCompanyCommand;
use App\Commands\Company\GetCompanyCommand;
use App\Commands\Company\GetCompanyListCommand;
use App\Commands\Company\UpdateCompanyCommand;
use App\Helpers\Pagination;
use App\Http\Controllers\BaseController;
use App\Http\Requests\Company\CreateCompanyRequest;
use App\Http\Requests\Company\GetCompanyListRequest;
use App\Http\Requests\Company\UpdateCompanyRequest;
use App\Http\Requests\DestroyManyRequest;
use App\Models\Company\Company;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\Company\Company as CompanyResources;

class CompanyController extends BaseController
{
    public function __construct()
    {
        $this->middleware('permission:createCompany', ['only' => ['store']]);
        $this->middleware('permission:deleteCompanyById', ['only' => ['destroy']]);
        $this->middleware('permission:deleteListCompanies', ['only' => ['destroyMany']]);
        $this->middleware('permission:showCompanyById', ['only' => ['show']]);
        $this->middleware('permission:updateCompany', ['only' => ['update']]);
        $this->middleware('permission:getListCompanies', ['only' => ['index']]);
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
     *             @OA\Schema(
     *                 required={"name"},
     *                 @OA\Property(property="name", type="string"),
     *                 @OA\Property(property="website", type="string"),
     *                 @OA\Property(property="linkedin", type="string"),
     *                 @OA\Property(property="sto_full_name", type="string"),
     *                 @OA\Property(property="type", type="string"),
     *                 @OA\Property(property="founded", type="string", format="d.m.Y"),
     *                 @OA\Property(property="min_employees", type="integer"),
     *                 @OA\Property(property="max_employees", type="integer"),
     *                 @OA\Property(property="comment", type="string"),
     *                 @OA\Property(property="industries", type="array",
     *                     @OA\Items(type="integer")
     *                 ),
     *                 @OA\Property(property="subsidiaries", type="array",
     *                     @OA\Items(type="integer")
     *                 ),
     *                 @OA\Property(property="vacancies", type="array",
     *                     @OA\Items(type="object",
     *                          required={"job", "skills", "link"},
     *                          @OA\Property(property="job", type="string"),
     *                          @OA\Property(property="skills", type="string"),
     *                          @OA\Property(property="link", type="string"),
     *                     ),
     *                 ),
     *                 example={
     *                    "name": "name",
     *                    "website": "http://www.walvisnest.nl",
     *                    "linkedin": "https://www.linkedin.com/company/22891",
     *                    "sto_full_name": "Angelas",
     *                    "type": "Subsidiary",
     *                    "founded": "18.06.2020",
     *                    "min_employees": 1,
     *                    "max_employees": 50,
     *                    "comment": "It's good company",
     *                    "industries": {151, 156},
     *                    "subsidiaries": {15666, 17822},
     *                    "vacancies": {
     *                         {
     *                             "job": "Install docker",
     *                             "skills": "Solid",
     *                             "link": "https://vitebsk.jobs.tut.by"
     *                         }
     *                    },
     *                }
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(
     *              required={"success", "payload"},
     *              @OA\Property(property="success", type="boolean", example=true),
     *              @OA\Property(property="payload", type="object", ref="#/components/schemas/Company"),
     *          ),
     *     ),
     *     @OA\Response(response="400", ref="#/components/responses/400"),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     * )
     */
    public function store(CreateCompanyRequest $request): JsonResponse
    {
        $company = $this->dispatchNow(
            new CreateCompanyCommand(
                $this->getCompanyFields($request->toArray()),
                $request->user(),
                $request->get('industries', []),
                $request->get('vacancies', []),
                $request->get('subsidiaries', [])
            )
        );

        return $this->success(new CompanyResources($company));
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
     *      @OA\Parameter(
     *          name="id",
     *          in="path",
     *          required=true,
     *          @OA\Schema(type="integer")
     *      ),
     *      @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(
     *              @OA\Property(property="success", type="boolean", example=true),
     *              @OA\Property(property="payload", type="object"),
     *          )
     *      ),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     * )
     */
    public function destroy($id): JsonResponse
    {
        return $this->success($this->dispatchNow(new DestroyCompanyCommand((int)$id)) ?? []);
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
     *              @OA\Property(property="payload", type="object"),
     *          )
     *      ),
     *     @OA\Response(response="400", ref="#/components/responses/400"),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     * )
     */
    public function destroyMany(DestroyManyRequest $request): JsonResponse
    {
        return $this->success($this->dispatchNow(new DestroyManyCompanyCommand($request->get('ids'))) ?? []);
    }

    /**
     * @OA\Get(
     *      path="/companies/{id}",
     *      tags={"Company"},
     *      description="Get company by id",
     *      security={{"bearerAuth":{}}},
     *      @OA\Parameter(
     *          name="id",
     *          in="path",
     *          required=true,
     *          @OA\Schema(type="integer")
     *      ),
     *      @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(
     *              required={"success", "payload"},
     *              @OA\Property(property="success", type="boolean", example=true),
     *              @OA\Property(property="payload", type="object", ref="#/components/schemas/Company"),
     *          ),
     *      ),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     *     @OA\Response(response="404", ref="#/components/responses/404"),
     * )
     */
    public function show($id)
    {
        $company = $this->dispatchNow(new GetCompanyCommand((int)$id));

        return $this->success(new CompanyResources($company));
    }

    /**
     * @OA\Put(
     *      path="/companies/{id}",
     *      tags={"Company"},
     *      description="Update company by id",
     *      security={{"bearerAuth":{}}},
     *      @OA\Parameter(
     *          name="id",
     *          in="path",
     *          required=true,
     *          @OA\Schema(type="integer")
     *      ),
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(property="name", type="string"),
     *                 @OA\Property(property="website", type="string"),
     *                 @OA\Property(property="linkedin", type="string"),
     *                 @OA\Property(property="sto_full_name", type="string"),
     *                 @OA\Property(property="type", type="string"),
     *                 @OA\Property(property="founded", type="string", format="d.m.Y"),
     *                 @OA\Property(property="min_employees", type="integer"),
     *                 @OA\Property(property="max_employees", type="integer"),
     *                 @OA\Property(property="comment", type="string"),
     *                 @OA\Property(property="industries", type="array",
     *                     @OA\Items(type="integer")
     *                 ),
     *                 @OA\Property(property="subsidiaries", type="array",
     *                     @OA\Items(type="integer")
     *                 ),
     *                 @OA\Property(property="vacancies", type="array",
     *                     @OA\Items(type="object",
     *                          required={"job", "skills", "link"},
     *                          @OA\Property(property="id", type="integer"),
     *                          @OA\Property(property="job", type="string"),
     *                          @OA\Property(property="skills", type="string"),
     *                          @OA\Property(property="link", type="string"),
     *                     ),
     *                 ),
     *                 example={
     *                    "name": "name",
     *                    "website": "http://www.walvisnest.nl",
     *                    "linkedin": "https://www.linkedin.com/company/22891",
     *                    "sto_full_name": "Angelas",
     *                    "type": "Subsidiary",
     *                    "founded": "18.06.2020",
     *                    "min_employees": 1,
     *                    "max_employees": 50,
     *                    "comment": "It's good company",
     *                    "industries": {151, 156},
     *                    "subsidiaries": {15666, 17822},
     *                    "vacancies": {
     *                         {
     *                              "job": "Install docker",
     *                              "skills": "Solid",
     *                              "link": "https://jobs.tut.by"
     *                         },
     *                         {
     *                              "id": 1,
     *                              "job": "Install docker",
     *                              "skills": "Solid",
     *                              "link": "https://jobs.tut.by"
     *                         }
     *                    },
     *                }
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(
     *              required={"success", "payload"},
     *              @OA\Property(property="success", type="boolean", example=true),
     *              @OA\Property(property="payload", type="object", ref="#/components/schemas/Company"),
     *          ),
     *     ),
     *     @OA\Response(response="400", ref="#/components/responses/400"),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     * )
     */
    public function update(UpdateCompanyRequest $request, $id)
    {
        $company = $this->dispatchNow(
            new UpdateCompanyCommand(
                (int)$id,
                $this->getCompanyFields($request->toArray()),
                $request->get('industries', []),
                $request->get('vacancies'),
                $request->get('subsidiaries'),
                $request->user()
            )
        );

        return $this->success(new CompanyResources($company));
    }

    /**
     * @OA\Get(
     *      path="/companies",
     *      tags={"Company"},
     *      description="Get contact list",
     *      security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *          name="page",
     *          in="query",
     *          required=false,
     *          description="Current page",
     *          @OA\Schema(type="integer")
     *      ),
     *     @OA\Parameter(
     *          name="limit",
     *          in="query",
     *          required=false,
     *          description="Limit record",
     *          @OA\Schema(type="integer")
     *      ),
     *      @OA\Parameter(
     *          name="search",
     *          in="query",
     *          required=false,
     *          style="deepObject",
     *          allowReserved=true,
     *          @OA\Schema(type="object",
     *              @OA\Property(property="name", type="array",
     *                  @OA\Items(type="object", @OA\Property(type="string", example="Andersen"))
     *              ),
     *              @OA\Property(property="created_at", type="object",
     *                  required={"min", "max"},
     *                  @OA\Property(property="min", type="string", format="Y-m-d", example="2014-02-25"),
     *                  @OA\Property(property="max", type="string", format="Y-m-d", example="2014-02-25"),
     *              ),
     *              @OA\Property(property="updated_at", type="object",
     *                  required={"min", "max"},
     *                  @OA\Property(property="min", type="string", format="Y-m-d", example="2014-02-25"),
     *                  @OA\Property(property="max", type="string", format="Y-m-d", example="2014-02-25"),
     *              ),
     *              @OA\Property(property="website", type="string", example="http://www.walvisnest.nl"),
     *              @OA\Property(
     *                  property="linkedin",
     *                  type="string",
     *                  example="https://www.linkedin.com/company/28619843"
     *              ),
     *              @OA\Property(property="sto_full_name", type="string", example="Angelas"),
     *                  @OA\Property(property="founded", type="object",
     *                      required={"min", "max"},
     *                      @OA\Property(property="min", type="date", format="Y-m-d", example="2020-02-25"),
     *                      @OA\Property(property="max", type="date", format="Y-m-d", example="2020-02-25"),
     *                  ),
     *                  @OA\Property(property="industry", type="array",
     *                      @OA\Items(type="object", @OA\Property(type="string", example="Machinery"))
     *                  ),
     *                  @OA\Property(property="company_size", type="object",
     *                      required={"min", "max"},
     *                      @OA\Property(property="min", type="integer", example=51),
     *                      @OA\Property(property="max", type="integer", example=100),
     *                  ),
     *                  @OA\Property(property="type", type="array",
     *                      @OA\Items(type="object", @OA\Property(type="string", enum={"Subsidiary", "Holding"}))
     *                  ),
     *                  @OA\Property(property="jobs", type="array",
     *                      @OA\Items(type="object", @OA\Property(type="string", example="Program Testing"))
     *                  ),
     *                  @OA\Property(property="skills", type="array",
     *                      @OA\Items(type="object", @OA\Property(type="string", example="Angular"))
     *                  ),
     *          ),
     *      ),
     *      @OA\Parameter(
     *          name="sort",
     *          in="query",
     *          required=false,
     *          @OA\Schema(
     *              type="object",
     *              required={"field_name", "type_sort"},
     *              @OA\Property(property="sort", type="object",
     *                  required={"field_name", "type_sort"},
     *                  @OA\Property(property="field_name", type="date", enum={"id", "created_at", "updated_at",
     *                      "website", "name", "linkedin", "sto_full_name", "type", "founded", "comment"}),
     *                  @OA\Property(property="type_sort", type="string", enum={"ASC", "DESC"}),
     *              ),
     *          )
     *      ),
     *      @OA\Parameter(
     *          name="mode",
     *          in="query",
     *          required=false,
     *          @OA\Schema(type="string", enum={"all"})
     *      ),
     *      @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(
     *              required={"success", "payload"},
     *              @OA\Property(property="success", type="boolean", example=true),
     *              @OA\Property(property="payload", type="object",
     *                  required={"current_page", "data", "first_page_url", "from", "last_page",
     *                  "last_page_url", "next_page_url", "path", "per_page", "prev_page_url",
     *                  "to", "total"},
     *                  @OA\Property(property="current_page", type="integer", example=1),
     *                  @OA\Property(property="data", type="array",
     *                      @OA\Items(type="string", ref="#/components/schemas/Company")
     *                  ),
     *                  @OA\Property(
     *                      property="first_page_url",
     *                      type="string",
     *                      example="http://localhost/api/companies?page=1"
     *                  ),
     *                  @OA\Property(property="from", type="integer", example=1),
     *                  @OA\Property(property="last_page", type="integer", example=512),
     *                  @OA\Property(
     *                      property="last_page_url",
     *                      type="string",
     *                      example="http://localhost/api/companies?page=512"
     *                  ),
     *                  @OA\Property(
     *                      property="next_page_url",
     *                      type="string",
     *                      example="http://localhost/api/companies?page=2"
     *                  ),
     *                  @OA\Property(
     *                      property="path",
     *                      type="string",
     *                      example="http://localhost/api/companies"
     *                  ),
     *                  @OA\Property(property="per_page", type="integer", example=50),
     *                  @OA\Property(property="prev_page_url", example="null"),
     *                  @OA\Property(property="to", type="integer", example=50),
     *                  @OA\Property(property="total", type="integer", example=25566),
     *              ),
     *          ),
     *     ),
     *     @OA\Response(response="400", ref="#/components/responses/400"),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     * )
     */
    public function index(GetCompanyListRequest $request, Pagination $pagination)
    {
        $company = $this->dispatchNow(
            new GetCompanyListCommand(
                $request->user(),
                $request->get('search', []),
                $request->get('sort', []),
                $request->get('page', 1),
                $request->get('limit', 10),
                $request->get('mode', null),
            )
        );

        return $this->success(CompanyResources::collection($company), $pagination->getMeta($company));
    }
}
