<?php

namespace App\Services\Parsers\Import\Contact;

use App\Models\Contact\Contact;

class ImportNote
{
    public function merge(Contact $contact, array $row): void
    {
        if (empty($row['contactNote']['my_notes'])) {
            return;
        }

        $notes = $contact->notes()->pluck('message')->toArray();

        foreach ($row['contactNote']['message'] as $item) {
            if (!empty($item) && !in_array($item, $notes, true)) {
                $contact->notes()->create(['message' => $item]);
            }
        }
    }

    public function replace(Contact $contact, array $row): void
    {
        if (!isset($row['contactNote'])) {
            return;
        }

        $contact->notes()->delete();

        foreach ($row['contactNote']['message'] as $item) {
            if (!empty($item)) {
                $contact->notes()->create(['message' => $item]);
            }
        }
    }

    public function create(Contact $contact, array $row): void
    {
        $this->replace($contact, $row);
    }
}
