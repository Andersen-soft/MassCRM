<?php declare(strict_types=1);

namespace App\Commands\Filter;

/**
 * Class GetFiltersCommand
 * @package  App\Commands\Filter
 */
class GetFiltersCommand
{
    protected array $filters;
    protected string $language;

    public function __construct(array $filters, string $language = 'en')
    {
        $this->filters = $filters;
        $this->language = $language;
    }

    public function getFilters(): array
    {
        return $this->filters;
    }

    public function getLanguage(): string
    {
        return $this->language;
    }
}
