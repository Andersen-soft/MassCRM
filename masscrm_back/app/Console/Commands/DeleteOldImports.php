<?php declare(strict_types=1);

namespace App\Console\Commands;

use App\Services\InformationImport\InformationImportService;
use Illuminate\Console\Command;

class DeleteOldImports extends Command
{
    protected $signature = 'deleteOldImports {--days=90 : update to all}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Delete old imports';

    /**
     * @var InformationImportService
     */
    private InformationImportService $informationImportService;

    public function __construct(InformationImportService $informationImportService)
    {
        $this->informationImportService = $informationImportService;
        parent::__construct();
    }

    public function handle(): void
    {
        $this->informationImportService->deleteOldImportData((int)$this->option('days'));
        $this->info("The Old Imports has been deleted.");
    }
}
