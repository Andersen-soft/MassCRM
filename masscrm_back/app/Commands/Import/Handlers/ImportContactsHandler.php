<?php

namespace App\Commands\Import\Handlers;

use App\Commands\Import\ImportContactsCommand;
use App\Exceptions\Import\ImportException;
use PhpOffice\PhpSpreadsheet\IOFactory;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpSpreadsheet\Shared\Date;

class ImportContactsHandler
{
    protected const PREVIEW_LINES = 3;
    private string $storagePath;

    public function __construct()
    {
        $this->storagePath = storage_path('importFiles');
    }

    public function handle(ImportContactsCommand $command): array
    {
        $file = $command->getFile();

        try {
            $fileName = $file->getClientOriginalName();
            $fullPath = $this->storagePath . '/' . $command->getUser()->id;
            Storage::disk('importFiles')->deleteDirectory($command->getUser()->id);
            Storage::disk('importFiles')->put(
                $command->getUser()->id . '/' . $fileName,
                file_get_contents($file)
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
                    if(Date::isDateTime($cell)){
                        $data['rows'][$rowCount][] = \date('Y-m-d H:i', Date::excelToTimestamp($cell->getValue()));
                    }else{
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
}
