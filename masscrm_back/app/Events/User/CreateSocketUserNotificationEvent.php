<?php


namespace App\Events\User;

use App\Models\User\User;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class CreateSocketUserNotificationEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public string $typeNotification;
    public string $message;
    public array $users;

    public function __construct(string $typeNotification, string $message, array $users = [])
    {
        $this->typeNotification = $typeNotification;
        $this->message = $message;
        $this->users = $users;
    }
}
