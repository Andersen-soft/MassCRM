<?php

declare(strict_types=1);

namespace App\Commands\Contact;

use App\Models\User\User;

class ChangeResponseContactsCommand
{
    protected ?array $contactsId;

    protected User $user;

    protected array $search;

    protected int $limit;

    protected int $page;

    protected int $responsibleId;

    public function __construct(
        ?array $contactsId,
        User $user,
        array $search = [],
        int $page = 1,
        int $limit = 10,
        int $responsibleId = 0
    ) {
        $this->contactsId = $contactsId;
        $this->user = $user;
        $this->search = $search;
        $this->page = $page;
        $this->limit = $limit;
        $this->responsibleId = $responsibleId;
    }

    public function getResponsibleId(): int
    {
        return $this->responsibleId;
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
