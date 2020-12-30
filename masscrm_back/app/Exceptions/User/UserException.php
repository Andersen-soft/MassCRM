<?php declare(strict_types=1);

namespace App\Exceptions\User;

use Exception;
use Illuminate\Http\JsonResponse;

class UserException extends Exception
{
    public function __construct(string $message = '', int $code = JsonResponse::HTTP_UNPROCESSABLE_ENTITY)
    {
        parent::__construct($message, $code);
    }
}
