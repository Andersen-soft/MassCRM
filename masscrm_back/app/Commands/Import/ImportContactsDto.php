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

    public function __construct(ImportStartParseCommand $command, string $fullPath, Process $process)
    {
        $this->command = $command;
        $this->fullPath = $fullPath;
        $this->process = $process;
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
}
