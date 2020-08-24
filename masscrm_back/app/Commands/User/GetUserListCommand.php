<?php

namespace App\Commands\User;

class GetUserListCommand
{
    protected int $page;
    protected int $limit;
    protected array $search;
    protected array $sort;

    public function __construct(array $search, array $sort, int $limit, int $page)
    {
        $this->search = $search;
        $this->sort = $sort;
        $this->page = $page;
        $this->limit = $limit;
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
}
