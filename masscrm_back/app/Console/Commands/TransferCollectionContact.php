<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Services\TransferCollection\TransferCollectionContactService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Exception;

class TransferCollectionContact extends Command
{
    private TransferCollectionContactService $transferCollectionContactService;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'transferContact:command';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @param TransferCollectionContactService $transferCollectionContactService
     */
    public function __construct(TransferCollectionContactService $transferCollectionContactService)
    {
        $this->transferCollectionContactService = $transferCollectionContactService;
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle(): void
    {
        $this->transferCollectionContactService->transfer();
    }
}
