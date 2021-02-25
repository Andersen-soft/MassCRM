<?php declare(strict_types=1);

namespace App\Jobs;

use App\Events\User\CreateSocketUserNotificationEvent;
use App\Models\Process;
use App\Models\User\User;
use App\Models\User\UsersNotification;
use App\Services\Process\ProcessService;
use App\Services\Reports\ReportFileService;
use Exception;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Log;

class ExportContactList implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private const EXPORT_BLACKLIST_QUEUE = 'export_contact_list';

    private array $listField;

    private array $search;

    private array $sort;

    private string $typeFile;

    private User $user;

    private Process $process;

    private bool $isInWork;

    private array $ids;

    private string $token;

    public function __construct(
        array $listField,
        array $search,
        array $sort,
        string $typeFile,
        User $user,
        Process $process,
        bool $isInWork,
        string $token,
        array $ids = []
    ) {
        $this->queue = self::EXPORT_BLACKLIST_QUEUE;
        $this->listField = $listField;
        $this->typeFile = $typeFile;
        $this->search = $search;
        $this->sort = $sort;
        $this->user = $user;
        $this->process = $process;
        $this->isInWork = $isInWork;
        $this->ids = $ids;
        $this->token = $token;
    }

    public function handle(): void
    {
        /** @var ReportFileService $reportContactFileService */
        $reportContactFileService = app()->make(ReportFileService::class);
        /** @var ProcessService $processService */
        $processService = app()->make(ProcessService::class);
        $processService->updateStatusProcess($this->process, Process::TYPE_STATUS_PROCESS_IN_PROGRESS);
        try {
            $reportContactFileService->export(
                $this->process,
                $this->listField,
                $this->search,
                $this->sort,
                $this->typeFile,
                $this->user,
                $this->isInWork,
                $this->ids,
                $this->token
            );
        } catch (Exception $e) {
            $processService->updateStatusProcess($this->process, Process::TYPE_STATUS_PROCESS_FAILED);
            $this->notifyError();
            Log::error($e->getMessage());
        }
    }

    public function notifyError()
    {
        CreateSocketUserNotificationEvent::dispatch(
            UsersNotification::TYPE_EXPORT_CONTACTS_FAILED,
            Lang::get('export.contacts.export_failed')
        );
    }
}
