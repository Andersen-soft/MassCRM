<?php

namespace App\Http\Controllers;

use App\Services\PayloadBuilder;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use League\Fractal\TransformerAbstract;
use Illuminate\Container\Container;

/**
 * @OA\Info(
 *     title="MassCRM",
 *     description="A RESTful API for MassCRM",
 *     version="1.0.0"
 * )
 * @OA\Server(
 *     description="Development server",
 *     url="/api"
 * )
 * @OA\SecurityScheme(
 *      securityScheme="bearerAuth",
 *      in="header",
 *      name="bearerAuth",
 *      type="http",
 *      scheme="bearer",
 *      bearerFormat="JWT",
 * )
 */
class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected function responseTransform(
        $response,
        TransformerAbstract $transformer,
        int $status = 200,
        array $headers = []
    ) {
        $container = Container::getInstance();
        /** @var PayloadBuilder $payloadBuilder */
        $payloadBuilder = $container->make(PayloadBuilder::class);

        if ($response instanceof LengthAwarePaginator) {
            $response = $payloadBuilder->responseWithPagination($response, $transformer);
        } else {
            $response = is_iterable($response)
                ? $payloadBuilder->responseCollection($response, $transformer)
                : $payloadBuilder->responseItem($response, $transformer);
        }

        return response()->json(
            $payloadBuilder->getResponseBody($response, true),
            $status,
            $headers
        );
    }

    protected function response($response, int $status = 200, array $headers = [])
    {
        $container = Container::getInstance();
        /** @var PayloadBuilder $payloadBuilder */
        $payloadBuilder = $container->make(PayloadBuilder::class);

        return response()->json(
            $payloadBuilder->getResponseBody($response, true),
            $status,
            $headers
        );
    }
}

//Base error & responses (400, 401, 403, 404, etc.)
/**
 * @OA\Schema(
 *    schema="UnauthorizedError",
 *    @OA\Property(property="success", type="boolean", example=false),
 *    @OA\Property(property="payload", type="object",
 *        @OA\Property(property="message", type="string", example="Token has expired."),
 *    )
 * )
 * @OA\Schema(
 *    schema="ForbiddenError",
 *    @OA\Property(property="success", type="boolean", example=false),
 *    @OA\Property(property="payload", type="object",
 *        @OA\Property(property="message", type="string", example="The link has already been used to set password."),
 *    )
 * )
 * @OA\Schema(
 *    schema="ServiceUnavailableError",
 *    @OA\Property(property="success", type="boolean", example=false),
 *    @OA\Property(property="payload", type="object",
 *        @OA\Property(property="message", type="string", example="Ldap service unavailable."),
 *    )
 * )
 * @OA\Schema(
 *    schema="ValidationError",
 *    @OA\Property(property="success", type="boolean", example=false),
 *    @OA\Property(property="payload", type="object",
 *        @OA\Property(property="errors", type="object",
 *           @OA\Property(property="field_name", type="array",
 *              @OA\Items(type="string", example="The <field_name> field is required.")
 *           ),
 *        ),
 *    ),
 * )
 * @OA\Schema(
 *    schema="NotFoundError",
 *    @OA\Property(property="success", type="boolean", example=false),
 *    @OA\Property(property="payload", type="object",
 *       @OA\Property(property="message", type="string", example="Contact value(1) not found"),
 *    ),
 * )
 * @OA\Components(
 *     responses={
 *          @OA\Response(
 *              response=400,
 *              description="Error: ValidationError",
 *              @OA\JsonContent(ref="#/components/schemas/ValidationError")
 *          ),
 *          @OA\Response(
 *              response=401,
 *              description="Error: Unauthorized",
 *              @OA\JsonContent(ref="#/components/schemas/UnauthorizedError")
 *          ),
 *          @OA\Response(
 *              response=404,
 *              description="Error: NotFound",
 *              @OA\JsonContent(ref="#/components/schemas/NotFoundError")
 *          ),
 *          @OA\Response(
 *              response=403,
 *              description="Error: Forbidden",
 *              @OA\JsonContent(ref="#/components/schemas/ForbiddenError")
 *          ),
 *          @OA\Response(
 *              response=503,
 *              description="Error: Service Unavailable",
 *              @OA\JsonContent(ref="#/components/schemas/ServiceUnavailableError")
 *          ),
 *     }
 * )
 */
