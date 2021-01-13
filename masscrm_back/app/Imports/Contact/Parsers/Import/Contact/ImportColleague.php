<?php declare(strict_types=1);

namespace App\Imports\Contact\Parsers\Import\Contact;

use App\Models\Contact\Contact;

class ImportColleague
{
    public function merge(Contact $contact, array $row): void
    {
        if (empty($row['contactColleague']['full_name'])) {
            return;
        }

        $colleagues = $contact->contactColleagues()->pluck('full_name')->toArray();

        foreach ($row['contactColleague']['full_name'] as $item) {
            if (!empty($item) && !in_array($item, $colleagues, true)) {
                $contact->contactColleagues()->create(['full_name' => $item]);
            }
        }
    }

    public function replace(Contact $contact, array $row): void
    {
        if (!isset($row['contactColleague'])) {
            return;
        }

        $contact->contactColleagues()->delete();

        foreach ($row['contactColleague']['full_name'] as $item) {
            if (!empty($item)) {
                $contact->contactColleagues()->create(['full_name' => $item]);
            }
        }
    }

    public function create(Contact $contact, array $row): void
    {
        $this->replace($contact, $row);
    }
}
