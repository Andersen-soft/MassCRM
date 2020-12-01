<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use App\Http\Resources\Response\RestApiResponse;

abstract class BaseController extends Controller
{
    protected function success(
        iterable $data,
        array $meta = [],
        array $errors = [],
        int $statusCode = JsonResponse::HTTP_OK
    ): RestApiResponse {
        return new RestApiResponse(true, $data, $meta, $errors, $statusCode);
    }
}
