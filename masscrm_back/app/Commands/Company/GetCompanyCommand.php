<?php

namespace App\Commands\Company;

/**
 * Class GetCompanyCommand
 * @package App\Commands\Company
 */
class GetCompanyCommand
{
    protected int $contactId;

    public function __construct(
        int $contactId
    ) {
        $this->contactId = $contactId;
    }

    public function getContactId(): int
    {
        return $this->contactId;
    }
}
