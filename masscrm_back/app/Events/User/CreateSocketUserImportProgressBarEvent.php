<?php

declare(strict_types=1);

namespace App\Events\User;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class CreateSocketUserImportProgressBarEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public int $percent;

    public int $importId;

    public string $token;

    public function __construct(
        int $percent,
        int $importId,
        string $token
    ) {
        $this->percent = $percent;
        $this->importId = $importId;
        $this->token = $token;
    }
}
