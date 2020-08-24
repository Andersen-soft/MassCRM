<?php

namespace App\Exceptions\Report;

use App\Services\PayloadBuilder;
use Exception;
use Illuminate\Http\JsonResponse;

class ReportException extends Exception
{
    protected $message;
    protected $code;
    private PayloadBuilder $payloadBuilder;

    public function __construct($message = '', int $code = JsonResponse::HTTP_INTERNAL_SERVER_ERROR)
    {
        parent::__construct($message, $code);
        $this->message = $message;
        $this->code = $code;
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