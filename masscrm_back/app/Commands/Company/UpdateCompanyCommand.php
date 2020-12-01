<?php

declare(strict_types=1);

namespace App\Commands\Company;

use App\Models\User\User;

/**
 * Class UpdateCompanyCommand
 * @package App\Commands\Company
 */
class UpdateCompanyCommand
{
    public int $companyId;

    public array $companyFields;

    public array $industries;

    public ?array $vacancies;

    public ?array $subsidiaries;

    public User $user;

    public function __construct(
        int $companyId,
        array $companyFields,
        array $industries,
        ?array $vacancies,
        ?array $subsidiaries,
        User $user
    ) {
        $this->companyFields = $companyFields;
        $this->industries = $industries;
        $this->vacancies = $vacancies;
        $this->companyId = $companyId;
        $this->subsidiaries = $subsidiaries;
        $this->user = $user;
    }

    public function getCompanyFields(): array
    {
        return $this->companyFields;
    }

    public function getVacancies(): ?array
    {
        return $this->vacancies;
    }

    public function getSubsidiaries(): ?array
    {
        return $this->subsidiaries;
    }

    public function getIndustries(): array
    {
        return $this->industries;
    }

    public function getCompanyId(): int
    {
        return $this->companyId;
    }

    public function getUser(): User
    {
        return $this->user;
    }
}
