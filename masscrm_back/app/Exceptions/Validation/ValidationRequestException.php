<?php

namespace App\Exceptions\Validation;

use App\Services\PayloadBuilder;
use Exception;
use Illuminate\Http\JsonResponse;

class ValidationRequestException extends Exception
{
    private array $errorsList;
    private PayloadBuilder $payloadBuilder;

    public function __construct(array $errorsList = [])
    {
        parent::__construct();
        $this->errorsList = $errorsList;
    }

    public function report(PayloadBuilder $payloadBuilder): void
    {
        $this->payloadBuilder = $payloadBuilder;
    }

    public function render(): JsonResponse
    {
        return new JsonResponse($this->payloadBuilder->getResponseBody(
            ['errors' => $this->errorsList],
            false
        ), JsonResponse::HTTP_BAD_REQUEST);
    }
}