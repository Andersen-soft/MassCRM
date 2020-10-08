<?php

namespace App\Services\User;

use App\Exceptions\Custom\NotFoundException;
use App\Models\User\User;
use App\Models\User\UsersNotification;
use App\Repositories\User\NotificationRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class NotificationService
{
    private NotificationRepository $repository;

    public function __construct(NotificationRepository $repository)
    {
        $this->repository = $repository;
    }

    public function updateStatus(int $id): UsersNotification
    {
        $notification = $this->repository->getNotificationById($id);

        if (!$notification) {
            throw new NotFoundException('Notification value(' . $id . ') not found');
        }

        $notification->new = false;
        $notification->save();

        return $notification;
    }

    public function getNotificationList(User $user, int $limit, ?bool $new): LengthAwarePaginator
    {
        return $this->repository->getNotificationList($user, $limit, $new);
    }
}
