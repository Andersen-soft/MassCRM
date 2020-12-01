<?php

declare(strict_types=1);

namespace App\Commands\Company;

/**
 * Class DestroyManyCompanyCommand
 * @package App\Commands\Company
 */
class DestroyManyCompanyCommand
{
    protected array $ids;

    public function __construct(array $ids) {
        $this->ids = $ids;
    }

    public function getIds(): array
    {
        return $this->ids;
    }
}
