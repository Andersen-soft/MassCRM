<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Exceptions\Validation\ValidationRequestException;
use Tymon\JWTAuth\Exceptions\JWTException;
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

    public function report(Throwable $exception): void
    {
        if (app()->bound('sentry') && $this->shouldReport($exception)) {
            app('sentry')->captureException($exception);
        }

        parent::report($exception);
    }

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
            case ($exception instanceof ValidationRequestException):
                return $this->renderException($exception->getErrors(), $exception->getCode());
            case ($exception instanceof BaseException):
                return $this->renderException([$exception->getMessage()], $exception->getCode());
            case ($exception instanceof UnauthorizedHttpException):
            case ($exception instanceof JWTException):
                return $this->renderException([$exception->getMessage()], JsonResponse::HTTP_UNAUTHORIZED);
            default:
                return $this->renderException([$exception->getMessage()], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    private function renderException(array $errors, int $code): JsonResponse
    {
        $response = [
            'success' => false,
            'data' => [],
            'meta' => [],
            'errors' => $errors,
        ];

        return new JsonResponse($response, $code);
    }
}
