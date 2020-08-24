<?php

namespace App\Services\Parsers;

interface ParserServiceInterface
{
    public const  LINKEDIN_URL = 'linkedin.com';

    public function parse(string $pathToFile): void;
}
