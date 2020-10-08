<?php

namespace App\Console\Commands;

use App\Services\TransferCollection\TransferCollectionCompanyService;
use Illuminate\Console\Command;
use Exception;
use Illuminate\Support\Facades\Log;

class TransferCollectionCompany extends Command
{
    private TransferCollectionCompanyService $transferCollectionCompanyService;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'transferCompany:command';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @param TransferCollectionCompanyService $transferCollectionCompanyService
     */
    public function __construct(TransferCollectionCompanyService $transferCollectionCompanyService)
    {
        $this->transferCollectionCompanyService = $transferCollectionCompanyService;
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle(): void
    {
        $this->transferCollectionCompanyService->transfer();
    }
}
