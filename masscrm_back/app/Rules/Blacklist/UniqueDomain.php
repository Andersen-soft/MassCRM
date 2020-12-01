<?php declare(strict_types=1);

namespace App\Rules\Blacklist;

use App\Models\Blacklist;
use Illuminate\Contracts\Validation\Rule;
use App\Repositories\Blacklist\BlacklistRepository;
use Illuminate\Support\Facades\Lang;

class UniqueDomain implements Rule
{
    public function passes($attribute, $value): bool
    {
        /** @var BlacklistRepository $blacklistRepository */
        $blacklistRepository = app()->make(BlacklistRepository::class);

        $domains = [];
        $value = strtolower(trim($value));
        preg_match(Blacklist::REGEX_GET_DOMAIN_NAME, $value, $matches);
        if ($matches) {
            $domains[] = $matches[0];
        } else {
            $domains[] = $value;
        }

        if ($blacklistRepository->checkExistDomains($domains)) {
            return false;
        }

        return true;
    }

    public function message(): string
    {
        return Lang::get('validation.blacklist.domain_already_exist');
    }
}
