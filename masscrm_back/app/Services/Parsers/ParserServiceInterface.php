<?php

declare(strict_types=1);

namespace App\Services\Parsers;

interface ParserServiceInterface
{
    public const  LINKEDIN_URL = 'linkedin.com';

    public function parse(string $pathToFile): void;
}
