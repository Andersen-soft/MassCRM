<?php declare(strict_types=1);

namespace App\Rules\Blacklist;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Lang;
use App\Services\Blacklist\BlacklistService;

class RegexDomain implements Rule
{
    private string $messageError = 'domain_invalid_format';

    public function passes($attribute, $value): bool
    {
        /** @var BlacklistService $blacklistService */
        $blacklistService = app()->make(BlacklistService::class);
        $value = strtolower(trim($value));

        if ($blacklistService->isValidateDomain($value)) {
            return true;
        }

        $pos = strpos($value, '@');

        if ($pos) {
            $this->messageError = 'email_invalid_format';
        }

        return false;
    }

    public function message(): string
    {
        return Lang::get('validation.blacklist.' . $this->messageError);
    }
}
