<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Lang;
use Tymon\JWTAuth\Http\Middleware\Authenticate;
use App\Exceptions\Auth\AuthException;

class AuthenticateJwt extends Authenticate
{
    public function handle($request, Closure $next)
    {
        $this->authenticate($request);
        if (empty($request->user()->active)) {
            throw new AuthException(Lang::get('auth.user_inactive'), JsonResponse::HTTP_FORBIDDEN);
        }

        return $next($request);
    }
}
