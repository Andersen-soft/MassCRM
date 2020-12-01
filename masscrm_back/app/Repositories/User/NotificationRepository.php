<?php declare(strict_types=1);

namespace App\Repositories\User;

use App\Models\User\User;
use App\Models\User\UsersNotification;
use Illuminate\Database\Eloquent\Builder;

class NotificationRepository
{
    public function getNotificationList(User $user, ?bool $new): Builder
    {
        $query = UsersNotification::query()
            ->select(['users_notifications.*'])
            ->where('user_id', '=', $user->getId());

        if (isset($new)) {
            $query->where('new', '=', $new);
        }

        return $query->latest()->groupBy('users_notifications.id');
    }

    public function getNotificationById(int $id): ?UsersNotification
    {
        return UsersNotification::query()->find($id);
    }
}
