<?php

namespace App\Jobs;

use App\Commands\Import\ImportContactsDto;
use App\Models\Process;
use App\Models\User\User;
use App\Services\Process\ProcessService;
use Exception;
use App\Services\Parsers\Import\ParserImportCompanyService;
use App\Services\Parsers\Import\ParserImportContactService;
use App\Services\Parsers\ImportResult;
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

        try {
            $processService->updateStatusProcess(
                $this->importContacts->getProcess(),
                Process::TYPE_STATUS_PROCESS_IN_PROGRESS
            );

            $user = User::find($this->importContacts->getCommand()->getResponsible());
            $parser = new ParserImportFileService(
                app()->make(ParserImportCompanyService::class),
                app()->make(ParserImportContactService::class),
                app()->make(ImportResult::class),
                $this->importContacts,
                $user
            );
            $parser->parse($this->importContacts->getFullPath());

        } catch (Exception $exception) {
            logger($exception->getMessage());

            $processService->updateStatusProcess(
                $this->importContacts->getProcess(),
                Process::TYPE_STATUS_PROCESS_CANCEL
            );
        }

        $processService->updateStatusProcess(
            $this->importContacts->getProcess(),
            Process::TYPE_STATUS_PROCESS_DONE,
        );
    }
}
