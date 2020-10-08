<?php

namespace App\Services\Parsers\Import\Contact;

use App\Models\CampaignStatus;
use App\Models\Contact\ContactCampaigns;
use App\Models\Contact\Contact;

class ImportCampaign
{
    public function merge(Contact $contact, array $row): void
    {
        if (empty($row['contactCampaigns'])) {
            return;
        }

        $sequences = $contact->sequences()->pluck('sequence')->toArray();

        foreach ($row['contactCampaigns']['sequence'] as $key => $item) {
            if (!in_array($item, $sequences, true)) {
                $status = $this->createOrGetStatus($item);
                $newSequence = new ContactCampaigns();
                $newSequence->sequence = trim($item);
                $newSequence = $newSequence->status()->associate($status);
                $contact->sequences()->save($newSequence);
            }
        }
    }

    public function create(Contact $contact, array $row): void
    {
        $this->replace($contact, $row);
    }

    public function replace(Contact $contact, array $row): void
    {
        if (!isset($row['contactCampaigns'])) {
            return;
        }

        $contact->sequences()->delete();
        $this->createNewSequence($contact, $row['contactCampaigns']);
    }

    private function createNewSequence(Contact $contact, array $sequences): void
    {
        $newSequences = [];

        foreach ($sequences['sequence'] as $key => $item) {
            if (!empty($sequences['status_id'][$key])) {
                $status = $this->createOrGetStatus($sequences['status_id'][$key]);
                $newSequence = new ContactCampaigns();
                $newSequence->sequence = trim($item);
                $newSequence = $newSequence->status()->associate($status);
                $newSequences[] = $newSequence;
            }
        }

        $contact->sequences()->saveMany($newSequences);
    }

    private function createOrGetStatus(string $statusName): CampaignStatus
    {
        return CampaignStatus::query()->firstOrCreate(['name' => $statusName]);
    }
}
