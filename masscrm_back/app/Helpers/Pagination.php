<?php

declare(strict_types=1);

namespace App\Helpers;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class Pagination
{
    public function getMeta(LengthAwarePaginator $data): array
    {
        $data = $data->toArray();
        unset($data['data']);

        return $data;
    }
}
