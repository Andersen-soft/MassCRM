<?php

namespace App\Repositories\User;

use App\Models\User\User;
use App\Models\User\UsersNotification;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class NotificationRepository
{
    public function getNotificationList(User $user, int $limit, ?bool $new): LengthAwarePaginator
    {
        $query = UsersNotification::query()
            ->select(['users_notifications.*'])
            ->where('user_id', '=', $user->getId());

        if (isset($new)) {
            $query->where('new', '=', $new);
        }

        return $query->latest()->groupBy('users_notifications.id')->paginate($limit);
    }

    public function getNotificationById(int $id): ?UsersNotification
    {
        return UsersNotification::query()->find($id);
    }
}
