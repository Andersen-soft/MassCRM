<?php declare(strict_types=1);

namespace App\Models\Request;

use App\Models\User\User;

class RequestSearchModel
{
    protected ?int $page = 1;

    protected int $limit = 10;

    protected array $search = [];

    protected array $sort = [];

    protected ?User $user = null;

    public function setPage(?int $page): self
    {
        $this->page = $page;

        return $this;
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

    public function getUser(): User
    {
        return $this->user;
    }
}
