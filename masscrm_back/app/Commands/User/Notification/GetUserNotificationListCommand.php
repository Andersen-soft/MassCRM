<?php

namespace App\Commands\User\Notification;

use App\Models\User\User;

class GetUserNotificationListCommand
{
    protected User $user;
    protected int $page;
    protected int $limit;

    public function __construct(User $user, int $limit, int $page)
    {
        $this->user = $user;
        $this->page = $page;
        $this->limit = $limit;
    }

    public function getUser(): User
    {
        return $this->user;
    }

    public function getPage(): int
    {
        return $this->page;
    }

    public function getLimit(): int
    {
        return $this->limit;
    }
}
