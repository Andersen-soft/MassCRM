<?php

declare(strict_types=1);

namespace App\Imports\Contact\Parsers;

interface ParserServiceInterface
{
    public const  LINKEDIN_URL = 'linkedin.com';

    public function parse(string $pathToFile): void;
}
