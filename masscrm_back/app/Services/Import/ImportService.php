<?php

namespace App\Services\Import;

use App\Exceptions\Custom\NotFoundException;
use App\Models\InformationImport;

class ImportService
{
    public function getStatisticImport(int $id): InformationImport
    {
        $result = InformationImport::query()->find($id);
        if (!$result) {
            throw new NotFoundException('Import value(' . $id. ') not found');
        }

        return $result;
    }
}
