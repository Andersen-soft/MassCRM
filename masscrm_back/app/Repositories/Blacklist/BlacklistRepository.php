<?php

namespace App\Repositories\Blacklist;

use App\Exceptions\Custom\NotFoundException;
use App\Models\Blacklist;
use App\Models\BlacklistIgnoreDomain;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\DB;

class BlacklistRepository
{
    public function getListDomains(array $search, array $sort): Builder
    {
        $query = Blacklist::query()->select(['blacklists.*',
            DB::raw("concat_ws(' ', blacklists.source, users.name, users.surname) AS source_user")
        ])->leftJoin('users', 'blacklists.user_id', '=', 'users.id');
        $query = $this->setParamsSearch($search, $query);
        $query = $this->setParamSort($sort, $query);

        return $query->groupBy('blacklists.id', 'users.id');
    }

    private function setParamsSearch(array $search, Builder $query): Builder
    {
        if (empty($search)) {
            return $query;
        }

        foreach ($search as $key => $value) {
            switch ($key) {
                case 'domain':
                    $query->where('blacklists.domain', 'ILIKE', '%' . $value . '%');
                    break;
                case 'user':
                    $query->where(
                        DB::raw("concat_ws(' ', blacklists.source, users.name, users.surname)"),
                        'ILIKE',
                        '%' . $value . '%'
                    );
                    break;
                case 'date':
                    $query->whereBetween('blacklists.updated_at',
                        [Carbon::parse($value['min'])->startOfDay(), Carbon::parse($value['max'])->endOfDay()]
                    );
                    break;
                default:
                    break;
            }
        }

        return $query;
    }

    private function setParamSort(array $sort, Builder $query): Builder
    {
        $sortField = 'blacklists.updated_at';

        if (empty($sort)) {
            return $query->oldest($sortField);
        }

        switch ($sort['field_name']) {
            case 'domain':
                $sortField ='blacklists.domain';
                break;
            case 'user':
                $sortField = 'source_user';
                break;
            default:
                break;
        }

        return $query->orderBy($sortField, $sort['type_sort']);
    }

    public function getDomain(int $id): Blacklist
    {
        try {
            return Blacklist::query()->findOrFail($id);
        } catch (ModelNotFoundException $exception) {
            throw new NotFoundException('Domain value(' . $id . ') not found');
        }
    }

    public function checkExistDomains(array $domains, int $ignoreId = null): bool
    {
        $query = Blacklist::query()->whereIn('domain', $domains);

        if ($ignoreId) {
            $query->where('id', '!=', $ignoreId);
        }

        return $query->exists();
    }

    public function checkIgnoreDomain(string $domain): bool
    {
        return BlacklistIgnoreDomain::query()->where('domain', 'ILIKE', $domain)->exists();
    }

    public function deleteEmailsFromDomain(string $domain): void
    {
        Blacklist::query()->where('domain', 'ILIKE', '%@' . $domain)->delete();
    }
}
