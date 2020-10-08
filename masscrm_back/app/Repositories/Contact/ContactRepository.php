<?php

namespace App\Repositories\Contact;

use App\Models\BaseModel;
use App\Models\Blacklist;
use App\Models\Company\Company;
use App\Models\Contact\Contact;
use App\Models\User\User;
use App\Services\Parsers\Import\Contact\ImportEmail;
use App\Services\Reports\SearchType;
use Carbon\Carbon;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\LazyCollection;

class ContactRepository
{
    private const FORMAT_MONTH_AND_DAY = 'MMDD';
    private const LAST_MONTH_AND_DAY_YEAR = 1231;
    private const START_MONTH_AND_DAY_YEAR = 101;
    private const FORMAT_MASK_STRING_TO_INT = '9999';

    public function isJoined(Builder $query, string $table): bool
    {
        return Collection::make($query->getQuery()->joins)->pluck('table')->contains($table);
    }

    private function getRelationTablesQuery(array $search, Builder $query): Builder
    {
        if (empty($search)) {
            return $query;
        }

        foreach ($search as $parent => $fields) {
            foreach ($fields as $field => $value) {
                $filterConfig = BaseModel::getFilterConfig($field, $parent);
                if (empty($filterConfig) || !isset($filterConfig[BaseModel::JOIN])) {
                    continue;
                }
                foreach ($filterConfig[BaseModel::JOIN] as $item) {
                    if (!$this->isJoined($query, $item['table'])) {
                        $query->leftJoin($item['table'], $item['first'], '=', $item['second']);
                    }
                }
            }
        }

        return $query;
    }

    public function getContactList(array $search, array $sort, int $limit = 10, User $user = null): LengthAwarePaginator
    {
        $query = Contact::query()->select(['contacts.*']);
        $query = $this->getRelationTablesQuery($search, $query);
        if ($user) {
            $query->where('contacts.user_id', $user->getId());
        }
        $query = $this->setParamsSearch($search, $query);
        $query = $this->setParamSort($sort, $query);

        //TODO "companies.id" was deleted from groupBy
        return $query->groupBy('contacts.id')->paginate($limit);
    }

    private function setParamsSearch(array $search, Builder $query): Builder
    {
        if (empty($search)) {
            return $query;
        }

        foreach ($search as $parent => $fields) {
            foreach ($fields as $field => $value) {
                $filterConfig = BaseModel::getFilterConfig($field, $parent);
                if (empty($filterConfig) || !isset($filterConfig[BaseModel::TYPE_FILTER])) {
                    continue;
                }
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
                    case SearchType::TYPE_SEARCH_FIELD_RANGE:
                        $query->whereBetween($filterConfig[BaseModel::FIELD], [$value['min'], $value['max']]);
                        break;
                    case SearchType::TYPE_SEARCH_FIELD_DATA_RANGE:
                        $query->whereBetween($filterConfig[BaseModel::FIELD],
                            [Carbon::parse($value['min'])->startOfDay(), Carbon::parse($value['max'])->endOfDay()]
                        );
                        break;
                    case SearchType::TYPE_SEARCH_FIELD_VALUE_SELECT:
                        $query->where($filterConfig[BaseModel::FIELD], '=', $value);
                        break;
                    case SearchType::TYPE_SEARCH_FIELD_TEXT_LIKE:
                        $query->where($filterConfig[BaseModel::FIELD], 'ILIKE', '%' . $value . '%');
                        break;
                    case SearchType::TYPE_SEARCH_FIELD_DATE_ONLY_MONTH_AND_DAY_RANGE:
                        $query = $this->filterBirthday($value, $query, $filterConfig[BaseModel::FIELD]);
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
                    case SearchType::TYPE_SEARCH_FIELD_BOUNCES:
                        if ($value) {
                            $query->where($filterConfig[BaseModel::FIELD], '>', 0);
                        } else {
                            $query->where(static function (Builder $query) use ($filterConfig) {
                                return $query->where($filterConfig[BaseModel::FIELD], '=', 0)
                                    ->orWhereNull($filterConfig[BaseModel::FIELD]);
                            });
                        }
                        break;
                    case SearchType::TYPE_SEARCH_FIELD_FIO_TEXT_LIKE:
                        $query->where(DB::raw($filterConfig[BaseModel::FIELD]), 'ILIKE', '%' . $value . '%');
                        break;
                    case SearchType::TYPE_SEARCH_FIELD_MULTI_SELECT_STRICT:
                        $query->where(static function (Builder $query) use ($value, $filterConfig) {
                            foreach ($value as $item) {
                                $query->orWhere($filterConfig[BaseModel::FIELD], '=', $item);
                            }
                        });
                        break;
                    case SearchType::TYPE_SEARCH_SUBSIDIARY_COMPANIES:
                        $query->where('companies_clone.type', '=', Company::TYPE_COMPANY_SUBSIDIARY)
                            ->where($filterConfig[BaseModel::FIELD], 'ILIKE', '%' . $value . '%');
                        break;
                    case SearchType::TYPE_SEARCH_HOLDING_COMPANIES:
                        $query->where('companies_clone.type', '=', Company::TYPE_COMPANY_HOLDING)
                            ->where($filterConfig[BaseModel::FIELD], 'ILIKE', '%' . $value . '%');
                        break;
                    case SearchType::TYPE_SEARCH_FIELD_LINK_COLLEAGUE_TEXT_LIKE:
                        $contactsId = Contact::query()->select('id')
                            ->where('linkedin', 'ILIKE', '%' . $value . '%')->get()->toArray();
                        $query->where(static function (Builder $query) use ($value, $filterConfig, $contactsId) {
                            $query->orWhere($filterConfig[BaseModel::FIELD], 'ILIKE', '%' . $value . '%');
                            $query->orWhereIn('contact_colleagues.contact_id_relation',
                                array_map(static function ($contactsId) {
                                    return $contactsId['id'];
                                }, $contactsId)
                            );
                        });
                        break;
                }
            }
        }
        return $query;
    }

    private function filterBirthday(array $value, Builder $query, string $key): Builder
    {
        $min = $this->revertValue($value['min']);
        $max = $this->revertValue($value['max']);
        if ($max >= $min) {
            return $query->whereBetween(
                DB::raw(
                    'to_number(to_char(
                        ' . $key . ", '" . self::FORMAT_MONTH_AND_DAY . "'
                    ), '" . self::FORMAT_MASK_STRING_TO_INT . "')"
                ),
                [$min, $max]
            );
        }

        return $query->where(static function (Builder $query) use ($key, $min, $max) {
            return $query->whereBetween(
                DB::raw(
                    'to_number(to_char(
                        ' . $key . ", '" . self::FORMAT_MONTH_AND_DAY . "'
                    ), '" . self::FORMAT_MASK_STRING_TO_INT . "')"
                ),
                [$min, self::LAST_MONTH_AND_DAY_YEAR]
            )->orWhereBetween(
                DB::raw(
                    'to_number(to_char(
                        ' . $key . ", '" . self::FORMAT_MONTH_AND_DAY . "'
                    ), '" . self::FORMAT_MASK_STRING_TO_INT . "')"
                ),
                [self::START_MONTH_AND_DAY_YEAR, $max]
            );
        });
    }

    private function setParamSort(array $sort, Builder $query): Builder
    {
        if (empty($sort)) {
            return $query->orderBy('contacts.id' , 'desc');
        }

        if ($sort['field_name'] === Contact::CREATED_AT_FIELD) {
            return $query->orderBy('contacts.id' , $sort['type_sort']);
        }

        return $query->orderBy($sort['field_name'], $sort['type_sort']);
    }

    private function revertValue($value): int
    {
        return (int)mb_eregi_replace('[^0-9]', '', $value);
    }

    public function getCounterDailyPlanUser(int $userId): int
    {
        return Contact::query()->where([['user_id', $userId], ['created_at', '>', Carbon::now()->startOfDay()]])
            ->count('id');
    }

    public function checkUniqueContact(array $emails, ?string $linkedIn): ?Contact
    {
        $query = Contact::query()->with(['contactEmails']);

        if (!in_array(Contact::EXCEPT_EMAIL_TEMPLATE, $emails, true) && !empty($emails)) {
            $query->whereHas('contactEmails', static function (Builder $query) use ($emails) {
                $query->whereIn('email', $emails);
            });
        }

        if ($linkedIn) {
            $query->orWhere('linkedin', 'ILIKE', $linkedIn);
        }

        return $query->first();
    }

    public function deleteById(int $id): void
    {
        $contact = Contact::query()->find($id);
        if ($contact instanceof Contact) {
            $contact->delete();
        }
    }

    public function getContactFromLinkLinkedIn(string $link): ?Contact
    {
        return Contact::query()->where('linkedin', '=', $link)->first();
    }

    public function getListContactExistEmail(string $email, bool $flag): LazyCollection
    {
        preg_match(Blacklist::REGEX_EMAIL, $email, $emailMatch);

        $query = Contact::query()->select(['contacts.*'])
            ->join('contact_emails', 'contact_emails.contact_id', '=', 'contacts.id');

        if ($emailMatch) {
            $query->where('contact_emails.email', 'ILIKE', $email);
        } else {
            $query->where('contact_emails.email', 'ILIKE', '%@' . $email);
        }

        return $query->where('contacts.in_blacklist', '=', !$flag)->cursor();
    }

    public function getContactForTransfer(): ?Contact
    {
        return Contact::query()->select('*')->where('is_upload_collection', '=', false)->first();
    }

    public function getContactById(int $id): ?Contact
    {
        return Contact::query()->find($id);
    }
}
