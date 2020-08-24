<?php

namespace App\Services\Parsers;

use App\Commands\Import\ImportContactsDto;
use App\Commands\Import\ImportStartParseCommand;
use App\Models\Contact\Contact;
use App\Models\User\User;
use App\Services\Parsers\Import\ParserImportCompanyService;
use App\Services\Parsers\Import\ParserImportContactService;
use Illuminate\Support\Facades\Log;
use PhpOffice\PhpSpreadsheet\IOFactory;
use App\Models\Company\Company;

/**
 * Class ParserImportFileService
 * @package App
 */
class ParserImportFileService extends ParserMain implements ParserServiceInterface
{
    protected array $fields = [];
    protected ?string $comment;
    protected User $user;
    protected ImportContactsDto $importContactsData;
    protected ParserImportCompanyService $parserImportCompanyService;
    protected ParserImportContactService $parserImportContactService;
    protected ImportResult $importResult;

    public function __construct(
        ParserImportCompanyService $parserImportCompanyService,
        ParserImportContactService $parserImportContactService,
        ImportResult $importResult,
        ImportContactsDto $importContactsData,
        User $user
    ) {
        $this->fields = $importContactsData->getCommand()->getFields();
        $this->user = $user;
        $this->comment = $importContactsData->getCommand()->getComment();
        $this->importContactsData = $importContactsData;
        $this->parserImportCompanyService = $parserImportCompanyService;
        $this->parserImportContactService = $parserImportContactService;
        $this->importResult = $importResult;
    }

    public function getResult(): ImportResult
    {
        return $this->importResult;
    }

    public function parse(string $pathToFile): void
    {
        $spreadsheet = IOFactory::load($pathToFile);
        $startIndex = $this->importContactsData->getCommand()->isHeader() ? 2 : 1;
        $action = $this->importContactsData->getCommand()->getDuplicationAction();

        foreach ($spreadsheet->getActiveSheet()->getRowIterator($startIndex) as $row) {
            try {
                $arrayRow = $this->rowToArray($row);

                $company = $this->parserImportCompanyService->getUnique($this->fields, $arrayRow);
                $contact = $this->parserImportContactService->getUnique($this->fields, $arrayRow);

                if (
                    $company instanceof Company
                    && $contact instanceof Contact
                    && $action === ImportStartParseCommand::DUPLICATION_ACTION_SKIP
                ) {
                    $this->importResult->incrementDuplicationContact();
                    $this->importResult->addLineToDuplicationFile($arrayRow, 'Duplicate all');
                    continue;
                }

                $company = $this->parseCompany($arrayRow, $action, $company);
                $this->parseContact($arrayRow, $action, $contact, $company);
            } catch (\Exception $exception) {
                Log::error($exception->getMessage());
                $this->importResult->addLineToErrorFile($arrayRow ?? []);
            }
        }
    }

    private function parseCompany(array $arrayRow, string $action, Company $company = null): ?Company
    {
        try {
            if ($company) {
                $company = $this->workWithCompanyAction(
                    $action,
                    $company,
                    $arrayRow
                );
            } else {
                $pos = array_search('company', $this->fields);
                if ($pos === false || !isset($arrayRow[$pos])) {
                    Log::error('Import file. Company name not found');
                    $this->importResult->addLineToErrorFile($arrayRow);
                } else {
                    $this->importResult->incrementSucImportCompany();
                    $company = $this->parserImportCompanyService->createCompany($this->fields, $arrayRow);
                }
            }
        } catch (\Exception $exception) {
            Log::error($exception->getMessage());
            $this->importResult->addLineToErrorFile($arrayRow);
        }

        return $company;
    }

    private function parseContact(array $arrayRow, string $action, Contact $contact = null, Company $company = null): void
    {
        try {
            if ($contact) {
                $this->workWithContactAction(
                    $action,
                    $contact,
                    $arrayRow,
                    $company
                );
            } else {
                $pos = array_search('email', $this->fields);
                if ($pos === false || !isset($arrayRow[$pos])) {
                    Log::error('Import file. Contact email not found');
                    $this->importResult->addLineToErrorFile($arrayRow);
                } else {
                    $this->importResult->incrementSucImportContact();
                    $this->parserImportContactService->create(
                        $arrayRow,
                        $this->user,
                        $this->importContactsData,
                        $company
                    );
                }
            }
        } catch (\Exception $exception) {
            Log::error($exception->getMessage());
            $this->importResult->addLineToErrorFile($arrayRow);
        }
    }

    private function workWithCompanyAction(string $action, Company $company, array $row): Company
    {
        switch ($action) {
            case ImportStartParseCommand::DUPLICATION_ACTION_SKIP:
                $this->importResult->incrementDuplicationCompany();
                $this->importResult->addLineToDuplicationFile($row, 'Duplicate company');
                break;
            case ImportStartParseCommand::DUPLICATION_ACTION_MERGE:
                $company = $this->parserImportCompanyService->merge($company, $row, $this->fields);
                $this->importResult->incrementDuplicationCompany();
                break;
            case ImportStartParseCommand::DUPLICATION_ACTION_REPLACE:
                $company = $this->parserImportCompanyService->replace($company, $row, $this->fields);
                $this->importResult->incrementDuplicationCompany();
                break;
            default:
                break;
        }

        return $company;
    }

    private function workWithContactAction(string $action, Contact $contact, array $row, Company $company = null)
    {
        switch ($action) {
            case ImportStartParseCommand::DUPLICATION_ACTION_SKIP:
                $this->importResult->incrementDuplicationContact();
                $this->importResult->addLineToDuplicationFile($row, 'Duplicate contact');
                break;
            case ImportStartParseCommand::DUPLICATION_ACTION_MERGE:
                $this->parserImportContactService->merge($contact, $row, $this->fields, $company);
                $this->importResult->incrementDuplicationContact();
                break;
            case ImportStartParseCommand::DUPLICATION_ACTION_REPLACE:
                $this->parserImportContactService->replace(
                    $contact,
                    $this->user,
                    $this->importContactsData,
                    $row,
                    $this->fields,
                    $company
                );
                $this->importResult->incrementDuplicationContact();
                break;
            default:
                break;
        }
    }
}
