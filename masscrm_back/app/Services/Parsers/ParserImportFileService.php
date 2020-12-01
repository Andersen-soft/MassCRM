<?php

declare(strict_types=1);

namespace App\Services\Parsers;

use App\Commands\Import\ImportContactsDto;
use App\Commands\Import\ImportStartParseCommand;
use App\Models\Contact\Contact;
use App\Models\InformationImport;
use App\Models\User\User;
use App\Services\Parsers\Import\Company\ImportCompanyService;
use App\Services\Parsers\Import\Contact\ImportContactService;
use App\Services\TransferCollection\TransferCollectionCompanyService;
use App\Services\TransferCollection\TransferCollectionContactService;
use Illuminate\Support\Facades\Log;
use PhpOffice\PhpSpreadsheet\IOFactory;
use App\Models\Company\Company;
use App\Services\Parsers\Mapping\FieldMapping;
use Illuminate\Support\Facades\DB;
use Exception;
use App\Exceptions\Import\ImportFileException;

/**
 * Class ParserImportFileService
 * @package App
 */
class ParserImportFileService extends ParserMain
{
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

    public function __construct(
        ImportCompanyService $importCompanyService,
        ImportContactService $importContactService,
        ImportResult $importResult,
        FieldMapping $fieldMapping,
        TransferCollectionCompanyService $transferCollectionCompanyService,
        TransferCollectionContactService $transferCollectionContactService
    ) {
        $this->importCompanyService = $importCompanyService;
        $this->importContactService = $importContactService;
        $this->importResult = $importResult;
        $this->fieldMapping = $fieldMapping;
        $this->transferCollectionCompanyService = $transferCollectionCompanyService;
        $this->transferCollectionContactService = $transferCollectionContactService;
    }

    public function setParamsImport(ImportContactsDto $importContactsData): void
    {
        $this->fields = $importContactsData->getCommand()->getFields();
        $this->comment = $importContactsData->getCommand()->getComment();
        $this->columnSeparator = $importContactsData->getCommand()->getColumnSeparator();
        $this->action = $importContactsData->getCommand()->getDuplicationAction();
        $this->origin = $importContactsData->getCommand()->getOrigin();
        $this->responsible = $importContactsData->getCommand()->getResponsible();
        $this->user = $importContactsData->getCommand()->getUser();
        $this->importContactsData = $importContactsData;
    }

    public function parse(string $pathToFile): InformationImport
    {
        $spreadsheet = IOFactory::load($pathToFile);
        $startIndex = $this->importContactsData->getCommand()->isHeader() ? 2 : 1;

        if ($startIndex === 2) {
            $this->importResult->setHeaderToFiles($pathToFile);
        }

        foreach ($spreadsheet->getActiveSheet()->getRowIterator($startIndex) as $row) {
            $arrayRow = $this->rowToArray($row, count($this->fields));
            if (empty(array_filter($arrayRow))) {
                break;
            }

            try {
                DB::beginTransaction();
                $data = $this->fieldMapping->mappingFields($arrayRow, $this->fields, $this->columnSeparator);

                $company = $this->importCompanyService->getUnique($this->fields, $arrayRow);
                $contact = $this->importContactService->getUnique($this->fields, $data);

                if ($contact instanceof Contact && $this->action === ImportStartParseCommand::DUPLICATION_ACTION_SKIP) {
                    $this->importResult->addLineToDuplicateFile($arrayRow);
                    $this->importResult->incrementMissingDuplicate();
                    $this->importResult->successSaveRow();
                    DB::commit();
                    continue;
                }

                $company = $this->parseCompany($data, $company);
                $contact = $this->parseContact($data, $contact, $company);
                $this->transferCollectionContactService->updateCollectionContact($contact);
                if ($company) {
                    $this->transferCollectionCompanyService->updateCollectionCompany($company);
                }

                $this->importResult->successSaveRow();
                DB::commit();
            } catch (Exception $exception) {
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

        return $this->importResult->save($this->user);
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
                $contact =  $this->importContactService->replace(
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
}
