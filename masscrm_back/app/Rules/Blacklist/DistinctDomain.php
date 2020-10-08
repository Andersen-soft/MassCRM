<?php

namespace App\Rules\Blacklist;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Lang;
use App\Models\Blacklist;

class DistinctDomain implements Rule
{
    private string $email;

    public function passes($attribute, $values): bool
    {
        $domains = [];
        $domainEmails = [];
        foreach ($values as $key => $value) {
            $value = strtolower(trim($value));
            preg_match(Blacklist::REGEX_GET_DOMAIN_NAME, $value, $matches);
            if ($matches) {
                $domainEmails[$key] = $matches[0];
            } else {
                $domains[$key] = $value;
            }
        }

        $result = array_intersect($domainEmails, $domains);

        if ($result) {
            $this->email = $values[array_key_first($result)];
            return false;
        }

        return true;
    }

    public function message(): string
    {
        return Lang::get('validation.blacklist.email_already_exist_like_domain', ['input' => $this->email]);
    }
}
