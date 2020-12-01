<?php

declare(strict_types=1);

namespace App\Commands\AttachmentFile\Contact;

class CheckExistAttachmentFileContactCommand
{
    protected int $contactId;
    protected string $name;

    public function __construct(int $contactId, string $name)
    {
        $this->contactId = $contactId;
        $this->name = $name;
    }

    public function getContactId(): int
    {
        return $this->contactId;
    }

    public function getName(): string
    {
        return $this->name;
    }
}
