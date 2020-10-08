<?php

namespace App\Jobs;

use App\Commands\Import\ImportContactsDto;
use App\Models\Process;
use App\Models\User\User;
use App\Services\Process\ProcessService;
use Exception;
use App\Services\Parsers\ParserImportFileService;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class ImportContactsJob implements ShouldQueue
{
    use Dispatchable;
    use InteractsWithQueue;
    use Queueable;
    use SerializesModels;

    protected const IMPORT_CONTACT_QUEUE = 'import_contact';

    protected ImportContactsDto $importContacts;

    public function __construct(ImportContactsDto $importContacts)
    {
        $this->queue = self::IMPORT_CONTACT_QUEUE;
        $this->importContacts = $importContacts;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        /** @var $processService ProcessService */
        $processService = app()->make(ProcessService::class);
        /** @var ParserImportFileService $parserImportFileService */
        $parserImportFileService = app()->make(ParserImportFileService::class);

        try {
            $processService->updateStatusProcess(
                $this->importContacts->getProcess(),
                Process::TYPE_STATUS_PROCESS_IN_PROGRESS
            );

            $parserImportFileService->setParamsImport($this->importContacts);
            $parserImportFileService->parse($this->importContacts->getFullPath());

        } catch (Exception $exception) {
            $processService->updateStatusProcess(
                $this->importContacts->getProcess(),
                Process::TYPE_STATUS_PROCESS_FAILED
            );
            logger($exception->getMessage());
        }

        $processService->updateStatusProcess(
            $this->importContacts->getProcess(),
            Process::TYPE_STATUS_PROCESS_DONE,
        );
    }
}
