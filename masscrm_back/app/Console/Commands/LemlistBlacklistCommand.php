<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Services\Blacklist\LemlistService;
use Illuminate\Console\Command;
use Exception;

class LemlistBlacklistCommand extends Command
{
    private LemlistService $lemlistService;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'lemlistBlacklist:command';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Get list blacklist from Lemlist';

    /**
     * Create a new command instance.
     *
     * @param LemlistService $lemlistService
     */
    public function __construct(LemlistService $lemlistService)
    {
        parent::__construct();

        $this->lemlistService = $lemlistService;
    }

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle(): void
    {
        try {
            $this->lemlistService->fetchBlacklistFromLemlist();
        } catch (Exception $exception) {
            app('sentry')->captureException($exception);
        }
    }
}
