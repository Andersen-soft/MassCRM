<?php declare(strict_types=1);

namespace App\Commands\User;

abstract class MainUserCommand
{
    protected string $email;
    protected string $login;
    protected string $name;
    protected string $surname;
    protected array $roles;
    protected bool $active;
    protected ?string $position;
    protected ?string $comment;
    protected string $skype;

    public function __construct(
        string $email,
        string $login,
        string $name,
        string $surname,
        array $roles,
        bool $active,
        ?string $position,
        ?string $comment,
        string $skype
    ) {
        $this->email = $email;
        $this->login = $login;
        $this->name = $name;
        $this->surname = $surname;
        $this->roles = $roles;
        $this->active = $active;
        $this->position = $position;
        $this->comment = $comment;
        $this->skype = $skype;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getLogin(): string
    {
        return $this->login;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getSurname(): string
    {
        return $this->surname;
    }

    public function getActive(): bool
    {
        return $this->active;
    }

    public function getRoles(): array
    {
        return $this->roles;
    }

    public function getPosition(): ?string
    {
        return $this->position;
    }

    public function getComment(): ?string
    {
        return $this->comment;
    }

    public function getSkype(): string
    {
        return $this->skype;
    }

    public function toArray(): array
    {
        return [
            'email' => $this->email,
            'login' => $this->login,
            'name' =>  $this->name,
            'surname' => $this->surname,
            'roles' => $this->roles,
            'active' => $this->active,
            'position' => $this->position,
            'comment' => $this->comment,
            'skype' => $this->skype
        ];
    }
}
