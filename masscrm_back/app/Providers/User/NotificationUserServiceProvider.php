<?php

namespace App\Providers\User;

use App\Commands\User\Notification\GetUserNotificationListCommand;
use App\Commands\User\Notification\Handlers\GetUserNotificationListHandler;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\ServiceProvider;

class NotificationUserServiceProvider extends ServiceProvider
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
            GetUserNotificationListCommand::class => GetUserNotificationListHandler::class
        ]);
    }
}
