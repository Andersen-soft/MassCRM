<?php

namespace App\Services\Parsers\Import\Contact;

use App\Models\Contact\Contact;

class ImportPhone
{
    public function merge(Contact $contact, array $row): void
    {
        if (empty($row['contactPhone']['phone'])) {
            return;
        }

        $phones = $contact->contactPhones()->pluck('phone')->toArray();

        foreach ($row['contactPhone']['phone'] as $item) {
            if (!empty($item) && !in_array($item, $phones, true)) {
                $contact->contactPhones()->create(['phone' => $item]);
            }
        }
    }

    public function replace(Contact $contact, array $row): void
    {
        if (!isset($row['contactPhone'])) {
            return;
        }

        $contact->contactPhones()->delete();

        foreach ($row['contactPhone']['phone'] as $item) {
            if (!empty($item)) {
                $contact->contactPhones()->create(['phone' => $item]);
            }
        }
    }

    public function create(Contact $contact, array $row): void
    {
        $this->replace($contact, $row);
    }
}
