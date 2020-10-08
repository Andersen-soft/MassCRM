<?php

namespace App\Exceptions\Auth;

use App\Exceptions\BaseException;
use Illuminate\Http\JsonResponse;

class AuthException extends BaseException
{
    public function __construct($message = '', int $code = JsonResponse::HTTP_UNAUTHORIZED)
    {
        parent::__construct($message, $code);
    }
}
