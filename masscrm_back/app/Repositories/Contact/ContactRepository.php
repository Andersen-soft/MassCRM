<?php

declare(strict_types=1);

namespace App\Repositories\Contact;

use App\Models\BaseModel;
use App\Models\Blacklist;
use App\Models\Company\Company;
use App\Models\Contact\Contact;
use App\Models\User\User;
use App\Services\Reports\SearchType;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\LazyCollection;

class ContactRepository
{
    private const FORMAT_MONTH_AND_DAY = 'MMDD';
    private const LAST_MONTH_AND_DAY_YEAR = 1231;
    private const START_MONTH_AND_DAY_YEAR = 101;
    private const FORMAT_MASK_STRING_TO_INT = '9999';
    private const EXCLUDE_NO_EMAIL_CONDITION = 'exclude';
    private const ONLY_NO_EMAIL_CONDITION = 'only';

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

    public function getContactList(array $search, User $user, array $exceptIds = [], array $sort = []): Builder
    {
        $query = Contact::query()->select(['contacts.*']);

        if (isset($search['contact']['global'])) {
            $data = Contact::search(json_encode($search['contact']['global']))->select([Contact::ID_FIELD])->take(1000)->keys();
            $query->whereIn(Contact::ID_FIELD, $data);
        }

        $query = $this->getRelationTablesQuery($search, $query);

        if (!$user->hasRole(User::USER_ROLE_MANAGER) && (
                isset($search['contact']['skip_responsibility'])
                && false === (bool) $search['contact']['skip_responsibility']
            )
        ) {
            $query->where('contacts.responsible_id', $user->getId());
        }

        if (!empty($exceptIds)) {
            $query = $query->whereNotIn('id', $exceptIds);
        }

        $query = $this->setParamsSearch($search, $query);

        $query = $this->setParamSort($sort, $query);

        return $query->groupBy('contacts.id');
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
                        $query->whereBetween(
                            $filterConfig[BaseModel::FIELD],
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
                        $query->where(static function (Builder $query) use ($value, $filterConfig) {
                            foreach ($value as $item) {
                                $query->orWhere($filterConfig[BaseModel::FIELD],'=', $item);
                            }
                        });
                        break;
                    case SearchType::TYPE_SEARCH_FIELD_FIO_TEXT_LIKE:
                        $query->where(DB::raw($filterConfig[BaseModel::FIELD]), 'ILIKE', '%' . $value . '%');
                        break;
                    case SearchType::TYPE_SEARCH_FIELD_MULTI_SELECT_STRICT:
                        if ($value === self::EXCLUDE_NO_EMAIL_CONDITION) {
                            $query->where($filterConfig[BaseModel::FIELD], '!=', Contact::EXCEPT_EMAIL_TEMPLATE);
                        } elseif ($value === self::ONLY_NO_EMAIL_CONDITION) {
                            $query->where($filterConfig[BaseModel::FIELD], '=', Contact::EXCEPT_EMAIL_TEMPLATE);
                        } else {
                            $query->where(
                                static function (Builder $query) use ($value, $filterConfig) {
                                    foreach ($value as $item) {
                                        $query->orWhere($filterConfig[BaseModel::FIELD], '=', $item);
                                    }
                                }
                            );
                        }

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
                            $query->orWhereIn(
                                'contact_colleagues.contact_id_relation',
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
            return $query->orderBy('contacts.id', 'desc');
        }

        if ($sort['field_name'] === Contact::CREATED_AT_FIELD) {
            return $query->orderBy('contacts.id', $sort['type_sort']);
        }

        return $query->orderBy($sort['field_name'], $sort['type_sort']);
    }

    private function revertValue(string $value): int
    {
        return (int) mb_eregi_replace('[^0-9]', '', $value);
    }

    public function getCounterDailyPlanUser(int $userId): int
    {
        return Contact::query()
            ->where('responsible_id', '=', $userId)
            ->where('created_at', '>', Carbon::now()->startOfDay())
            ->count();
    }

    public function checkUniqueContact(array $emails, ?string $linkedIn): ?Contact
    {
        if (!$linkedIn && in_array(Contact::EXCEPT_EMAIL_TEMPLATE, $emails, true)) {
            return null;
        }

        $query = Contact::query()->select(['contacts.*']);

        if (!in_array(Contact::EXCEPT_EMAIL_TEMPLATE, $emails, true) && !empty($emails)) {
            $query->leftJoin('contact_emails', 'contact_emails.contact_id', '=', 'contacts.id');
            foreach ($emails as $email) {
                $query->orWhere('contact_emails.email', 'ILIKE', $email);
            }
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
        $query = Contact::query()->select(['contacts.*'])
            ->join('contact_emails', 'contact_emails.contact_id', '=', 'contacts.id');

        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
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

    public function changeResponsibleById(array $ids, int $responsibleId): void
    {
        $contact = Contact::query()->whereIn('id', $ids);

        $this->changeResponsibleByBuilder($contact, $responsibleId);
    }

    public function changeResponsibleByBuilder(Builder $contact, int $responsibleId): void
    {
        $contact->update([
             'responsible_id' => $responsibleId
        ]);
    }

    public function deleteContact(Builder $contact): void
    {
        $contact->delete();
    }
}
