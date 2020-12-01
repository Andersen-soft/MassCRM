<?php declare(strict_types=1);

namespace App\Services\User;

use App\Exceptions\Custom\NotFoundException;
use App\Models\User\User;
use App\Models\User\UsersNotification;
use App\Repositories\User\NotificationRepository;
use Illuminate\Database\Eloquent\Builder;

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

    public function getNotificationList(User $user, ?bool $new): Builder
    {
        return $this->repository->getNotificationList($user, $new);
    }
}
