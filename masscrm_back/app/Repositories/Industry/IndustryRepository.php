<?php

namespace App\Repositories\Industry;

use App\Models\Industry;
use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Builder;

class IndustryRepository
{
    public function getIndustries(): Collection
    {
        return Industry::where('active', true)
            ->get();
    }

    public function getIndustryFromName(string $name): ?Industry
    {
        return Industry::query()->where('name', 'ILIKE', $name)->first();
    }
}
