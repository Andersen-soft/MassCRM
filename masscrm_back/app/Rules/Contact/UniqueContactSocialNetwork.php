<?php

declare(strict_types=1);

namespace App\Rules\Contact;

use App\Http\Requests\AbstractRequest;
use App\Models\Contact\ContactSocialNetworks;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Lang;

class UniqueContactSocialNetwork implements Rule
{
    private ?int $ignoreContactId;

    public function __construct(int $ignoreContactId = null)
    {
        $this->ignoreContactId = $ignoreContactId;
    }

    public function passes($attribute, $value): bool
    {
        preg_match(AbstractRequest::REGEX_GET_URL, $value, $matches);
        $value = str_replace($matches[0], '', $value);
        $socialNetwork = ContactSocialNetworks::query()->where('link', 'ILIKE', '%' . $value);

        if ($this->ignoreContactId) {
            $socialNetwork->where('contact_id', '!=', $this->ignoreContactId);
        }

        if ($socialNetwork->exists()) {
            return false;
        }

        return true;
    }

    public function message(): string
    {
        return Lang::get('validation.social_networks_link_already_exist');
    }
}
