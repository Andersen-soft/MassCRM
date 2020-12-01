<?php

declare(strict_types=1);

namespace App\Services\Industry;

use App\Models\Industry;

class IndustryService
{
    public function saveIndustry(string $name): Industry
    {
        $industry = new Industry();
        $industry->name = $name;
        $industry->save();

        return $industry;
    }
}
