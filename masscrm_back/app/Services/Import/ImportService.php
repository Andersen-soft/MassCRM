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
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Shared\Date;

class ImportService
{
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
            throw new NotFoundException('Import value(' . $id. ') not found');
        }

        return $result;
    }

    public function uploadFile(ImportContactsCommand $command): array
    {
        $file = $command->getFile();

        try {
            $fileName = $file->getClientOriginalName();
            $fullPath = $this->storagePath . '/' . $command->getUser()->id;
            Storage::disk('importFiles')->deleteDirectory((string) $command->getUser()->id);
            Storage::disk('importFiles')->put(
                $command->getUser()->id . '/' . $fileName,
                file_get_contents($file->path())
            );

            return [
                'file_size' => $this->getFileSize($fullPath . '/' . $fileName),
                'data' => $this->getFirsLines($fullPath . '/' . $fileName),
            ];
        } catch (\Exception $e) {
            throw new ImportException('Import error: ' . $e->getMessage());
        }
    }

    private function getFileSize(string $fullPath) : string
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

    public function startParse(ImportStartParseCommand $command): void
    {
        try {
            $filePath = $this->checkFileExist($command->getUser()->getId());

            /** @var Process $process */
            $process = $command->getUser()->processes()->create([
                'name' => Lang::get('import.name_import', ['file' => basename($filePath)]),
                'status' => Process::TYPE_STATUS_PROCESS_WAIT,
                'type' => Process::TYPE_PROCESS_IMPORT_CONTACT
            ]);

            ImportContactsJob::dispatch(
                new ImportContactsDto($command, $filePath, $process, $command->getToken())
            );

        } catch (ImportException $e) {
            logger($e->getMessage());
        }
    }

    private function checkFileExist(int $userId): string
    {
        $path = storage_path('importFiles') . '/' . $userId;
        if (!file_exists($path) && !is_dir($path)) {
            throw new ImportException('File to import not found', 404);
        }
        $fileNames = array_diff(scandir($path), ['.', '..']);
        $fileName = array_shift($fileNames);
        if (!$fileName) {
            throw new ImportException('File to import not found', 404);
        }

        return $path . '/' . $fileName;
    }
}
