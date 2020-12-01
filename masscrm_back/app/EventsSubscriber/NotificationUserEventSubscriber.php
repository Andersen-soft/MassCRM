<?php

declare(strict_types=1);

namespace App\EventsSubscriber;

use App\Services\Notification\NotificationUserService;
use App\Events\User\RegistrationUserToEmailEvent;
use App\Events\User\RegistrationUserToActiveDirectoryEvent;
use App\Events\User\ChangePasswordEvent;
use App\Events\User\ChangeLoginEvent;
use App\Events\User\CreateSocketUserNotificationEvent;
use Illuminate\Events\Dispatcher;

class NotificationUserEventSubscriber
{
    private NotificationUserService $notificationUserService;

    public function __construct(NotificationUserService $notificationUserService)
    {
        $this->notificationUserService = $notificationUserService;
    }

    public function subscribe(Dispatcher  $events): void
    {
        $events->listen(
            RegistrationUserToActiveDirectoryEvent::class,
            self::class . '@handleRegistrationUserActiveDirectory'
        );

        $events->listen(
            RegistrationUserToEmailEvent::class,
            self::class . '@handleRegistrationUserEmail'
        );

        $events->listen(
            ChangePasswordEvent::class,
            self::class . '@handleChangePasswordUser'
        );

        $events->listen(
            ChangeLoginEvent::class,
            self::class . '@handleChangeLoginUser'
        );

        $events->listen(
            CreateSocketUserNotificationEvent::class,
            self::class . '@handleCreateUserNotification'
        );
    }

    public function handleRegistrationUserActiveDirectory(RegistrationUserToActiveDirectoryEvent $event): void
    {
        $this->notificationUserService->sendNotificationRegistrationUserActiveDirectory($event->user);
    }

    public function handleRegistrationUserEmail(RegistrationUserToEmailEvent $event): void
    {
        $this->notificationUserService->sendNotificationRegistrationUserEmail($event->user);
    }

    public function handleChangePasswordUser(ChangePasswordEvent $event): void
    {
        $this->notificationUserService->sendLinkChangePasswordUser($event->user);
    }

    public function handleChangeLoginUser(ChangeLoginEvent $event): void
    {
        $this->notificationUserService->sendNewLoginUser($event->user);
    }

    public function handleCreateUserNotification(CreateSocketUserNotificationEvent $event): void
    {
        $this->notificationUserService->sendNotificationUserToSocket(
            $event->typeNotification,
            $event->message,
            $event->users,
            $event->filePath,
            $event->operationId
        );
    }
}
