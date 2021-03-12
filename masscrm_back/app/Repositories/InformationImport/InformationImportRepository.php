<?php
declare(strict_types=1);

namespace App\Repositories\InformationImport;

use App\Models\InformationImport;
use \Illuminate\Database\Eloquent\Builder;

class InformationImportRepository
{
    public function getDataToClear(int $days): Builder
    {
        return InformationImport::query()
            ->whereDate('updated_at', '<', now()->subDays($days)->toDateString())
            ->where(function (Builder $query) {
                $query->orWhere('file_name_missed_duplicates', '<>', '');
                $query->orWhere('file_name_unsuccessfully_duplicates','<>', '');
            });
    }
}
