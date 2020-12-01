<?php declare(strict_types=1);

namespace App\Exceptions\User;

use Exception;
use Illuminate\Http\JsonResponse;

class LdapException extends Exception
{
    public function __construct(string $message = '', int $code = JsonResponse::HTTP_SERVICE_UNAVAILABLE)
    {
        parent::__construct($message, $code);
    }
}
