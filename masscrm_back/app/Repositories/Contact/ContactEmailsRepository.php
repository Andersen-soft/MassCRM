<?php

namespace App\Repositories\Contact;


use App\Models\Contact\ContactEmails;

class ContactEmailsRepository
{
    public function checkUniqueness(string $email): bool
    {
        return ContactEmails::select('id')
            ->where('email', $email)
            ->exists();
    }
}
