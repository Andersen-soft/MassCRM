<?php declare(strict_types=1);

namespace App\Commands\Company;

use App\Models\User\User;

/**
 * Class CreateCompanyCommand
 * @package App\Commands\Company
 */
class CreateCompanyCommand
{
    protected array $companyFields;
    protected array $industries;
    protected array $vacancies;
    protected array $subsidiaries;
    protected User $user;

    public function __construct(
        array $companyFields,
        User $user,
        array $industries,
        array $vacancies,
        array $subsidiaries
    ) {
        $this->companyFields = $companyFields;
        $this->industries = $industries;
        $this->vacancies = $vacancies;
        $this->subsidiaries = $subsidiaries;
        $this->user = $user;
    }

    public function getCompanyFields(): array
    {
        return $this->companyFields;
    }

    public function getVacancies(): array
    {
        return $this->vacancies;
    }

    public function getSubsidiaries(): array
    {
        return $this->subsidiaries;
    }

    public function getIndustries(): array
    {
        return $this->industries;
    }

    public function getUser(): User
    {
        return $this->user;
    }
}
