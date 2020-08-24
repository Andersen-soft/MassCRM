<?php

namespace App\Commands\User\Handlers;

use App\Commands\User\CreateUserCommand;
use App\Models\User\User;
use App\Events\User\{
    RegistrationUserToEmailEvent,
    RegistrationUserToActiveDirectoryEvent
};

class CreateUserHandler
{
    public function handle(CreateUserCommand $command): User
    {
        $user = (new User())
            ->setLogin($command->getLogin())
            ->setName($command->getName())
            ->setSurName($command->getSurname())
            ->setEmail($command->getEmail())
            ->setRoles($command->getRoles())
            ->setActive($command->getActive())
            ->setPosition($command->getPosition())
            ->setComment($command->getComment())
            ->setSkype($command->getSkype())
            ->setAllowSettingPassword(!$command->fromActiveDirectory())
            ->setFromActiveDirectory($command->fromActiveDirectory());

        $user->save();

        if (!$user->isActive()) {
            return $user;
        }

        if ($command->fromActiveDirectory()) {
            RegistrationUserToActiveDirectoryEvent::dispatch($user);
        } else {
            RegistrationUserToEmailEvent::dispatch($user);
        }

        return $user;
    }
}
