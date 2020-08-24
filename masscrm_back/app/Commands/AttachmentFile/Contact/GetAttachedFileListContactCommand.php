<?php

namespace App\Commands\AttachmentFile\Contact;

class GetAttachedFileListContactCommand
{
    protected int $contactId;
    protected int $page;
    protected int $limit;

    public function __construct(int $contactId, int $page = 1, int $limit = 50)
    {
        $this->contactId = $contactId;
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

    public function getContactId(): int
    {
        return $this->contactId;
    }
}
