<?php

namespace App\Commands\Contact;

use App\Models\User\User;

class DestroyContactsCommand
{
    protected array $contactsId;
    protected User $user;

    public function __construct(array $contactsId, User $user)
    {
        $this->contactsId = $contactsId;
        $this->user = $user;
    }

    public function getContactsId(): array
    {
        return $this->contactsId;
    }

    public function getUser(): User
    {
        return $this->user;
    }
}
