<?php

declare(strict_types=1);

namespace App\Repositories\User;

use App\Models\BaseModel;
use App\Models\User\Fields\UserFields;
use App\Models\User\User;
use App\Services\Reports\SearchType;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\LazyCollection;

class UserRepository
{
    public function getUserList(array $search, array $sort): Builder
    {
        $query = User::query()->select(['users.*']);
        $query = $this->setParamsSearch($search, $query);
        $query = $this->setParamSort($sort, $query);

        return $query->groupBy('users.id');
    }

    private function setParamsSearch(array $search, Builder $query): Builder
    {
        if (empty($search)) {
            return $query;
        }

        foreach ($search as $key => $value) {
            $fieldSearch = UserFields::FIELDS[$key];
            switch ($fieldSearch[BaseModel::TYPE_FILTER]) {
                case SearchType::TYPE_SEARCH_FIELD_TEXT_LIKE:
                    $query->where($fieldSearch[BaseModel::FIELD], 'ILIKE', '%' . $value . '%');
                    break;
                case SearchType::TYPE_SEARCH_FIELD_FIO_TEXT_LIKE:
                    $query->where(DB::raw($fieldSearch[BaseModel::FIELD]), 'ILIKE', '%' . $value . '%');
                    break;
                case SearchType::TYPE_SEARCH_ROLES_USER:
                    $query->where(static function (Builder $query) use ($value, $fieldSearch) {
                        foreach ($value as $item) {
                            $query->orWhereJsonContains($fieldSearch[BaseModel::FIELD], $item);
                        }
                    });
                    break;
                case SearchType::TYPE_SEARCH_STATUS_STRICT:
                    $query->where($fieldSearch[BaseModel::FIELD], '=', $value);
                    break;
                default:
                    break;
            }
        }

        return $query;
    }

    private function setParamSort(array $sort, Builder $query): Builder
    {
        if (empty($sort)) {
            return $query->latest();
        }

        $sortField = UserFields::FIELDS[$sort['fieldName']][UserFields::SORT_FIELD]
            ?? UserFields::FIELDS[$sort['fieldName']][UserFields::FIELD];

        return $query->orderBy($sortField, $sort['typeSort']);
    }

    public function fetchUserFromLogin(?string $login): ?User
    {
        return User::where(['login' => $login, 'from_active_directory' => 0])->first();
    }

    public function getListActiveUser(): LazyCollection
    {
        return User::query()->where('active', '=', 1)->cursor();
    }

    public function getUserById(int $id): ?User
    {
        $query = User::query()->where('id', '=', $id);

        return $query->first();
    }

    public function deleteUserById(int $id)
    {
        return User::query()->where('id', $id)->delete();
    }

    public function getUsersByIds(array $ids): Collection
    {
        return User::query()->orWhereIn('id', $ids)->get();
    }
}
