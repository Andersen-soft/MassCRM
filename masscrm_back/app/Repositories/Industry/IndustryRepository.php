<?php

namespace App\Repositories\Industry;

use App\Models\Industry;
use Illuminate\Support\Collection;

class IndustryRepository
{
    public function getIndustries(): Collection
    {
        return Industry::where('active', true)
            ->get();
    }
}
