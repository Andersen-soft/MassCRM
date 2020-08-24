<?php

namespace App\Commands\Contact;

use App\Models\User\User;

/**
 * Class GetContactListCommand
 * @package  App\Commands\Contact
 */
class GetContactListCommand
{
    protected int $page;
    protected int $limit;
    protected array $search;
    protected array $sort;
    protected User $user;

    public function __construct(
        User $user,
        array $search,
        array $sort,
        int $page = 1,
        int $limit = 10
    ) {
        $this->search = $search;
        $this->sort = $sort;
        $this->page = $page;
        $this->limit = $limit;
        $this->user = $user;
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
