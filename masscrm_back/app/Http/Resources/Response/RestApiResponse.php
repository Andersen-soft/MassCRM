<?php

namespace App\Http\Resources\Response;

use Illuminate\Http\JsonResponse;

class RestApiResponse extends JsonResponse
{
    public function __construct(bool $success, $data, array $meta, array $errors, int $statusCode)
    {
        $response = [
            'success' => $success,
            'data' => $data,
            'meta' => $meta,
            'errors' => $errors,
        ];

        parent::__construct($response, $statusCode);
    }
}
