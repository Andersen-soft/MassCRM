<?php declare(strict_types=1);

namespace App\Services\Blacklist;

use App\Repositories\Blacklist\BlacklistRepository;
use Illuminate\Support\Facades\Http;

class LemlistService
{
    private const LIMIT = 50;

    private const NAME_SERVICE = 'Lemlist';

    private BlacklistService $blacklistService;

    private BlacklistRepository $blacklistRepository;

    public function __construct(BlacklistService $blacklistService, BlacklistRepository $blacklistRepository)
    {
        $this->blacklistService = $blacklistService;
        $this->blacklistRepository = $blacklistRepository;
    }

    public function fetchBlacklistFromLemlist(): void
    {
        $offset = 0;


        do {
            $responses = $this->getDataByMultipleConnections($offset);
            $emails = [];

            foreach ($responses as $response) {
                foreach ($response as $key => $item) {
                    if (!$this->blacklistService->isValidateDomain($item['value'])) {
                        continue;
                    }

                    $domain = $this->blacklistService->getDomainFromEmail($item['value']);
                    if (!$domain && $this->blacklistRepository->checkIgnoreDomain($item['value'])) {
                        continue;
                    }

                    if (!$this->blacklistService->checkEmailInBlackList($item['value'])) {
                        $emails[] = $item['value'];
                    }
                }
            }

            $this->blacklistService->addNewDomains($emails, null, self::NAME_SERVICE);
            $offset += self::LIMIT;
        } while ($response);
    }

    private function mapPasswords(): array
    {
        return [
            config('app.lemlist_password'),
            config('app.lemlist_password_second')
        ];
    }

    private function getDataByMultipleConnections(int $offset): array
    {
        $data = [];

        foreach ($this->mapPasswords() as $password){
            $data[] = Http::withBasicAuth(
                trim(config('app.lemlist_username_second')),
                $password
            )->get(
                config('app.lemlist_blacklist_api_url'),
                ['offset' => $offset, 'limit' => self::LIMIT]
            )->json();

        }

        return $data;
    }
}
