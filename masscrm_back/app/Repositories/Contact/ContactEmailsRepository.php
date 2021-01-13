<?php

declare(strict_types=1);

namespace App\Repositories\Contact;

use App\Models\Contact\Contact;
use App\Models\Contact\ContactEmails;

class ContactEmailsRepository
{
    public function checkUniqueness(string $email): bool
    {
        return ContactEmails::query()->select('id')
            ->where('email', 'ILIKE', $email)
            ->exists();
    }

    public function checkUniquenessEmailContact(Contact $contact, string $email): bool
    {
        return ContactEmails::query()->select('id')
            ->where('contact_id', '=', $contact->id)
            ->where('email', 'ILIKE', $email)
            ->exists();
    }

    public function checkUniquenessNoEmailImport(string $email): bool
    {
        return ContactEmails::query()->select('id')
            ->where('email', 'ILIKE', $email)
            ->where('email', '!=', Contact::EXCEPT_EMAIL_TEMPLATE)
            ->exists();
    }

    public function checkUniquenessContactNoEmailImport(Contact $contact, string $email): bool
    {
        return ContactEmails::query()->select('id')
            ->where('contact_id', '=', $contact->id)
            ->where('email', 'ILIKE', $email)
            ->where('email', '!=', Contact::EXCEPT_EMAIL_TEMPLATE)
            ->exists();
    }

    public function checkUniquenessEmail(string $email, int $contactId = null): bool
    {
        $query = ContactEmails::query()->select('id')
            ->where('email', 'ILIKE', $email)
            ->where('email', '!=', Contact::EXCEPT_EMAIL_TEMPLATE);

        if ($contactId) {
            $query->where('contact_id', '!=', $contactId);
        }

        return $query->exists();
    }
}
