<?php declare(strict_types=1);

namespace App\Services\Blacklist;

use App\Repositories\Blacklist\BlacklistRepository;
use Illuminate\Support\Facades\Http;

class ReplyService
{
    private const NAME_SERVICE = 'Reply';

    private const DOMAINS = 'domains';

    private BlacklistService $blacklistService;

    private BlacklistRepository $blacklistRepository;

    public function __construct(BlacklistService $blacklistService, BlacklistRepository $blacklistRepository)
    {
        $this->blacklistService = $blacklistService;
        $this->blacklistRepository = $blacklistRepository;
    }

    public function fetchBlacklistFromReply(string $replyUrlBlacklist): void
    {
        $response = Http::withHeaders([
            'x-api-key' => config('app.reply_api_key')
        ])->get($replyUrlBlacklist)->json();

        if (empty($response[self::DOMAINS])) {
            return;
        }

        $emails = [];

        foreach ($response[self::DOMAINS] as $item) {
            if (!$this->blacklistService->isValidateDomain($item)) {
                continue;
            }

            $domain = $this->blacklistService->getDomainFromEmail($item);
            if (!$domain && $this->blacklistRepository->checkIgnoreDomain($item)) {
                continue;
            }

            if (!$this->blacklistService->checkEmailInBlackList($item)) {
                $emails[] = $item;
            }
        }

        $this->blacklistService->addNewDomains($emails, null, self::NAME_SERVICE);
    }
}
