<?php

namespace App\Services\Parsers\Import\Contact;

use App\Models\Contact\Contact;
use App\Models\Contact\ContactSale;
use App\Models\SaleStatus;
use App\Models\Source;

class ImportSale
{
    public function replace(Contact $contact, array $row): void
    {
        if (empty($row['contactSales'])) {
            return;
        }

        $this->createNewSale($contact, $row['contactSales']);
    }

    public function create(Contact $contact, array $row): void
    {
        $this->replace($contact, $row);
    }

    private function createNewSale(Contact $contact, array $row): void
    {
        $contact->sales()->delete();
        $count = count($row['link']);
        for ($i = 0; $i < $count; $i++) {
            if (!empty($row['link'][$i]) && !empty($row['created_at'][$i]) && !empty($row['project_c1'][$i])) {
                $status = $this->createOrGetStatus($row['status_id'][$i]);
                $source = $this->createOrGetSource($row['source_id'][$i]);
                $sale = new ContactSale();
                $sale->created_at = $row['created_at'][$i];
                $sale->link = $row['link'][$i];
                $sale->project_c1 = !empty($row['project_c1'][$i]);
                $sale->status()->associate($status);
                $sale->source()->associate($source);
                $contact->sales()->save($sale);
            }
        }
    }

    private function createOrGetStatus(string $name): SaleStatus
    {
        return SaleStatus::query()->firstOrCreate(['name' => $name]);
    }

    private function createOrGetSource(string $name): Source
    {
        return Source::query()->firstOrCreate(['name' => $name]);
    }
}
