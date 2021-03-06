<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Models\BaseModel;
use App\Services\Reports\SearchType;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;

class FilterRepository
{
    public function baseFilter(Builder $query, array $filterConfig, array $value): Builder
    {
        switch ($filterConfig[BaseModel::TYPE_FILTER]) {
            case SearchType::TYPE_SEARCH_FIELD_MULTI_SELECT:
                $query->where(static function (Builder $query) use ($value, $filterConfig) {
                    foreach ($value as $item) {
                        $query->orWhere(
                            $filterConfig[BaseModel::FIELD],
                            'ILIKE',
                            '%' . $item . '%'
                        );
                    }
                });
                break;
            case SearchType::TYPE_SEARCH_FIELD_TEXT_LIKE:
                /** @var string $value */
                $query->where($filterConfig[BaseModel::FIELD], 'ILIKE', '%' . $value . '%');
                break;
            case SearchType::TYPE_SEARCH_FIELD_DATA_RANGE:
                $query->whereBetween(
                    $filterConfig[BaseModel::FIELD],
                    [Carbon::parse($value['min'])->startOfDay(), Carbon::parse($value['max'])->endOfDay()]
                );
                break;
            case SearchType::TYPE_SEARCH_FIELD_COMPANY_SIZE_RANGE:
                if (!empty($value['max'])) {
                    $query->whereRaw(
                        $value['min'] . ' BETWEEN companies.min_employees AND companies.max_employees'
                    )->where('companies.max_employees', '<=', $value['max']);
                } else {
                    $query->where('companies.min_employees', '>=', $value['min']);
                }
                break;
        }
        return $query;
    }
}
