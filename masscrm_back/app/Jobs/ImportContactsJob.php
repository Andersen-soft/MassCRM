<?php declare(strict_types=1);

namespace App\Jobs;

use App\Commands\Import\ImportContactsDto;
use App\Imports\Contact\ContactsImport;
use App\Imports\Contact\Parsers\ParserImportFileService;
use App\Models\Process;
use App\Services\Process\ProcessService;
use Exception;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Throwable;

class ImportContactsJob implements ShouldQueue
{
    use Dispatchable;
    use InteractsWithQueue;
    use Queueable;
    use SerializesModels;

    protected const IMPORT_CONTACT_QUEUE = 'import_contact';

    protected ImportContactsDto $importContacts;

    /**
     * @var ProcessService
     */
    private ProcessService $processService;

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
        try {
            /** @var ProcessService $this->processService */
            $this->processService = app()->make(ProcessService::class);
            /** @var ParserImportFileService $parserImportFileService */
            $parserImportFileService = app()->make(ParserImportFileService::class);

            $this->setProcessStatus(Process::TYPE_STATUS_PROCESS_IN_PROGRESS);

            $parserImportFileService->setParamsImport($this->importContacts);

            $import = new ContactsImport($this->importContacts, $parserImportFileService);
            $import->import($this->importContacts->getFullPath());

            $import->importContacts->getProcess()->informationImport()->associate(
                $import->parserImportFileService
                    ->getImportResult()
                    ->save($this->importContacts->getCommand()->getUser())
            );

        } catch (Exception $exception) {
            logger($exception->getMessage());
            $this->setProcessStatus(Process::TYPE_STATUS_PROCESS_FAILED);
        }

        $this->setProcessStatus(Process::TYPE_STATUS_PROCESS_DONE);
    }

    public function failed(Throwable $exception): void
    {
        logger($exception->getMessage());
        $this->setProcessStatus(Process::TYPE_STATUS_PROCESS_FAILED);
    }

    public function setProcessStatus(string $status): void {
        $this->processService->updateStatusProcess(
            $this->importContacts->getProcess(),
            $status
        );
    }
}
