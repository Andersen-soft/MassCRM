<?php

declare(strict_types=1);

namespace App\Commands\Company;

use App\Models\User\User;

/**
 * Class GetCompanyListCommand
 * @package  App\Commands\Company
 */
class GetCompanyListCommand
{
    protected int $page;
    protected int $limit;
    protected array $search;
    protected array $sort;
    protected User $user;
    protected ?string $mode;

    public function __construct(
        User $user,
        array $search,
        array $sort,
        int $page = 1,
        int $limit = 10,
        string $mode = null
    ) {
        $this->search = $search;
        $this->sort = $sort;
        $this->page = $page;
        $this->limit = $limit;
        $this->user = $user;
        $this->mode = $mode;
    }

    public function getPage(): int
    {
        return $this->page;
    }

    public function getLimit(): int
    {
        return $this->limit;
    }

    public function getSearch(): array
    {
        return $this->search;
    }

    public function getSort(): array
    {
        return $this->sort;
    }

    public function getMode(): ?string
    {
        return $this->mode;
    }

    public function getUser(): User
    {
        return $this->user;
    }
}
