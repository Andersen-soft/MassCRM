<?php declare(strict_types=1);

namespace App\Http\Resources\Import;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class Statistic extends JsonResource
{
    /**
     * @OA\Schema(
     *     schema="StatisticImport",
     *     required={
     *          "id", "countNewContacts", "countNewCompanies", "countProcessedDuplicateContacts",
     *          "countProcessedDuplicateCompanies", "countMissedDuplicates", "countUnsuccessfully",
     *          "fileNameMissedDuplicates", "fileNameUnsuccessfullyDuplicates"
     *     },
     *     @OA\Property(property="id", type="integer", example=123),
     *     @OA\Property(property="countNewContacts", type="integer", example=20),
     *     @OA\Property(property="countNewCompanies", type="integer", example=30),
     *     @OA\Property(property="countProcessedDuplicateContacts", type="integer", example=40),
     *     @OA\Property(property="countProcessedDuplicateCompanies", type="integer", example=40),
     *     @OA\Property(property="countMissedDuplicates", type="integer", example=60),
     *     @OA\Property(property="countUnsuccessfully", type="integer", example=70),
     *     @OA\Property(property="fileNameMissedDuplicates", type="string", example="/var/www/duplicate.csv"),
     *     @OA\Property(property="fileNameUnsuccessfullyDuplicates", type="string", example="/var/www/error.csv"),
     * )
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
