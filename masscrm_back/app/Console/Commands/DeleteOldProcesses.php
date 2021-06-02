<?php declare(strict_types=1);


namespace App\Console\Commands;

use App\Services\Process\ProcessService;
use Illuminate\Console\Command;

class DeleteOldProcesses extends Command
{
    public const EXPORT_CONTACTS = 'export_contacts';
    public const EXPORT_BLACKLIST = 'export_blacklist';
    public const IMPORT_CONTACTS = 'import_contacts';

    public const DEFAULT_TYPES = [
        self::EXPORT_CONTACTS,
        self::EXPORT_BLACKLIST,
        self::IMPORT_CONTACTS
    ];

    protected $signature = "deleteOldProcesses
                            {types?* : [export_contacts, export_blacklist, import_contacts]}
                            {--days=90 : days to delete}";


    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = "Delete old processes";

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
        $types = $this->argument('types');
        $types = !empty($types) ? $types : self::DEFAULT_TYPES;

        $this->processService->clearProcesses($types, (int)$this->option('days'));
        $this->info("The Old processes has been deleted.");
    }
}
