<?php declare(strict_types=1);

namespace App\Commands\Import;

use App\Models\Process;

/**
 * Class ImportContactsDto
 * @package  App\Commands\Filter
 */
class ImportContactsDto
{
    protected ImportStartParseCommand $command;
    protected string $fullPath;
    protected Process $process;
    protected ?int $totalRows;
    protected string $token;

    public function __construct(
        ImportStartParseCommand $command,
        string $fullPath,
        Process $process,
        string $token,
        ?int $totalRows = null
    )
    {
        $this->command = $command;
        $this->fullPath = $fullPath;
        $this->process = $process;
        $this->token = $token;
        $this->totalRows = $totalRows;
    }

    public function getCommand(): ImportStartParseCommand
    {
        return $this->command;
    }

    public function getFullPath(): string
    {
        return $this->fullPath;
    }

    public function getProcess(): Process
    {
        return $this->process;
    }

    public function getTotalRows(): ?int
    {
        return $this->totalRows;
    }

    public function setTotalRows(?int $totalRows): self
    {
        $this->totalRows = $totalRows;

        return $this;
    }

    public function getToken(): string
    {
        return $this->token;
    }
}
