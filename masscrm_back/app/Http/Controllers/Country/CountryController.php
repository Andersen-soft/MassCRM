<?php

namespace App\Http\Controllers\Country;

use App\Commands\Location\GetCitiesCommand;
use App\Commands\Location\GetCountriesCommand;
use App\Commands\Location\GetRegionsCommand;
use App\Http\Controllers\BaseController;
use App\Http\Resources\Location\CityCollection;
use App\Http\Resources\Location\RegionCollection;
use App\Http\Resources\Location\CountryCollection;
use Illuminate\Http\JsonResponse;

class CountryController extends BaseController
{
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
     *              required={"success", "payload"},
     *              @OA\Property(property="success", type="boolean", example=true),
     *              @OA\Property(property="payload", type="array",
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
        $countries = $this->dispatchNow(new GetCountriesCommand());

        return $this->success(new CountryCollection($countries));
    }

    /**
     * @OA\Get(
     *      path="/countries/{code}/regions",
     *      tags={"Location"},
     *      description="Get region list by country code",
     *      security={{"bearerAuth":{}}},
     *      @OA\Parameter(
     *          description="ISO 3166-1 alpha-2",
     *          name="code",
     *          in="path",
     *          required=true,
     *          @OA\Schema(type="string", example="BY")
     *      ),
     *      @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(
     *              required={"success", "payload"},
     *              @OA\Property(property="success", type="boolean", example=true),
     *              @OA\Property(property="payload", type="array",
     *                  @OA\Items(type="string", ref="#/components/schemas/Region")
     *              ),
     *          ),
     *     ),
     *     @OA\Response(response="400", ref="#/components/responses/400"),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     *     @OA\Response(response="404", ref="#/components/responses/404"),
     * )
     */
    public function regions(string $code): JsonResponse
    {
        $regions =  $this->dispatchNow(new GetRegionsCommand($code));

        return $this->success(new RegionCollection($regions));
    }

    /**
     * @OA\Get(
     *      path="/countries/regions/{code}",
     *      tags={"Location"},
     *      description="Get cities list by region code",
     *      security={{"bearerAuth":{}}},
     *      @OA\Parameter(
     *          description="ISO 3166-2",
     *          name="code",
     *          in="path",
     *          required=true,
     *          @OA\Schema(type="string", example="BY-VI")
     *      ),
     *      @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(
     *              required={"success", "payload"},
     *              @OA\Property(property="success", type="boolean", example=true),
     *              @OA\Property(property="payload", type="array",
     *                  @OA\Items(type="string", ref="#/components/schemas/City")
     *              ),
     *          ),
     *     ),
     *     @OA\Response(response="400", ref="#/components/responses/400"),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     *     @OA\Response(response="404", ref="#/components/responses/404"),
     * )
     */
    public function cities(string $code): JsonResponse
    {
        $cities = $this->dispatchNow(new GetCitiesCommand($code));

        return $this->success(new CityCollection($cities));
    }
}
