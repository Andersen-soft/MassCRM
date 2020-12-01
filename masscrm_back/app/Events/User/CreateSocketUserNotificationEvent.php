<?php

declare(strict_types=1);

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
    public ?string $filePath;
    public ?int $operationId;

    public function __construct(
        string $typeNotification,
        string $message,
        array $users = [],
        string $filePath = '',
        int $operationId = null
    ) {
        $this->typeNotification = $typeNotification;
        $this->message = $message;
        $this->users = $users;
        $this->filePath = $filePath;
        $this->operationId = $operationId;
    }
}
