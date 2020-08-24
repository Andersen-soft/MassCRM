<?php

namespace App\Repositories\Contact;

use App\Models\Contact\ContactColleagues;

class ContactColleaguesRepository
{
    public function checkUniqueness(array $colleague): bool
    {
        $query = ContactColleagues::query()->where('link', '=', $colleague['link']);
        if (!empty($colleague['id'])) {
           $query->whereKeyNot($colleague['id']);
        }

        return $query->exists();
    }
}
