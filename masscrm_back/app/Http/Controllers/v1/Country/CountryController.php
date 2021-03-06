<?php declare(strict_types=1);

namespace App\Http\Controllers\v1\Country;

use App\Http\Controllers\BaseController;
use App\Http\Requests\Location\CityRequest;
use App\Http\Resources\Location\CityCollection;
use App\Http\Resources\Location\RegionCollection;
use App\Http\Resources\Location\CountryCollection;
use App\Services\Location\LocationService;
use Illuminate\Http\JsonResponse;

class CountryController extends BaseController
{
    private LocationService $locationService;

    public function __construct(LocationService $locationService)
    {
        $this->middleware('permission:addLocation', ['only' => ['addCities']]);

        $this->locationService = $locationService;
    }

    /**
     * @OA\Get(
     *      path="/countries",
     *      tags={"Location"},
     *      description="Get countries list",
     *      security={{"bearerAuth":{}}},
     *      @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(
     *              required={"success", "data"},
     *              @OA\Property(property="success", type="boolean", example=true),
     *              @OA\Property(property="data", type="array",
     *                  @OA\Items(type="string", ref="#/components/schemas/Country")
     *              ),
     *          ),
     *     ),
     *     @OA\Response(response="400", ref="#/components/responses/400"),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     * )
     */
    public function countries(): JsonResponse
    {
        $countries = $this->locationService->getCountries();

        return $this->success(new CountryCollection($countries));
    }

    /**
     * @OA\Get(
     *      path="/countries/{code}/regions",
     *      tags={"Location"},
     *      description="Get region list by country code",
     *      security={{"bearerAuth":{}}},
     *      @OA\Parameter(description="ISO 3166-1 alpha-2", name="code", in="path", required=true,
     *          @OA\Schema(type="string", example="BY")
     *      ),
     *      @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(
     *              required={"success", "data"},
     *              @OA\Property(property="success", type="boolean", example=true),
     *              @OA\Property(property="data", type="array",
     *                  @OA\Items(type="string", ref="#/components/schemas/Region")
     *              ),
     *          ),
     *     ),
     *     @OA\Response(response="400", ref="#/components/responses/400"),
     *     @OA\Response(response="401", ref="#/components/responses/401")
     * )
     */
    public function regions(string $code): JsonResponse
    {
        $regions = $this->locationService->getRegions($code);

        return $this->success(new RegionCollection($regions));
    }

    /**
     * @OA\Get(
     *      path="/countries/regions/{code}",
     *      tags={"Location"},
     *      description="Get cities list by region code",
     *      security={{"bearerAuth":{}}},
     *      @OA\Parameter(description="ISO 3166-2", name="code", in="path", required=true,
     *          @OA\Schema(type="string", example="BY-VI")
     *      ),
     *      @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(
     *              required={"success", "data"},
     *              @OA\Property(property="success", type="boolean", example=true),
     *              @OA\Property(property="data", type="array",
     *                  @OA\Items(type="string", ref="#/components/schemas/City")
     *              ),
     *          ),
     *     ),
     *     @OA\Response(response="400", ref="#/components/responses/400"),
     *     @OA\Response(response="401", ref="#/components/responses/401")
     * )
     */
    public function cities(string $code): JsonResponse
    {
        $cities = $this->locationService->getCities($code);

        return $this->success(new CityCollection($cities));
    }

    /**
     * @OA\Post(
     *      path="/countries/cities",
     *      tags={"Location"},
     *      description="Add new cities",
     *      security={{"bearerAuth":{}}},
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 required={"location"},
     *                  @OA\Property(property="location", type="array",
     *                     @OA\Items(type="object", required={"country", "region", "city"},
     *                          @OA\Property(property="country", type="integer", example=123),
     *                          @OA\Property(property="region", type="integer", example=123),
     *                          @OA\Property(property="city", type="string", example="City name"),
     *                      ),
     *                  ),
     *              ),
     *          )
     *      ),
     *      @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(
     *              @OA\Property(property="success", type="boolean", example=true)
     *          )
     *      ),
     *      @OA\Response(response="400", ref="#/components/responses/400"),
     *      @OA\Response(response="401", ref="#/components/responses/401")
     * )
     * @param CityRequest $request
     * @return JsonResponse
     */
    public function addCities(CityRequest $request): JsonResponse
    {
        $cities = $this->locationService->addCities($request);

        return $this->success(new CityCollection($cities));
    }
}
