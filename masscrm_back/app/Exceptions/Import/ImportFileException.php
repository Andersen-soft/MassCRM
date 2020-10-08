<?php

namespace App\Exceptions\Import;

use App\Exceptions\BaseException;
use Illuminate\Http\JsonResponse;

class ImportFileException extends BaseException
{
    private array $errors;

    public function __construct(array $errors = [])
    {
        parent::__construct('', JsonResponse::HTTP_BAD_REQUEST);
        $this->errors= $errors;
    }

    public function getErrors(): string
    {
        return implode(PHP_EOL, $this->errors);
    }
}