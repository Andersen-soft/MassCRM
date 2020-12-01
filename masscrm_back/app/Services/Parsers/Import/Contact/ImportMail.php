<?php declare(strict_types=1);

namespace App\Services\Parsers\Import\Contact;

use App\Models\Contact\Contact;

class ImportMail
{
    public function merge(Contact $contact, array $row): void
    {
        if (empty($row['contactMail']['message'])) {
            return;
        }

        $mails = $contact->mails()->pluck('message')->toArray();

        foreach ($row['contactMail']['message'] as $item) {
            if (!empty($item) && !in_array($item, $mails, true)) {
                $contact->mails()->create(['message' => $item]);
            }
        }
    }

    public function replace(Contact $contact, array $row): void
    {
        if (!isset($row['contactMail'])) {
            return;
        }

        $contact->mails()->delete();

        foreach ($row['contactMail']['message'] as $item) {
            if (!empty($item)) {
                $contact->mails()->create(['message' => $item]);
            }
        }
    }

    public function create(Contact $contact, array $row): void
    {
        $this->replace($contact, $row);
    }
}
