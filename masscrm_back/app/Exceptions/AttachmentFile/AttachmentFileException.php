<?php

namespace App\Exceptions\AttachmentFile;

use Exception;
use Illuminate\Http\JsonResponse;

class AttachmentFileException extends Exception
{
    public function __construct($message = '', int $code = JsonResponse::HTTP_FORBIDDEN)
    {
        parent::__construct($message, $code);
    }
}
