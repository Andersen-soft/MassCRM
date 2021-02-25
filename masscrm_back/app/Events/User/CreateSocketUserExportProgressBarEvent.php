<?php

declare(strict_types=1);

namespace App\Events\User;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class CreateSocketUserExportProgressBarEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public int $percent;

    public int $exportId;

    public string $token;

    public function __construct(
        int $percent,
        int $exportId,
        string $token
    ) {
        $this->percent = $percent;
        $this->exportId = $exportId;
        $this->token = $token;
    }
}
