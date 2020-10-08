<?php

namespace App\Exceptions\Report;

use Exception;
use Illuminate\Http\JsonResponse;

class ReportException extends Exception
{
    public function __construct(string $message = '', int $code = JsonResponse::HTTP_INTERNAL_SERVER_ERROR)
    {
        parent::__construct($message, $code);
    }
}
