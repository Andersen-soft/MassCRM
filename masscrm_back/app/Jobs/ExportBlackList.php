<?php declare(strict_types=1);

namespace App\Jobs;

use App\Events\User\CreateSocketUserNotificationEvent;
use App\Models\Process;
use App\Models\User\User;
use App\Models\User\UsersNotification;
use App\Services\Blacklist\BlacklistExportService;
use App\Services\Process\ProcessService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Exception;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Log;

class ExportBlackList implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private const EXPORT_BLACKLIST_QUEUE = 'export_blacklist';

    private array $search;
    private array $sort;
    private User $user;
    private Process $process;

    public function __construct(array $search, array $sort, User $user, Process $process)
    {
        $this->queue = self::EXPORT_BLACKLIST_QUEUE;
        $this->search = $search;
        $this->sort = $sort;
        $this->user = $user;
        $this->process = $process;
    }

    public function handle(): void
    {
        /** @var BlacklistExportService $blacklistExportService */
        $blacklistExportService = app()->make(BlacklistExportService::class);
        /** @var ProcessService $processService */
        $processService = app()->make(ProcessService::class);
        $processService->updateStatusProcess($this->process, Process::TYPE_STATUS_PROCESS_IN_PROGRESS);

        try {
            $blacklistExportService->export($this->process, $this->search, $this->sort, $this->user);
        } catch (Exception $e) {
            $processService->updateStatusProcess($this->process, Process::TYPE_STATUS_PROCESS_FAILED);
            $this->notifyError();
            Log::error($e->getMessage());
        }
    }

    public function notifyError()
    {
        CreateSocketUserNotificationEvent::dispatch(
            UsersNotification::TYPE_EXPORT_BLACKLIST_FAILED,
            Lang::get('export.blacklist.export_failed')
        );
    }
}
