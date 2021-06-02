<?php

declare(strict_types=1);

namespace App\Services\Import;

use App\Commands\Import\ImportContactsCommand;
use App\Commands\Import\ImportContactsDto;
use App\Commands\Import\ImportStartParseCommand;
use App\Exceptions\Custom\NotFoundException;
use App\Exceptions\Import\ImportException;
use App\Jobs\ImportContactsJob;
use App\Models\InformationImport;
use App\Models\Process;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Shared\Date;

class ImportService
{
    private const EXCEL_FORMAT = ['Xlsx', 'Xls', 'Xml'];

    protected const PREVIEW_LINES = 3;

    protected const IMPORT_CONTACT_QUEUE = 'import_contact';

    private string $storagePath;

    public function __construct()
    {
        $this->storagePath = storage_path('importFiles');
    }

    public function getStatisticImport(int $id): InformationImport
    {
        $result = InformationImport::query()->find($id);
        if (!$result) {
            throw new NotFoundException('Import value(' . $id . ') not found');
        }

        return $result;
    }

    public function uploadFile(ImportContactsCommand $command): array
    {
        $file = $command->getFile();

        try {
            $fileInfo = pathinfo($file->getClientOriginalName());
            $fileName = sprintf('%s_%s.%s', trim($fileInfo['filename']), time(), $fileInfo['extension']);

            Storage::disk('importFiles')->put(
                $command->getUser()->id . '/' . $fileName,
                file_get_contents($file->path())
            );

            $fullPath = $this->storagePath . DIRECTORY_SEPARATOR . $command->getUser()->id
                . DIRECTORY_SEPARATOR . $fileName;

            $this->fileFormatting($fullPath, $fileName);

            return [
                'file_size' => $this->getFileSize($fullPath),
                'data' => $this->getFirsLines($fullPath),
                'file_name' => $fileName
            ];
        } catch (\Exception $e) {
            throw new ImportException('Import error: ' . $e->getMessage());
        }
    }

    private function getFileSize(string $fullPath): string
    {
        $bytes = filesize($fullPath);
        $base = log($bytes, 1024);
        $suffixes = ['', 'kb', 'mb', 'gb', 'tb'];

        return round(pow(1024, $base - floor($base)), 2) . ' ' . $suffixes[floor($base)];
    }

    private function getFirsLines(string $fullPath): array
    {
        $data = [
            'headers' => [],
            'rows' => [],
        ];
        $spreadsheet = IOFactory::load($fullPath);
        $rowCount = 0;

        foreach ($spreadsheet->getActiveSheet()->getRowIterator() as $row) {
            $index = $row->getRowIndex();
            if ($rowCount === self::PREVIEW_LINES) {
                break;
            }

            foreach ($row->getCellIterator() as $cell) {
                if ($index === 1) {
                    if ($cell->getValue() === null) {
                        break;
                    }
                    $data['headers'][] = $cell->getValue();
                } else {
                    if (Date::isDateTime($cell)) {
                        $data['rows'][$rowCount][] = \date('Y-m-d H:i', Date::excelToTimestamp($cell->getValue()));
                    } else {
                        $data['rows'][$rowCount][] = $cell->getValue();
                    }
                }
            }
            if ($index !== 1) {
                $rowCount++;
            }
        }

        return $data;
    }

    private function fileFormatting(string $fullPath, string $fileName): void
    {
        $format = ucfirst(pathinfo($fileName, PATHINFO_EXTENSION));

        $spreadsheet = IOFactory::load($fullPath);
        if ($spreadsheet->getSheetCount() < 2) {
            return;
        }

        for ($index = 0; $index < $spreadsheet->getSheetCount(); $index++) {
            if ($spreadsheet->getSheet($index)->getHighestDataRow() < 2) {
                if ($spreadsheet->getSheet($index)->getHighestDataRow() < 2) {
                    $spreadsheet->removeSheetByIndex($index);
                    $index--;
                }
            }

            $writer = IOFactory::createWriter($spreadsheet, $format);
            $writer->setPreCalculateFormulas(false);
            $writer->save($fullPath);
        }
    }

    public function startParse(ImportStartParseCommand $command): void
    {
        try {
            $filePath = $this->checkFileExist($command->getUser()->getId(), $command->getFileName());

            /** @var Process $process */
            $process = $command->getUser()->processes()->create([
                'name' => Lang::get('import.name_import', ['file' => basename($filePath)]),
                'status' => Process::TYPE_STATUS_PROCESS_WAIT,
                'type' => Process::TYPE_PROCESS_IMPORT_CONTACT,
                'file_path' => $filePath
            ]);

            ImportContactsJob::dispatch(
                new ImportContactsDto($command, $filePath, $process, $command->getToken())
            );

        } catch (ImportException $e) {
            logger($e->getMessage());
        }
    }

    private function checkFileExist(int $userId, string $fileName): string
    {
        $path = $this->storagePath . DIRECTORY_SEPARATOR . $userId . DIRECTORY_SEPARATOR . $fileName;
        if (!file_exists($path)) {
            throw new ImportException('File to import not found', 404);
        }

        return $path;
    }
}
