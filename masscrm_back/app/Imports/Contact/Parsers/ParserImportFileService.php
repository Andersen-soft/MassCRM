<?php

declare(strict_types=1);

namespace App\Imports\Contact\Parsers;

use App\Commands\Import\ImportContactsDto;
use App\Commands\Import\ImportStartParseCommand;
use App\Events\ReportPage\CountUpdatedForReportPageEvent;
use App\Events\User\CreateSocketUserImportProgressBarEvent;
use App\Exceptions\Import\ImportException;
use App\Imports\Contact\Parsers\Import\Company\ImportCompanyService;
use App\Imports\Contact\Parsers\Import\Contact\ImportContactService;
use App\Imports\Contact\Parsers\Mapping\FieldMapping;
use App\Imports\Contact\Users\UserNC2;
use App\Models\Company\Company;
use App\Models\Contact\Contact;
use App\Models\ReportPageLog;
use App\Models\User\User;
use App\Services\TransferCollection\TransferCollectionCompanyService;
use App\Services\TransferCollection\TransferCollectionContactService;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use App\Exceptions\Import\ImportFileException;

/**
 * Class ParserImportFileService
 *
 * @package App
 */
class ParserImportFileService extends ParserMain
{
    private const PERCENT_STEP = 5;
    private const PERCENT = 100;
    protected array $fields = [];
    protected ?string $comment;
    protected string $columnSeparator;
    protected string $action;
    protected int $responsible;
    protected array $origin;
    protected User $user;
    protected ImportContactsDto $importContactsData;
    protected ImportCompanyService $importCompanyService;
    protected ImportContactService $importContactService;
    protected ImportResult $importResult;
    protected FieldMapping $fieldMapping;
    private TransferCollectionCompanyService $transferCollectionCompanyService;
    private TransferCollectionContactService $transferCollectionContactService;
    private int $currentElement = 1;
    private int $currentPercent = 0;

    public function __construct(
        ImportCompanyService $importCompanyService,
        ImportContactService $importContactService,
        ImportResult $importResult,
        FieldMapping $fieldMapping,
        TransferCollectionCompanyService $transferCollectionCompanyService,
        TransferCollectionContactService $transferCollectionContactService
    )
    {
        $this->importCompanyService = $importCompanyService;
        $this->importContactService = $importContactService;
        $this->importResult = $importResult;
        $this->fieldMapping = $fieldMapping;
        $this->transferCollectionCompanyService = $transferCollectionCompanyService;
        $this->transferCollectionContactService = $transferCollectionContactService;
    }

    public function setParamsImport(ImportContactsDto $importContactsData): self
    {
        $this->fields = $importContactsData->getCommand()->getFields();
        $this->comment = $importContactsData->getCommand()->getComment();
        $this->columnSeparator = $importContactsData->getCommand()->getColumnSeparator();
        $this->action = $importContactsData->getCommand()->getDuplicationAction();
        $this->origin = $importContactsData->getCommand()->getOrigin();
        $this->responsible = $importContactsData->getCommand()->getResponsible();
        $this->user = $importContactsData->getCommand()->getUser();
        $this->importContactsData = $importContactsData;

        if ($this->importContactsData->getCommand()->isHeader()) {
            $this->importResult->setHeaderToFiles($importContactsData->getFullPath());
        }

        return $this;
    }

    public function getImportResult(): ImportResult
    {
        return $this->importResult;
    }

    public function parseRow(array $row, ?int $totalRows, int $importId): void
    {
        $this->percentOfImport($totalRows, $importId, $this->importContactsData->getToken());
        $this->sendNotificationIfCountLessThenMinimum($totalRows, $importId, $this->importContactsData->getToken());
        $arrayRow = $this->rowToArray($row, count($this->fields));

        if (empty(array_filter($arrayRow))) {
            return;
        }

        try {
            DB::beginTransaction();
            $data = $this->fieldMapping->mappingFields($row, $this->fields, $this->columnSeparator);
            $company = $this->importCompanyService->getUnique($this->fields, $row);
            $contact = $this->importContactService->getUnique($this->fields, $data);

            if ($contact instanceof Contact && $this->action === ImportStartParseCommand::DUPLICATION_ACTION_SKIP) {
                $this->importResult->addLineToDuplicateFile($row);
                $this->importResult->incrementMissingDuplicate();
                $this->importResult->successSaveRow();
                DB::commit();
                return;
            }

            if ($this->action === ImportStartParseCommand::DUPLICATION_ACTION_MERGE
                && ($company || $contact)
                && $this->user->hasRole(User::USER_ROLE_NC2)) {

                $userData = $this->fieldMapping->mappingFieldsByUser($data, UserNC2::FIELDS);

                if ($company && $contact) {
                    $this->importCompanyService->validateNC2($company, $this->user, $contact, $userData);

                    $this->transferCollectionContactService->updateCollectionContact(
                        $contact = $this->parseContact($userData, $contact, $company)
                    );

                    $this->transferCollectionCompanyService->updateCollectionCompany(
                        $company = $this->parseCompany($userData, $company)
                    );
                }

                if ($contact && !$company) {
                    $this->transferCollectionCompanyService->updateCollectionCompany(
                        $company = $this->parseCompany($data, $company)
                    );

                    $this->importCompanyService->validateNC2($company, $this->user, $contact);

                    $this->transferCollectionContactService->updateCollectionContact(
                        $contact = $this->parseContact($userData, $contact, $company)
                    );
                }

                if (!$contact && $company) {
                    $this->importCompanyService->validateNC2($company, $this->user, $contact);

                    $this->transferCollectionContactService->updateCollectionContact(
                        $contact = $this->parseContact($data, $contact, $company)
                    );

                    $this->transferCollectionCompanyService->updateCollectionCompany(
                        $company = $this->parseCompany($userData, $company)
                    );
                }

                event(new CountUpdatedForReportPageEvent($contact, $company, $data, $this->user));
                $this->importResult->successSaveRow();
                DB::commit();
                return;
            }
            $company = $this->parseCompanyWithoutCollection($data, $company);
            $contact = $this->parseContact($data, $contact, $company);
            $company = $this->parseCompanyCollections($data, $company);

            $this->transferCollectionContactService->updateCollectionContact($contact);

            if ($company) {
                $this->transferCollectionCompanyService->updateCollectionCompany($company);
            }

            $this->importResult->successSaveRow();
            DB::commit();
        } catch (\Throwable $exception) {
            DB::rollBack();
            $this->importResult->incrementCountErrors();
            $this->importResult->failedSaveRow();

            if ($exception instanceof ImportFileException) {
                Log::error(implode(PHP_EOL, [
                    $exception->getErrors(),
                    $exception->getLine(),
                    $exception->getFile(),
                    $exception->getPrevious()
                ]));
                $this->importResult->addLineToErrorFile($arrayRow, $exception->getErrors());
            } else {
                Log::error(implode(PHP_EOL, [
                    $exception->getMessage(),
                    $exception->getLine(),
                    $exception->getFile(),
                    $exception->getPrevious()
                ]));
                $this->importResult->addLineToErrorFile($arrayRow, $exception->getMessage());
                app('sentry')->captureException($exception);
            }
        }
    }

    private function parseCompany(array $data, ?Company $company): ?Company
    {
        if ($company) {
            return $this->workWithCompanyAction($company, $data);
        }

        $company = $this->importCompanyService->create($data, $this->user);
        $this->importResult->incrementSucImportCompany();

        return $company;
    }

    private function parseCompanyWithoutCollection(array $data, ?Company $company): ?Company
    {
        if ($company) {
            return $this->workWithCompanyAction($company, $data);
        }

        $company = $this->importCompanyService->createCompanyWithoutCollection($data, $this->user);
        $this->importResult->incrementSucImportCompany();

        return $company;
    }

    private function parseCompanyCollections(array $data, ?Company $company): ?Company
    {
        $company = $this->importCompanyService->updateCompanyCollection($data, $company);

        return $company;
    }

    private function workWithCompanyAction(Company $company, array $row): Company
    {
        switch ($this->action) {
            case ImportStartParseCommand::DUPLICATION_ACTION_MERGE:
                $company = $this->importCompanyService->merge($company, $row, $this->user);
                $this->importResult->incrementSucImportDuplicateCompany();
                break;
            case ImportStartParseCommand::DUPLICATION_ACTION_REPLACE:
                $company = $this->importCompanyService->replace($company, $row, $this->user);
                $this->importResult->incrementSucImportDuplicateCompany();
                break;
            default:
                break;
        }

        return $company;
    }

    private function parseContact(array $arrayRow, ?Contact $contact, ?Company $company): Contact
    {
        if ($contact) {
            return $this->workWithContactAction($contact, $arrayRow, $company);
        }

        $contact = $this->importContactService->create(
            $arrayRow,
            $this->user,
            $this->responsible,
            $company,
            $this->origin,
            $this->comment,
        );

        $this->importResult->incrementSucImportContact();

        return $contact;
    }

    private function workWithContactAction(Contact $contact, array $row, ?Company $company): Contact
    {
        switch ($this->action) {
            case ImportStartParseCommand::DUPLICATION_ACTION_MERGE:
                $contact = $this->importContactService->merge(
                    $contact,
                    $row,
                    $this->user,
                    $this->responsible,
                    $company,
                    $this->origin,
                    $this->comment
                );
                $this->importResult->incrementSucImportDuplicateContact();
                break;
            case ImportStartParseCommand::DUPLICATION_ACTION_REPLACE:
                $contact = $this->importContactService->replace(
                    $contact,
                    $row,
                    $this->user,
                    $this->responsible,
                    $company,
                    $this->origin,
                    $this->comment
                );
                $this->importResult->incrementSucImportDuplicateContact();
                break;
            default:
                break;
        }

        return $contact;
    }

    private function percentOfImport(?int $totalRows, $importId, $token): void
    {
        if (null === $totalRows) {
            throw new ImportException('File does not have total rows', 400);
        }
        $elementPercentStep = ceil($totalRows * self::PERCENT_STEP / self::PERCENT);

        if (($this->currentElement % $elementPercentStep) == 0 || $this->currentElement == $totalRows) {
            $this->currentPercent += self::PERCENT_STEP;

//            CreateSocketUserImportProgressBarEvent::dispatch(
//                $this->currentPercent,
//                $importId,
//                $token
//            );
        }

        $this->currentElement++;
    }

    private function sendNotificationIfCountLessThenMinimum(int $totalRows, int $importId, $token): void
    {
        if ($this->currentElement === $totalRows && $this->currentElement < self::PERCENT_STEP) {
            //
            CreateSocketUserImportProgressBarEvent::dispatch(
                self::PERCENT,
                $importId,
                $token
            );
        }
    }
}
