<?php

namespace App\Exceptions;

use App\Exceptions\Custom\ImportContactsExceptionInterface;
use App\Services\PayloadBuilder;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Client\RequestException;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Render an exception into an HTTP response.
     *
     * @param  Request  $request
     * @param  \Throwable  $exception
     * @return Response
     *
     * @throws \Throwable
     */
    public function render($request, Throwable $exception)
    {
        switch (true) {
            case ($exception instanceof ImportContactsExceptionInterface):
                return $this->renderException([
                    'message' => $exception->getMessage(),
                    'type' => 'ImportError',
                    'code'    => $exception->getCode(),
                ], JsonResponse::HTTP_BAD_REQUEST);
            case ($exception instanceof RequestException):
            case ($exception instanceof UnauthorizedHttpException):
                return $this->renderException(['message' => $exception->getMessage()], $exception->getStatusCode());
            default:
                return parent::render($request, $exception);
        }
    }

    private function renderException(array $payload = [], int $code = JsonResponse::HTTP_UNAUTHORIZED): JsonResponse
    {
        $payloadBuilder = new PayloadBuilder();
        return new JsonResponse($payloadBuilder->getResponseBody($payload, false), $code);
    }
}
