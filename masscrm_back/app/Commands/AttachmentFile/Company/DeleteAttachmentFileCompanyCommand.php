<?php

namespace App\Commands\AttachmentFile\Company;

use App\Models\User\User;

class DeleteAttachmentFileCompanyCommand
{
    protected int $id;
    protected User $user;

    public function __construct(User $user, int $id)
    {
        $this->user = $user;
        $this->id = $id;
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function getUser(): User
    {
        return $this->user;
    }
}
