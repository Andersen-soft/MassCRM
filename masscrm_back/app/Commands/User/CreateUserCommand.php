<?php declare(strict_types=1);

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

    public function toArray(): array
    {
        return array_merge(
            parent::toArray(),
            [
                'from_active_directory' => $this->fromActiveDirectory,
                'allow_setting_password' => !$this->fromActiveDirectory,
            ]
        );
    }
}
