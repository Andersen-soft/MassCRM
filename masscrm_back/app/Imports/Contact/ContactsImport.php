<?php

declare(strict_types=1);

namespace App\Imports\Contact;

use App\Commands\Import\ImportContactsDto;
use App\Imports\Contact\Parsers\ParserImportFileService;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\OnEachRow;
use Maatwebsite\Excel\Concerns\WithStartRow;
use Maatwebsite\Excel\Row;

/**
 * Class ContactsImport
 *
 * @package App\Imports
 */
class ContactsImport implements
    OnEachRow,
    WithStartRow
{
    use Importable;

    /**
     * @var ParserImportFileService $parserImportFileService
     */
    public ParserImportFileService $parserImportFileService;

    /**
     * @var ImportContactsDto
     */
    public ImportContactsDto $importContacts;

    /**
     * ContactsImport constructor.
     *
     * @param  ImportContactsDto  $importContacts
     * @param  ParserImportFileService  $parserImportFileService
     */
    public function __construct(
        ImportContactsDto $importContacts,
        ParserImportFileService $parserImportFileService
    ) {
        $this->importContacts = $importContacts;
        $this->parserImportFileService = $parserImportFileService;
    }

    /**
     * @param Row $row
     */
    public function onRow(Row $row): void
    {
        $this->parserImportFileService->parseRow(
            $row->toArray(),
            $this->importContacts->getTotalRows(),
            $this->importContacts->getProcess()->id
        );
    }

    /**
     * @return int
     */
    public function startRow(): int
    {
       return $this->importContacts->getCommand()->isHeader() ? 2 : 1;
    }
}
