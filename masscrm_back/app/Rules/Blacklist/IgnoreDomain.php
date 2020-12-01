<?php declare(strict_types=1);

namespace App\Rules\Blacklist;

use App\Models\Blacklist;
use App\Repositories\Blacklist\BlacklistRepository;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Lang;

class IgnoreDomain implements Rule
{
    public function passes($attribute, $value): bool
    {
        /** @var BlacklistRepository $blacklistRepository */
        $blacklistRepository = app()->make(BlacklistRepository::class);

        $value = strtolower(trim($value));
        preg_match(Blacklist::REGEX_GET_DOMAIN_NAME, $value, $matches);
        if (!$matches && $blacklistRepository->checkIgnoreDomain($value)) {
            return false;
        }

        return true;
    }

    public function message(): string
    {
        return Lang::get('validation.blacklist.domain_exist_in_ignore_list');
    }
}
