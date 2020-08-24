<?php

namespace App\Commands\Import\Handlers;

use App\Commands\Import\ImportContactsDto;
use App\Commands\Import\ImportStartParseCommand;
use App\Exceptions\Import\ImportException;
use App\Jobs\ImportContactsJob;
use App\Models\Process;

class ImportStartParseHandler
{
    public function handle(ImportStartParseCommand $command): void
    {
        $filePath = $this->checkFileExist($command->getUser()->getId());

        /** @var Process $process */
        $process = $command->getUser()->processes()->create([
            'status' => Process::TYPE_STATUS_PROCESS_WAIT,
            'type' => Process::TYPE_PROCESS_IMPORT
        ]);

        ImportContactsJob::dispatch(
            new ImportContactsDto($command, $filePath, $process)
        );
    }

    private function checkFileExist(int $userId): string
    {
        $path = storage_path('importFiles') . '/' . $userId;
        if (!file_exists($path) && !is_dir($path)) {
            throw new ImportException('File to import not found', 404);
        }
        $fileNames = array_diff(scandir($path), ['.', '..']);
        $fileName = array_shift($fileNames);
        if (!$fileName) {
            throw new ImportException('File to import not found', 404);
        }

        return $path . '/' . $fileName;
    }
}
