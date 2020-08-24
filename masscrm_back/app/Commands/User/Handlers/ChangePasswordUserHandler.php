<?php

namespace App\Commands\User\Handlers;

use App\Commands\User\ChangePasswordUserCommand;
use App\Exceptions\Custom\NotFoundException;
use App\Models\User\User;
use App\Events\User\ChangePasswordEvent;
use Illuminate\Support\Facades\Lang;

class ChangePasswordUserHandler
{
    public function handle(ChangePasswordUserCommand $command): array
    {
        $user = User::where(['id' => $command->getUserId(), 'from_active_directory' => false])->first();
        if (!$user instanceof User) {
            throw new NotFoundException('User value(' . $command->getUserId() . ') not found');
        }

        $user->setAllowSettingPassword(true)->save();

        if ($user->isActive()) {
            ChangePasswordEvent::dispatch($user);
        }

        return [
            'text' => Lang::get('user.successful_send_link_on_change_password')
        ];
    }
}
