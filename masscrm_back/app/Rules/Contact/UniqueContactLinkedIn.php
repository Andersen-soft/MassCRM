<?php

declare(strict_types=1);

namespace App\Rules\Contact;

use App\Http\Requests\AbstractRequest;
use App\Models\Contact\Contact;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Lang;

class UniqueContactLinkedIn implements Rule
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
        $contact = Contact::query()->where('linkedin', 'ILIKE', '%' . $value);

        if ($this->ignoreContactId) {
            $contact->where('id', '!=', $this->ignoreContactId);
        }

        if ($contact->exists()) {
            return false;
        }

        return true;
    }

    public function message(): string
    {
        return Lang::get('validation.contact.linkedIn_unique');
    }
}
