<?php

declare(strict_types=1);

namespace App\Rules\Company;

use App\Models\Company\CompanyVacancy;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Lang;

class UniqueVacancyRule implements Rule
{
    private int $companyId;
    private ?array $vacancies;

    public function __construct(int $companyId, ?array $vacancies = [])
    {
        $this->companyId = $companyId;
        $this->vacancies = $vacancies;
    }

    public function passes($attribute, $value): bool
    {
        $this->vacancies = array_filter($this->vacancies, fn($vacancy) => !isset($vacancy['id']));

        if (empty($this->vacancies)) {
            return true;
        } else {
            $newVacancy = array_shift($this->vacancies);
        }

        $query = CompanyVacancy::query()->where([
            'vacancy' => $newVacancy['job'],
            'skills' => $newVacancy['skills'],
            'link' => $newVacancy['link'],
        ]);

        if ($query->exists()) {
            return false;
        }

        return true;
    }

    public function message(): string
    {
        return Lang::get('validation.vacancies.unique');
    }
}
