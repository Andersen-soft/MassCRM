<?php

namespace App\Repositories\Contact;

use App\Models\BaseModel;
use App\Models\Company\Company;
use App\Models\Contact\Contact;
use App\Models\User\User;
use App\Services\Reports\SearchType;
use Carbon\Carbon;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

class ContactRepository
{
    private const FORMAT_MONTH_AND_DAY = 'MMDD';
    private const LAST_MONTH_AND_DAY_YEAR = 1231;
    private const START_MONTH_AND_DAY_YEAR = 101;
    private const FORMAT_MASK_STRING_TO_INT = '9999';

    private function getRelationTablesQuery(Builder $query): Builder
    {
        return $query->leftJoin('companies', 'companies.id', '=', 'contacts.company_id')
            ->leftJoin('companies_industries', 'companies_industries.company_id', '=', 'companies.id')
            ->leftJoin('industries', 'industries.id', '=', 'companies_industries.industry_id')
            ->leftJoin('company_vacancies', 'company_vacancies.company_id', '=', 'companies.id')
            ->leftJoin('company_subsidiaries', 'company_subsidiaries.parent_id', '=', 'companies.id')
            ->leftJoin('companies as companies_clone', 'companies_clone.id', '=', 'company_subsidiaries.child_id')
            ->leftJoin('contact_campaigns', 'contact_campaigns.contact_id', '=', 'contacts.id')
            ->leftJoin('campaign_statuses', 'campaign_statuses.id', '=', 'contact_campaigns.status_id')
            ->leftJoin('contact_social_networks', 'contact_social_networks.contact_id', '=', 'contacts.id')
            ->leftJoin('contact_colleagues', 'contact_colleagues.contact_id', '=', 'contacts.id')
            ->leftJoin('contact_phones', 'contact_phones.contact_id', '=', 'contacts.id')
            ->leftJoin('contact_emails', 'contact_emails.contact_id', '=', 'contacts.id')
            ->leftJoin('contact_sales', 'contact_sales.contact_id', '=', 'contacts.id')
            ->leftJoin('sources', 'sources.id', '=', 'contact_sales.source_id')
            ->leftJoin('sale_statuses', 'sale_statuses.id', '=', 'contact_sales.status_id')
            ->leftJoin('contact_mails', 'contact_mails.contact_id', '=', 'contacts.id')
            ->leftJoin('contact_notes', 'contact_notes.contact_id', '=', 'contacts.id');
    }

    public function getContactList(array $search, array $sort, int $limit = 10, User $user = null): LengthAwarePaginator
    {
        $query = Contact::query()->select(['contacts.*']);
        $query = $this->getRelationTablesQuery($query);
        if ($user) {
            $query->where('contacts.user_id', $user->getId());
        }
        $query = $this->setParamsSearch($search, $query);
        $query = $this->setParamSort($sort, $query);

        return $query->groupBy('contacts.id', 'companies.id')->paginate($limit);
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
                        $query->whereRaw(
                            $value['min'] . ' BETWEEN companies.min_employees AND companies.max_employees'
                        )->where('companies.max_employees', '<=', $value['max']);
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
            return $query;
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

    public function checkUniqueContact(array $emails, string $linkedin = null, array $socialNetworks = []): ?Contact
    {
        $query = Contact::query()->with(['contactEmails', 'contactSocialNetworks']);

        $query->whereHas('contactEmails', function ($query) use ($emails) {
            $query->whereIn('email', $emails);
        });
        if ($linkedin) {
            $query->orWhere('linkedin', $linkedin);
        }
        if (!empty($socialNetworks)) {
            $query->orWhereHas('contactSocialNetworks', function ($query) use ($socialNetworks) {
                $query->whereIn('link', $socialNetworks);
            });
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
}
