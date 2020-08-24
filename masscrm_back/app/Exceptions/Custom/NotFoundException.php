<?php

namespace App\Exceptions\Custom;

use App\Services\PayloadBuilder;
use Exception;
use Illuminate\Http\JsonResponse;

class NotFoundException extends Exception implements NotFoundExceptionInterface
{
    private PayloadBuilder $payloadBuilder;

    public function __construct(string $message = '', int $code = JsonResponse::HTTP_NOT_FOUND)
    {
        parent::__construct($message, $code);
    }

    public function report(PayloadBuilder $payloadBuilder): void
    {
        $this->payloadBuilder = $payloadBuilder;
    }

    public function render(): JsonResponse
    {
        return new JsonResponse(
            $this->payloadBuilder->getResponseBody(['message' => $this->message], false), $this->code
        );
    }
}
