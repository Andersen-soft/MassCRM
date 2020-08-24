<?php

namespace App\Services\Parsers;

use Carbon\Carbon;

class ImportResult
{
    protected const FILE_EXTENSION = '.csv';
    protected const DUPLICATION_PREFIX = 'duplication_';
    protected const ERRORS_PREFIX = 'errors_';

    protected int $successImportContact = 0;
    protected int $successImportCompany = 0;
    protected int $duplicationContact = 0;
    protected int $duplicationCompany = 0;
    protected string $duplicationFileName = '';
    protected string $errorFileName = '';
    protected string $path = '';
    protected $duplicationFile = null;
    protected $errorsFile = null;


    public function __construct()
    {
        $this->path = storage_path('importSuccess/');
        $time = Carbon::now()->timestamp;
        $this->duplicationFileName = self::DUPLICATION_PREFIX . $time . self::FILE_EXTENSION;
        $this->errorFileName = self::ERRORS_PREFIX . $time . self::FILE_EXTENSION;
        $this->duplicationFile = fopen($this->path . $this->duplicationFileName, 'w');
        $this->errorsFile = fopen($this->path . $this->errorFileName, 'w');
    }

    public function incrementSucImportContact(int $count = 1): int
    {
        $this->successImportContact += $count;

        return $this->successImportContact;
    }

    public function incrementSucImportCompany(int $count = 1): int
    {
        $this->successImportCompany += $count;

        return $this->successImportCompany;
    }

    public function incrementDuplicationContact(int $count = 1): int
    {
        $this->duplicationContact += $count;

        return $this->duplicationContact;
    }

    public function incrementDuplicationCompany(int $count = 1): int
    {
        $this->duplicationCompany += $count;

        return $this->duplicationCompany;
    }

    public function getSuccessImportContact(): int
    {
        return $this->successImportContact;
    }

    public function getSuccessImportCompany(): int
    {
        return $this->successImportCompany;
    }

    public function getDuplicationContact(): int
    {
        return $this->duplicationContact;
    }

    public function getDuplicationCompany(): int
    {
        return $this->duplicationCompany;
    }

    public function getDuplicationFileName(): string
    {
        return $this->duplicationFileName;
    }

    public function getErrorFileName(): string
    {
        return $this->errorFileName;
    }

    public function getPath(): string
    {
        return $this->path;
    }

    public function addLineToDuplicationFile(array $line, string $comment = null): void
    {
        if ($comment) {
            $line[] = $comment;
        }
        fputcsv($this->duplicationFile, $line);
    }

    public function addLineToErrorFile(array $line): void
    {
        fputcsv($this->errorsFile, $line);
    }

    public function __destruct()
    {
        $this->closeDuplicationFile();
        $this->closeErrorsFile();
    }

    private function closeDuplicationFile(): void
    {
        fclose($this->duplicationFile);
        $path = $this->path . $this->duplicationFileName;
        if (filesize($path) === 0) {
            unlink($path);
        }
    }

    private function closeErrorsFile(): void
    {
        fclose($this->errorsFile);
        $path = $this->path . $this->errorFileName;
        if (filesize($path) === 0) {
            unlink($path);
        }
    }
}
