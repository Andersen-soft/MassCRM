<?php

declare(strict_types=1);

namespace App\Repositories\Contact;

use App\Models\Contact\ContactSocialNetworks;

class ContactSocialNetworksRepository
{
    public function checkUniqueness(string $link): bool
    {
        return ContactSocialNetworks::query()->select('id')
            ->where('link', 'ILIKE', $link)
            ->exists();
    }
}
