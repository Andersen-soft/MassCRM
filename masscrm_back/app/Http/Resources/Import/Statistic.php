<?php

namespace App\Http\Resources\Import;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class Statistic extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param Request $request
     * @return array
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'countNewContacts' => $this->count_new_contacts,
            'countNewCompanies' => $this->count_new_companies,
            'countProcessedDuplicateContacts' => $this->count_processed_duplicate_contacts,
            'countProcessedDuplicateCompanies' => $this->count_processed_duplicate_companies,
            'countMissedDuplicates' => $this->count_missed_duplicates,
            'countUnsuccessfully' => $this->count_unsuccessfully,
            'fileNameMissedDuplicates' => $this->file_name_missed_duplicates,
            'fileNameUnsuccessfullyDuplicates' => $this->file_name_unsuccessfully_duplicates,
        ];
    }
}
