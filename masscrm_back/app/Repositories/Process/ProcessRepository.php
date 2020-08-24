<?php
namespace App\Repositories\Process;

use App\Models\Process;
use App\Models\User\User;

class ProcessRepository
{
    public function getCountProcess(User $user, int $type, array $statuses): int
    {
        return Process::query()
            ->where(['user_id' => $user->id, 'type' => $type])
            ->whereIn('status', $statuses)
            ->count();
    }
}
