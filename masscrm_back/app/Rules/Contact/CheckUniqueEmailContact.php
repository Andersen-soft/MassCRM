<?php

namespace App\Rules\Contact;

use App\Repositories\Contact\ContactEmailsRepository;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Lang;

class CheckUniqueEmailContact implements Rule
{
    private ?int $contactId;

    public function __construct(int $contactId = null)
    {
        $this->contactId = $contactId;
    }

    public function passes($attribute, $value): bool
    {
        /** @var ContactEmailsRepository $contactEmailRepository */
        $contactEmailRepository = app()->make(ContactEmailsRepository::class);

        if ($contactEmailRepository->checkUniquenessEmail(trim($value), $this->contactId)) {
            return false;
        }

        return true;
    }

    public function message(): string
    {
        return Lang::get('validation.contact_email_already_exist');
    }
}
