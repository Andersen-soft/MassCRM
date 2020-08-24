<?php

namespace App\Commands\User\Notification\Handlers;

use App\Commands\User\Notification\GetUserNotificationListCommand;
use App\Repositories\User\NotificationRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class GetUserNotificationListHandler
{
    protected NotificationRepository $repository;

    public function __construct(NotificationRepository $repository)
    {
        $this->repository = $repository;
    }

    public function handle(GetUserNotificationListCommand $command): LengthAwarePaginator
    {
        return $this->repository->getNotificationList(
            $command->getUser(),
            $command->getLimit()
        );
    }
}
