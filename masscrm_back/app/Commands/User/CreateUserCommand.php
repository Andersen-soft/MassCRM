<?php

namespace App\Commands\User;

class CreateUserCommand extends MainUserCommand
{
    protected bool $fromActiveDirectory;

    public function __construct(
        string $email,
        string $login,
        string $name,
        string $surname,
        array $roles,
        bool $active,
        ?string $position,
        ?string $comment,
        string $skype,
        bool $fromActiveDirectory
    ) {
        parent::__construct($email, $login, $name, $surname, $roles, $active, $position, $comment, $skype);
        $this->fromActiveDirectory = $fromActiveDirectory;
    }

    public function fromActiveDirectory(): bool
    {
        return $this->fromActiveDirectory;
    }
}
