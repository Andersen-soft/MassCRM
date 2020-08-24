<?php

namespace App\Http\Controllers\Country;

use App\Commands\Location\GetCitiesCommand;
use App\Commands\Location\GetCountriesCommand;
use App\Commands\Location\GetRegionsCommand;
use App\Http\Controllers\Controller;
use App\Http\Transformers\Location\CityTransform;
use App\Http\Transformers\Location\CountryTransform;
use App\Http\Transformers\Location\RegionTransform;

class CountryController extends Controller
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
    public function countries()
    {
        return $this->responseTransform(
            $this->dispatchNow(new GetCountriesCommand()),
            new CountryTransform()
        );
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
    public function regions(string $code)
    {
        return $this->responseTransform(
            $this->dispatchNow(new GetRegionsCommand($code)),
            new RegionTransform()
        );
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
    public function cities(string $code)
    {
        return $this->responseTransform(
            $this->dispatchNow(new GetCitiesCommand($code)),
            new CityTransform()
        );
    }
}
