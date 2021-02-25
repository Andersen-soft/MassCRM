<?php
declare(strict_types=1);

namespace App\Scopes;

trait disableTimestampsScope
{
    public function scopeWithoutTimestamps(): self
    {
        $this->timestamps = false;
        return $this;
    }
}
