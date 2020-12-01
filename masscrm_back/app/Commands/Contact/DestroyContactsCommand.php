<?php

declare(strict_types=1);

namespace App\Commands\Contact;

use App\Models\User\User;

class DestroyContactsCommand
{
    private ?array $contactsId;

    private User $user;

    private array $search;

    private int $limit;

    private int $page;

    private ?array $exceptIds;

    public function __construct(
        ?array $contactsId,
        User $user,
        array $search = [],
        int $page = 1,
        int $limit = 10,
        array $exceptIds = []
    )
    {
        $this->contactsId = $contactsId;
        $this->user = $user;
        $this->search = $search;
        $this->page = $page;
        $this->limit = $limit;
        $this->exceptIds = $exceptIds;
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

    public function getExceptIds(): array
    {
        return $this->exceptIds;
    }
}
