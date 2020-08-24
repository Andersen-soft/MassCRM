<?php

namespace App\Providers\Token;

use Illuminate\Support\ServiceProvider;
use Lcobucci\JWT\Builder;
use Lcobucci\JWT\Parser;
use App\Services\Token\TymonTokenManager;
use Tymon\JWTAuth\Providers\JWT\Lcobucci;

class TymonTokenServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->singleton(TymonTokenManager::class, static function () {
            return new TymonTokenManager(
                new Lcobucci(new Builder(), new Parser(), config('jwt.secret'), 'HS256', [])
            );
        });
    }
}
