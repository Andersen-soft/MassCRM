<?php
declare(strict_types=1);

namespace App\Services\InformationImport;

use App\Models\InformationImport;
use App\Repositories\InformationImport\InformationImportRepository;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class InformationImportService
{
    private InformationImportRepository $informationImportRepository;

    public function __construct(InformationImportRepository $informationImportRepository)
    {
        $this->informationImportRepository = $informationImportRepository;
    }

    public function deleteOldImportData(int $days, string $diskName = 'importSuccess'): void
    {
        $disk = Storage::disk($diskName);
        $builder = $this->informationImportRepository->getDataToClear($days);

        $builder->each(function (InformationImport $informationImport) use ($disk) {
            try {
                // delete duplicates files
                $file = $informationImport->getDublicatesFileName();
                if (!is_null($file) && $disk->exists($file)) {
                    $disk->delete($file);
                }

                // delete errors files
                $file = $informationImport->getErrorsFileName();
                if (!is_null($file) && $disk->exists($file)) {
                    $disk->delete($file);
                }
            } catch (\Exception $e) {
                app('sentry')->captureException($e);
                Log::error($e->getMessage());
            }
        });

        $builder->update([
            'file_name_missed_duplicates' => '',
            'file_name_unsuccessfully_duplicates' => ''
        ]);
    }
}
