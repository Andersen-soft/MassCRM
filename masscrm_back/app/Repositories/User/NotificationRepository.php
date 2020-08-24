<?php

namespace App\Repositories\User;

use App\Models\User\User;
use App\Models\User\UsersNotification;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;

class NotificationRepository
{
    public function getNotificationList(User $user, int $limit): LengthAwarePaginator
    {
        $query = UsersNotification::query()
            ->select(['users_notifications.*'])
            ->where('user_id', '=', $user->getId());

        return $query->latest()->groupBy('users_notifications.id')->paginate($limit);
    }
}
