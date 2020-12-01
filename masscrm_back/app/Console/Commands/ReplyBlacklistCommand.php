<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Services\Blacklist\ReplyService;
use Exception;
use Illuminate\Console\Command;

class ReplyBlacklistCommand extends Command
{
    private ReplyService $replyService;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'replyBlacklist:command';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Get list blacklist from Reply';

    /**
     * Create a new command instance.
     *
     * @param ReplyService $replyService
     */
    public function __construct(ReplyService $replyService)
    {
        parent::__construct();

        $this->replyService = $replyService;
    }

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle(): void
    {
        $urls = [config('app.reply_blacklist_domains_api_url'), config('app.reply_blacklist_emails_api_url')];

        foreach ($urls as $url) {
            try {
                $this->replyService->fetchBlacklistFromReply($url);
            } catch (Exception $exception) {
                app('sentry')->captureException($exception);
            }
        }
    }
}
