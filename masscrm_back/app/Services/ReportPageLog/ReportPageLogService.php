<?php declare(strict_types=1);

namespace App\Services\ReportPageLog;

use App\Http\Resources\User\User;
use App\Models\ReportPageLog;

class ReportPageLogService
{
    private ReportPageLog $reportPageLog;

    public function __construct(ReportPageLog $reportPageLog)
    {
        $this->reportPageLog = $reportPageLog;
    }

    public function saveCreated(User $user): void
    {
        $this->reportPageLog->created = 1;
    }
}
