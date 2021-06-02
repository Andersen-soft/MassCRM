<?php
declare(strict_types=1);

namespace App\Services\InformationImport;

use App\Models\InformationImport;
use App\Repositories\InformationImport\InformationImportRepository;
use Illuminate\Support\Facades\File;

class InformationImportService
{
    private InformationImportRepository $informationImportRepository;

    public function __construct(InformationImportRepository $informationImportRepository)
    {
        $this->informationImportRepository = $informationImportRepository;
    }

    public function deleteOldImportData(int $days): void
    {
        $builder = $this->informationImportRepository->getDataToClear($days);
        $builder->each(function (InformationImport $informationImport) {
            File::delete(
                [
                    $informationImport->file_name_missed_duplicates,
                    $informationImport->file_name_unsuccessfully_duplicates
                ]
            );
        });

        $builder->update([
            'file_name_missed_duplicates' => '',
            'file_name_unsuccessfully_duplicates' => ''
        ]);
    }
}
