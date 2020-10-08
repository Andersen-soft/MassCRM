<?php

namespace App\Exceptions\Import;

use Exception;
use Illuminate\Http\JsonResponse;

class ImportException extends Exception
{
    public function __construct($message = '', int $code = JsonResponse::HTTP_INTERNAL_SERVER_ERROR)
    {
        parent::__construct($message, $code);
    }
}
