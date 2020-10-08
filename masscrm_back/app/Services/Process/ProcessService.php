<?php

namespace App\Services\Process;

use App\Models\Process;
use App\Repositories\Process\ProcessRepository;
use App\Models\User\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

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
        $count =  $this->processRepository->getCountProcess(
            $user,
            Process::TYPE_PROCESS_IMPORT_CONTACT,
            [Process::TYPE_STATUS_PROCESS_WAIT, Process::TYPE_STATUS_PROCESS_IN_PROGRESS]
        );

        return (bool) $count;
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

    public function getListProcessExport(int $limit, array $search): LengthAwarePaginator
    {
        return $this->processRepository->getListProcessExport(
            [Process::TYPE_PROCESS_EXPORT_CONTACT, Process::TYPE_PROCESS_EXPORT_BLACKLIST],
            $search
        )->paginate($limit);
    }
}
