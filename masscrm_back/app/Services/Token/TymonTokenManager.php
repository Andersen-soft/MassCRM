<?php

namespace App\Services\Token;

use Illuminate\Support\Facades\Log;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Providers\JWT\Lcobucci;

class TymonTokenManager
{
    private Lcobucci $lcobucci;

    public function __construct(Lcobucci $lcobucci)
    {
        $this->lcobucci = $lcobucci;
    }

    public function decode($token)
    {
        try {
            return $this->lcobucci->decode($token);
        } catch (JWTException $exception) {
            Log::error('An error has occurred: ' . $exception->getMessage());
        }
    }
}
