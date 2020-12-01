<?php

declare(strict_types=1);

namespace App\Commands\ActivityLog\Contact;

class ShowActivityLogContactCommand
{
    protected int $contactId;
    protected array $search;
    protected int $page;
    protected int $limit;

    public function __construct(int $contactId, int $page = 1, int $limit = 50,  array $search)
    {
        $this->contactId = $contactId;
        $this->page = $page;
        $this->limit = $limit;
        $this->search = $search;
    }

    public function getContactId(): int
    {
        return $this->contactId;
    }

    public function getPage(): int
    {
        return $this->page;
    }

    public function getLimit(): int
    {
        return $this->limit;
    }

    public function getSearch() : array
    {
        return $this->search;
    }
}
