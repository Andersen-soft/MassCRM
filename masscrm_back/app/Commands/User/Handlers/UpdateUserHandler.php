<?php

namespace App\Commands\User\Handlers;

use App\Commands\User\UpdateUserCommand;
use App\Exceptions\Custom\NotFoundException;
use App\Models\User\User;
use App\Events\User\ChangeLoginEvent;

class UpdateUserHandler
{
    public function handle(UpdateUserCommand $command): User
    {
        $user = User::where(['id' => $command->getUserId()])->first();
        if (!$user instanceof User) {
            throw new NotFoundException('User value(' . $command->getUserId() . ') not found');
        }

        $loginUser = $user->getLogin();
        $user = $user->setName($command->getName())
            ->setSurName($command->getSurname())
            ->setRoles($command->getRoles())
            ->setActive($command->getActive())
            ->setPosition($command->getPosition())
            ->setComment($command->getComment())
            ->setSkype($command->getSkype());

        if (!$user->fromActiveDirectory() && $command->getActive()) {
            $user->setLogin($command->getLogin())
                 ->setEmail($command->getEmail());
        }

        $user->save();

        if ($loginUser !== $user->getLogin() && $user->isActive()) {
            ChangeLoginEvent::dispatch($user);
        }

        return $user;
    }
}
