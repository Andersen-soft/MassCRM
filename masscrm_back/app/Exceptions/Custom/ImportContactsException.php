<?php

namespace App\Exceptions\Custom;

use Exception;
use Illuminate\Http\JsonResponse;

class ImportContactsException extends Exception
{
    public function __construct(string $message = '', int $code = JsonResponse::HTTP_BAD_REQUEST)
    {
        parent::__construct($message, $code);
    }
}
