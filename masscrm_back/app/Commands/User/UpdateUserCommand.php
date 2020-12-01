<?php

declare(strict_types=1);

namespace App\Commands\User;

class UpdateUserCommand extends MainUserCommand
{
    protected int $userId;

    public function __construct(
        int $userId,
        string $email,
        string $login,
        string $name,
        string $surname,
        array $roles,
        bool $active,
        string $skype,
        ?string $position,
        ?string $comment
    ) {
        parent::__construct($email, $login, $name, $surname, $roles, $active, $position, $comment, $skype);
        $this->userId = $userId;
    }

    public function getUserId(): int
    {
        return $this->userId;
    }
}
