<?php

namespace App\Commands\Contact;

/**
 * Class GetContactCommand
 * @package  App\Commands\Contact
 */
class GetContactCommand
{
    protected int $contactId;

    public function __construct(
        int $contactId
    ) {
        $this->contactId = $contactId;
    }

    public function getContactId(): int
    {
        return $this->contactId;
    }
}
