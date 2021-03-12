<?php declare(strict_types=1);

namespace App\Services\Process;

use App\Models\Process;
use App\Repositories\Process\ProcessRepository;
use App\Models\User\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ProcessService
{
    private ProcessRepository $processRepository;

    public function __construct(ProcessRepository $processRepository)
    {
        $this->processRepository = $processRepository;
    }

    public function updateStatusProcess(Process $process, string $status, string $filePath = null): Process
    {
        $process->status = $status;
        if ($filePath) {
            $process->file_path = $filePath;
        }

        $process->save();

        return $process;
    }

    public function isProcessImport(User $user): bool
    {
        $count = $this->processRepository->getCountProcess(
            $user,
            Process::TYPE_PROCESS_IMPORT_CONTACT,
            [Process::TYPE_STATUS_PROCESS_WAIT, Process::TYPE_STATUS_PROCESS_IN_PROGRESS]
        );

        return (bool)$count;
    }

    public function createProcess(
        string $type,
        User $user,
        ?string $name = null,
        string $status = Process::TYPE_STATUS_PROCESS_WAIT
    ): Process
    {
        return $user->processes()->create([
            'name' => $name,
            'status' => $status,
            'type' => $type
        ]);
    }

    public function getListProcessExport(array $search): Builder
    {
        return $this->processRepository->getListProcess(
            [Process::TYPE_PROCESS_EXPORT_CONTACT, Process::TYPE_PROCESS_EXPORT_BLACKLIST],
            $search
        );
    }

    public function getListProcessImport(array $search, User $user): Builder
    {
        if (!$user->hasRole(User::USER_ROLE_MANAGER)) {
            $query = $this->processRepository->getListProcess(
                [Process::TYPE_PROCESS_IMPORT_CONTACT],
                $search,
                $user
            );
        } else {
            $query = $this->processRepository->getListProcess(
                [Process::TYPE_PROCESS_IMPORT_CONTACT],
                $search,
            );
        }

        return $query;
    }

    public function clearProcesses($type, int $days, string $diskName = 'export'): void
    {
        $disk = Storage::disk($diskName);
        $this->processRepository->getProcessesToClear($type, $days)
            ->each(function (Process $process) use ($disk) {
                try {
                    $file = $process->getFileName();
                    if (!is_null($file) && $disk->exists($file)) {
                        $disk->delete($file);
                    }
                } catch (\Exception $e) {
                    app('sentry')->captureException($e);
                    Log::error($e->getMessage());
                }
            });
        $this->processRepository->getProcessesToClear($type, $days)->update(['file_path' => null]);
    }
}
