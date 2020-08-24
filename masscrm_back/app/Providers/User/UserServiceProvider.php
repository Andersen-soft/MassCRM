<?php

namespace App\Providers\User;

use App\Commands\User\{
    CreateUserCommand,
    GetUserListCommand,
    SetPasswordUserCommand,
    UpdateUserCommand,
    GetUserCommand,
    ChangePasswordUserCommand
};

use App\Commands\User\Handlers\{
    GetUserHandler,
    GetUserListHandler,
    CreateUserHandler,
    UpdateUserHandler,
    SetPasswordUserHandler,
    ChangePasswordUserHandler
};

use Illuminate\Support\Facades\Bus;
use Illuminate\Support\ServiceProvider;

class UserServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        $this->registerCommandHandlers();
    }

    public function register(): void
    {
    }

    private function registerCommandHandlers(): void
    {
        Bus::map([
            CreateUserCommand::class => CreateUserHandler::class,
            UpdateUserCommand::class => UpdateUserHandler::class,
            SetPasswordUserCommand::class => SetPasswordUserHandler::class,
            GetUserCommand::class => GetUserHandler::class,
            GetUserListCommand::class => GetUserListHandler::class,
            ChangePasswordUserCommand::class => ChangePasswordUserHandler::class
        ]);
    }
}
