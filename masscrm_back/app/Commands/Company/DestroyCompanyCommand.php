<?php

namespace App\Commands\Company;

/**
 * Class DestroyCompanyCommand
 * @package App\Commands\Company
 */
class DestroyCompanyCommand
{
    protected int $companyId;

    public function __construct(
        int $companyId
    ) {
        $this->companyId = $companyId;
    }

    public function getCompanyId(): int
    {
        return $this->companyId;
    }
}
