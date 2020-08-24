<?php

namespace App\Repositories\Contact;

use App\Models\Contact\ContactSocialNetworks;

class ContactSocialNetworksRepository
{
    public function checkUniqueness(string $link): bool
    {
        return ContactSocialNetworks::select('id')
            ->where('link', $link)
            ->exists();
    }
}
