<?php

namespace App\Exceptions\Custom;

use Exception;

class ImportContactsException extends Exception implements ImportContactsExceptionInterface
{
    protected $code = 400;
}
