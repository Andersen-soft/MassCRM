<?php

namespace App\Commands\Import\Handlers;

use App\Commands\Import\ImportContactsCommand;
use App\Exceptions\Import\ImportException;
use FilesystemIterator;
use PhpOffice\PhpSpreadsheet\IOFactory;

class ImportContactsHandler
{
    protected const PREVIEW_LINES = 3;
    private string $storagePath = '';

    public function __construct()
    {
        $this->storagePath = storage_path('importFiles');
    }

    public function handle(ImportContactsCommand $command): array
    {
        $file = $command->getFile();

        try {
            $fileName = $file->getClientOriginalName();
            $fullPath = $this->storagePath . '/' . $command->getUser()->getId();
            if (is_dir($fullPath)) {
                $this->recursiveRemoveDir($fullPath);
            }
            $file->move($fullPath, $fileName);

            return [
                'file_size' => $this->getFileSize($fullPath . '/' . $fileName),
                'data' => $this->getFirsLines($fullPath . '/' . $fileName),
            ];
        } catch (\Exception $e) {
            throw new ImportException('Import error: ' . $e->getMessage());
        }
    }

    private function getFileSize(string $fullPath)
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
        $headerLength = 0;
        foreach ($spreadsheet->getActiveSheet()->getRowIterator() as $row) {
            $index = $row->getRowIndex();
            if ($rowCount === self::PREVIEW_LINES) {
                break;
            }

            $cellIndex = 0;
            foreach ($row->getCellIterator() as $cell) {
                if ($index === 1) {
                    if ($cell->getValue() === null) break;
                    $data['headers'][] = $cell->getValue();
                    $headerLength++;
                } else {
                    $data['rows'][$rowCount][] = $cell->getValue();
                }
                $cellIndex++;
            }
            if ($index !== 1 && $this->checkRows($data, $rowCount)) {
                $rowCount++;
            }
        }

        return $data;
    }

    private function checkRows(array &$data, int $index): bool
    {
        $emptyCount = 0;
        foreach ($data['rows'][$index] as $value) {
            if (is_null($value)) {
                $emptyCount++;
            } else {
                return true;
            }
            if ($emptyCount === 15) {
                unset($data['rows'][$index]);
                return false;
            }
        }
        return true;
    }

    private function recursiveRemoveDir(string $dir): void
    {
        $includes = new FilesystemIterator($dir);
        foreach ($includes as $include) {
            if (is_dir($include) && !is_link($include)) {
                $this->recursiveRemoveDir($include);
            } else {
                unlink($include);
            }
        }

        rmdir($dir);
    }
}
