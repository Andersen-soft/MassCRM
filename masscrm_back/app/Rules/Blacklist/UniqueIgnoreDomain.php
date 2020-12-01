<?php declare(strict_types=1);

namespace App\Rules\Blacklist;

use App\Models\Blacklist;
use App\Repositories\Blacklist\BlacklistRepository;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Lang;

class UniqueIgnoreDomain implements Rule
{
    private int $currentId;

    public function __construct(int $currentId)
    {
        $this->currentId = $currentId;
    }

    public function passes($attribute, $value): bool
    {
        /** @var BlacklistRepository $blacklistRepository */
        $blacklistRepository = app()->make(BlacklistRepository::class);

        $domains = [];
        $value = strtolower(trim($value));
        preg_match(Blacklist::REGEX_GET_DOMAIN_NAME, $value, $matches);
        if ($matches) {
            $domains[] = $matches[0];
        }

        $domains[] = $value;

        if ($blacklistRepository->checkExistDomains($domains, $this->currentId)) {
            return false;
        }

        return true;
    }

    public function message(): string
    {
        return Lang::get('validation.blacklist.domain_already_exist');
    }
}
