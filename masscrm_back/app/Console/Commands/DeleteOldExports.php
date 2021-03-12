<?php declare(strict_types=1);


namespace App\Console\Commands;

use App\Services\Process\ProcessService;
use Illuminate\Console\Command;

class DeleteOldExports extends Command
{
    public const DEFAULT_TYPES = ['export_contacts', 'export_blacklist'];

    protected $signature = 'deleteOldExports
                            {exports? : [contacts, blacklist]}
                            {--days=90 : update to all}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = "Delete old exports (contacts or blacklists)";

    /**
     * @var ProcessService
     */
    private ProcessService $processService;

    public function __construct(ProcessService $processService)
    {
        $this->processService = $processService;
        parent::__construct();
    }

    public function handle(): void
    {
        $this->processService->clearProcesses($this->getType(), (int)$this->option('days'));
        $this->info("The Old Exports has been deleted.");
    }

    private function getType()
    {
        switch ($this->argument('exports')) {
            case 'contacts':
                return 'export_contacts';
            case 'blacklist':
                return 'export_blacklist';
            default:
                return self::DEFAULT_TYPES;
        }
    }
}
