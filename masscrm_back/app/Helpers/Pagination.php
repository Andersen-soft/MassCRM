<?php

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
