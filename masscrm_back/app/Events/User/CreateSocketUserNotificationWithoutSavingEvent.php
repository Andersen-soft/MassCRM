<?php

declare(strict_types=1);

namespace App\Events\User;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class CreateSocketUserNotificationWithoutSavingEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public string $typeNotification;
    public string $message;

    public function __construct(
        string $typeNotification,
        string $message
    ) {
        $this->typeNotification = $typeNotification;
        $this->message = $message;
    }
}
