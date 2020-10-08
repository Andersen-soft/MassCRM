<?php

namespace App\Exceptions\Permission;

use Exception;
use Illuminate\Http\JsonResponse;

class PermissionException extends Exception
{
    public function __construct(string $message = '', int $code = JsonResponse::HTTP_FORBIDDEN)
    {
        parent::__construct($message, $code);
    }
}
