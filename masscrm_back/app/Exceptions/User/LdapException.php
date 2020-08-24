<?php

namespace App\Exceptions\User;

use App\Services\PayloadBuilder;
use Exception;
use Illuminate\Http\JsonResponse;

class LdapException extends Exception
{
    private PayloadBuilder $payloadBuilder;

    public function __construct($message = '', int $code = JsonResponse::HTTP_SERVICE_UNAVAILABLE)
    {
        parent::__construct($message, $code);
    }

    public function report(PayloadBuilder $payloadBuilder): void
    {
        $this->payloadBuilder = $payloadBuilder;
    }

    public function render(): JsonResponse
    {
        return new JsonResponse($this->payloadBuilder->getResponseBody(
            ['message' => $this->message],
            false
        ), $this->code);
    }
}
