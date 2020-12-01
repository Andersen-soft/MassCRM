<?php

declare(strict_types=1);

namespace App\Commands\User;

class SetPasswordUserCommand
{
    protected int $id;
    protected string $password;

    public function __construct(int $id, string $password)
    {
        $this->id = $id;
        $this->password = $password;
    }

    public function getUserId(): int
    {
        return $this->id;
    }

    public function getPassword(): string
    {
        return $this->password;
    }
}
