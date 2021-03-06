<?php

declare(strict_types=1);

namespace App\Exceptions;

use App\Exceptions\User\UserException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Exceptions\Validation\ValidationRequestException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    private const ROUTE_NOT_FOUND = 'Route not found';
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
     * @param Request $request
     * @param \Throwable $exception
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
                return $this->renderException(['login' => [$exception->getMessage()]], $exception->getCode());
            case ($exception instanceof UnauthorizedHttpException):
            case ($exception instanceof UserException):
                return $this->renderException(['user' => [$exception->getMessage()]], $exception->getCode());
            case ($exception instanceof JWTException):
                return $this->renderException(['token' => [$exception->getMessage()]], JsonResponse::HTTP_UNAUTHORIZED);
            case ($exception instanceof NotFoundHttpException):
                return $this->renderException(['not_found' => [self::ROUTE_NOT_FOUND]], JsonResponse::HTTP_NOT_FOUND);
            default:
                return $this->renderException(['error' => [$exception->getMessage()]], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
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
