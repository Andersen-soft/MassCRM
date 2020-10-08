<?php

namespace App\Rules\Blacklist;

use App\Models\Blacklist;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Lang;

class RegexDomain implements Rule
{
    private string $messageError = 'domain_invalid_format';

    public function passes($attribute, $value): bool
    {
        $value = strtolower(trim($value));
        preg_match(Blacklist::REGEX_EMAIL, $value, $email);
        preg_match(Blacklist::REGEX_DOMAIN, $value, $domain);

        if (!$email && !$domain) {
            $pos = strpos($value, '@');
            if ($pos) {
                $this->messageError = 'email_invalid_format';
            }

            return false;
        }

        return true;
    }

    public function message(): string
    {
        return Lang::get('validation.blacklist.' . $this->messageError);
    }
}
