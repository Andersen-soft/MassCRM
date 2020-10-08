<?php

namespace App\Commands\Contact;

use App\Models\User\User;

class DestroyContactsCommand
{
    protected ?array $contactsId;
    protected User $user;
    protected array $search;
    protected int $limit;
    protected int $page;

    public function __construct(
        ?array $contactsId,
        User $user,
        array $search = [],
        int $page = 1,
        int $limit = 10
    )
    {
        $this->contactsId = $contactsId;
        $this->user = $user;
        $this->search = $search;
        $this->page = $page;
        $this->limit = $limit;
    }

    public function getContactsId(): ?array
    {
        return $this->contactsId;
    }

    public function getUser(): User
    {
        return $this->user;
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
}
