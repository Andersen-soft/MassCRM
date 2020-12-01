<?php declare(strict_types=1);

namespace App\Exceptions\Custom;

use Exception;
use Illuminate\Http\JsonResponse;

class NotFoundException extends Exception
{
    public function __construct(string $message = '', int $code = JsonResponse::HTTP_NOT_FOUND)
    {
        parent::__construct($message, $code);
    }
}
