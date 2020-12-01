<?php

declare(strict_types=1);

namespace App\Commands\AttachmentFile\Company;

class CheckExistAttachmentFileCompanyCommand
{
    protected int $companyId;
    protected string $name;

    public function __construct(int $companyId, string $name)
    {
        $this->companyId = $companyId;
        $this->name = $name;
    }

    public function getCompanyId(): int
    {
        return $this->companyId;
    }

    public function getName(): string
    {
        return $this->name;
    }
}
