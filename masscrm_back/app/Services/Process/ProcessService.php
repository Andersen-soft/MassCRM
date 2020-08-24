<?php

namespace App\Services\Process;

use App\Models\Process;
use App\Repositories\Process\ProcessRepository;
use App\Models\User\User;

class ProcessService
{
    private ProcessRepository $processRepository;

    public function __construct(ProcessRepository $processRepository)
    {
        $this->processRepository = $processRepository;
    }

    public function updateStatusProcess(Process $process, int $status): ?Process
    {
        $process->status = $status;
        $process->save();

        return $process;
    }

    public function isProcessImport(User $user): bool
    {
        $count =  $this->processRepository->getCountProcess(
            $user,
            Process::TYPE_PROCESS_IMPORT,
            [Process::TYPE_STATUS_PROCESS_WAIT, Process::TYPE_STATUS_PROCESS_IN_PROGRESS]
        );

        return (bool) $count;
    }
}
