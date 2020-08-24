<?php

namespace App\Commands\User\Handlers;

use App\Commands\User\GetUserCommand;
use App\Models\User\User;
use App\Services\User\UserService;

class GetUserHandler
{
    private UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function handle(GetUserCommand $command): User
    {
        return  $this->userService->fetchUser($command->getUserId());
    }
}
