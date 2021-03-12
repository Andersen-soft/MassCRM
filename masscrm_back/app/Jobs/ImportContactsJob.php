<?php

declare(strict_types=1);

namespace App\Jobs;

use App\Commands\Import\ImportContactsDto;
use App\Events\User\CreateSocketUserNotificationEvent;
use App\Imports\Contact\ContactsImport;
use App\Imports\Contact\Parsers\ParserImportFileService;
use App\Models\Process;
use App\Models\User\UsersNotification;
use App\Services\Process\ProcessService;
use Exception;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Lang;
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
     * @var ProcessService $processService
     */
    private ProcessService $processService;
    private ParserImportFileService  $parserImportFileService;

    private string $path;

    public function __construct(ImportContactsDto $importContacts)
    {
        $this->queue = self::IMPORT_CONTACT_QUEUE;
        $this->importContacts = $importContacts;
        $this->path = $this->importContacts->getFullPath();
    }

    /**
     * Execute the job.
     *
     * @param  ProcessService  $processService
     * @param  ParserImportFileService  $parserImportFileService
     */
    public function handle(ProcessService $processService, ParserImportFileService $parserImportFileService): void
    {
        $this->processService = $processService;
        $this->parserImportFileService = $parserImportFileService;

        try {
            $this->setProcessStatus(Process::TYPE_STATUS_PROCESS_IN_PROGRESS);

            $this->parserImportFileService->setParamsImport($this->importContacts);

            $import = new ContactsImport($this->importContacts, $parserImportFileService);
            $this->importContacts->setTotalRows($this->getTotalCount($import, $this->path));
            $import->import($this->path);

            $import->importContacts->getProcess()->informationImport()->associate(
                $import->parserImportFileService
                    ->getImportResult()
                    ->save($this->importContacts->getCommand()->getUser())
            );

            $this->setProcessStatus(Process::TYPE_STATUS_PROCESS_DONE);
        } catch (Exception $exception) {
            $this->setProcessStatus(Process::TYPE_STATUS_PROCESS_FAILED);
            $this->notifyError();
            logger($exception->getMessage());
        }
    }

    public function setProcessStatus(string $status): void
    {
        $this->processService->updateStatusProcess(
            $this->importContacts->getProcess(),
            $status
        );
    }

    private function getTotalCount(ContactsImport $import, $path): int
    {
        return $import->toCollection($path)->first()->count();
    }

    public function notifyError()
    {
        CreateSocketUserNotificationEvent::dispatch(
            UsersNotification::TYPE_IMPORT_FAILED,
            Lang::get('import.failed')
        );
    }

    public function failed(Throwable $exception): void
    {
        $this->setProcessStatus(Process::TYPE_STATUS_PROCESS_FAILED);
        $this->notifyError();
        logger($exception->getMessage());
    }
}
