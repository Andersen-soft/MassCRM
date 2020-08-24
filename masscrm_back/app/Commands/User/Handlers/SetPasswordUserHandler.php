<?php

namespace App\Commands\User\Handlers;

use App\Commands\User\SetPasswordUserCommand;
use App\Models\User\User;
use App\Services\User\UserService;

class SetPasswordUserHandler
{
    private UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function handle(SetPasswordUserCommand $command): User
    {
        $user = $this->userService->fetchUserForSetPassword($command->getUserId());

        $user->setPassword($command->getPassword())
            ->setAllowSettingPassword(false)
            ->save();

        return $user;
    }
}
