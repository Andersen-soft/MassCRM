<?php
declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Lang;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Http\Middleware\Authenticate;
use App\Exceptions\Auth\AuthException;

class AuthenticateJwt extends Authenticate
{
    public function handle($request, Closure $next)
    {
        try {
            $this->auth->setRequest($request)->parseToken()->authenticate();
        } catch (\Exception $e) {
            if ($e instanceof TokenInvalidException) {
                throw new JWTException($e->getMessage(), JsonResponse::HTTP_UNAUTHORIZED);
            }

            if ($e instanceof TokenExpiredException) {
                try {
                    $token = $this->auth->refresh($this->auth->getToken());
                    $this->auth->setToken($token)->toUser();
                    $request->headers->set('Authorization', "Bearer {$token}");
                } catch (\Exception $e) {
                    throw new JWTException(Lang::get('auth.token_error_refresh'), JsonResponse::HTTP_UNAUTHORIZED);
                }
            }
        }

        if (empty($request->user()->active)) {
            throw new AuthException(Lang::get('auth.user_inactive'), JsonResponse::HTTP_FORBIDDEN);
        }

        return $next($request);
    }
}
