<?php declare(strict_types=1);

namespace App\Exceptions\Import;

use Exception;
use Illuminate\Http\JsonResponse;

class ImportException extends Exception
{
    public function __construct(string $message = '', int $code = JsonResponse::HTTP_INTERNAL_SERVER_ERROR)
    {
        parent::__construct($message, $code);
    }
}
