<?php declare(strict_types=1);

namespace App\Providers\User;

use App\Commands\User\ChangePasswordUserCommand;
use App\Commands\User\Handlers\ChangePasswordUserHandler;

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
            ChangePasswordUserCommand::class => ChangePasswordUserHandler::class
        ]);
    }
}
