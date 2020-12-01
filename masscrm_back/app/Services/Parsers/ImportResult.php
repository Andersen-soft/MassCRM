<?php

declare(strict_types=1);

namespace App\Services\Parsers;

use App\Models\InformationImport;
use Carbon\Carbon;
use Illuminate\Support\Facades\Lang;
use PhpOffice\PhpSpreadsheet\IOFactory;
use App\Models\User\User;
use App\Models\User\UsersNotification;
use App\Events\User\CreateSocketUserNotificationEvent;

class ImportResult
{
    private const FILE_EXTENSION = '.csv';
    private const DUPLICATES_PREFIX = 'duplicates_';
    private const ERRORS_PREFIX = 'errors_';

    private array $counter = [
        'countNewImportContacts' => 0,
        'countNewImportCompanies' => 0,
        'countDuplicateContacts' => 0,
        'countDuplicateCompanies' => 0,
        'countMissedDuplicates' => 0,
        'countErrors' => 0
    ];

    private array $counterPrevious = [
        'countNewImportContacts' => 0,
        'countNewImportCompanies' => 0,
        'countDuplicateContacts' => 0,
        'countDuplicateCompanies' => 0,
        'countMissedDuplicates' => 0,
        'countErrors' => 0
    ];

    private string $duplicateFileName;

    private string $errorFileName;

    /** @var false|resource $duplicateFile */
    private $duplicateFile;

    /** @var false|resource $errorsFile */
    private $errorsFile;

    public function __construct()
    {
        $time = Carbon::now()->timestamp;
        $path = storage_path('importSuccess/');
        $this->duplicateFileName = $path . self::DUPLICATES_PREFIX . $time . self::FILE_EXTENSION;
        $this->errorFileName = $path. self::ERRORS_PREFIX . $time . self::FILE_EXTENSION;
        $this->duplicateFile = fopen($this->duplicateFileName, 'w+');
        $this->errorsFile = fopen($this->errorFileName, 'w+');
    }

    public function setHeaderToFiles(string $pathToFile): void
    {
        $headers = [];
        $spreadsheet = IOFactory::load($pathToFile);
        foreach ($spreadsheet->getActiveSheet()->getRowIterator(1, 1) as $row) {
            foreach ($row->getCellIterator() as $cell) {
                if ($cell->getValue() === null) {
                    break;
                }
                $headers[] = $cell->getValue();
            }
        }

        $this->addLineToDuplicateFile($headers);
        $this->addLineToErrorFile($headers, 'Error comment');
    }

    public function incrementSucImportContact(): void
    {
        $this->counter['countNewImportContacts']++;
    }

    public function incrementSucImportCompany(): void
    {
        $this->counter['countNewImportCompanies']++;
    }

    public function incrementSucImportDuplicateContact(): void
    {
        $this->counter['countDuplicateContacts']++;
    }

    public function incrementSucImportDuplicateCompany(): void
    {
        $this->counter['countDuplicateCompanies']++;
    }

    public function incrementMissingDuplicate(): void
    {
        $this->counter['countMissedDuplicates']++;
    }

    public function incrementCountErrors(): void
    {
        $this->counterPrevious['countErrors']++;
    }

    public function addLineToDuplicateFile(array $line, string $comment = null): void
    {
        if ($comment) {
            $line[] = $comment;
        }

        fputcsv($this->duplicateFile, $line);
    }

    /**
     * @param array $line
     * @param array|string $comment
     */
    public function addLineToErrorFile(array $line, $comment = null): void
    {
        if ($comment) {
            $line[] = is_array($comment) ?  : $comment;
        }

        fputcsv($this->errorsFile, $line);
    }

    public function failedSaveRow(): void
    {
        $this->counter = $this->counterPrevious;
    }

    public function successSaveRow(): void
    {
        $this->counterPrevious = $this->counter;
    }

    public function save(User $user): InformationImport
    {
        /** @var InformationImport $infoImport */
        $infoImport = $user->informationImport()->create([
            'count_new_contacts' => $this->counter['countNewImportContacts'],
            'count_new_companies' => $this->counter['countNewImportCompanies'],
            'count_processed_duplicate_contacts' => $this->counter['countDuplicateContacts'],
            'count_processed_duplicate_companies' => $this->counter['countDuplicateCompanies'],
            'count_missed_duplicates' => $this->counter['countMissedDuplicates'],
            'count_unsuccessfully' => $this->counter['countErrors'],
            'file_name_missed_duplicates' => $this->duplicateFileName,
            'file_name_unsuccessfully_duplicates' => $this->errorFileName,
        ]);

        CreateSocketUserNotificationEvent::dispatch(
            UsersNotification::TYPE_IMPORT_FINISHED,
            Lang::get('import.finished'),
            [$user],
            '',
            $infoImport->id
        );

        return $infoImport;
    }
}
