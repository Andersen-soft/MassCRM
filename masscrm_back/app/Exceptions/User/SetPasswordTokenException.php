<?php

namespace App\Exceptions\User;

use Exception;
use Illuminate\Http\JsonResponse;

class SetPasswordTokenException extends Exception
{
    public function __construct(string $message = '', int $code = JsonResponse::HTTP_FORBIDDEN)
    {
        parent::__construct($message, $code);
    }
}
