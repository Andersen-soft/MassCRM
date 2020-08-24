<?php

namespace App\Repositories\Report;

use App\Models\BaseModel;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use App\Models\Contact\Contact;
use Illuminate\Database\Eloquent\Builder;
use App\Services\Reports\SearchType;
use App\Models\Company\Company;

class ReportRepository implements SearchType
{
    private const FORMAT_MONTH_AND_DAY = 'MMDD';
    private const LAST_MONTH_AND_DAY_YEAR = 1231;
    private const START_MONTH_AND_DAY_YEAR = 101;
    private const FORMAT_MASK_STRING_TO_INT = '9999';
    private const GROUP_BY_QUERY = [
        'contacts.id', 'companies.id', 'industries.id', 'company_vacancies.id','companies_clone.id',
        'contact_campaigns.id', 'campaign_statuses.id', 'contact_social_networks.id','contact_colleagues.id',
        'contact_phones.id', 'contact_emails.id', 'contact_sales.id', 'sources.id','sale_statuses.id',
        'contact_mails.id', 'contact_notes.id'
    ];

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

    public function buildQueryReport(array $input): Builder
    {
        $query = Contact::query()->with('contactEmails')->select(['contacts.*']);
        $query = $this->getRelationTablesQuery($query);
        $query = $this->setParamsSearch($input, $query);
        $query = $this->setParamSort($input, $query);
        if (!empty($input['limit'])) {
            $query->limit((int)$input['limit']);
        }

        return $query->groupBy(self::GROUP_BY_QUERY);
    }

    private function setParamsSearch(array $input, Builder $query): Builder
    {
        if (empty($input['search'])) {
            return $query;
        }

        foreach ($input['search'] as $key => $value) {
            switch (self::LIST_FIELDS[$key]['typeSearch']) {
                case self::TYPE_SEARCH_FIELD_MULTI_SELECT:
                    $query->where(static function (Builder $query) use ($value, $key) {
                        foreach ($value as $item) {
                            $query->orWhere(self::LIST_FIELDS[$key]['field'], 'ILIKE', '%' . $item . '%');
                        }
                    });
                    break;
                case self::TYPE_SEARCH_FIELD_RANGE:
                    $query->whereBetween(self::LIST_FIELDS[$key]['field'], [$value['min'], $value['max']]);
                    break;
                case self::TYPE_SEARCH_FIELD_DATA_RANGE:
                    $query->whereBetween(self::LIST_FIELDS[$key]['field'],
                        [Carbon::parse($value['min'])->startOfDay(), Carbon::parse($value['max'])->endOfDay()]
                    );
                    break;
                case self::TYPE_SEARCH_FIELD_TEXT_LIKE:
                    $query->where(self::LIST_FIELDS[$key]['field'], 'ILIKE', '%' . $value . '%');
                    break;
                case self::TYPE_SEARCH_FIELD_DATE_ONLY_MONTH_AND_DAY_RANGE:
                    $query = $this->filterBirthday($value, $query, $key);
                    break;
                case self::TYPE_SEARCH_FIELD_COMPANY_SIZE_RANGE:
                    $query->whereRaw(
                        $value['min'] . ' BETWEEN companies.min_employees AND companies.max_employees'
                    )->where('companies.max_employees', '<=', $value['max']);
                    break;
                case self::TYPE_SEARCH_FIELD_BOUNCES:
                    if ($value) {
                        $query->where(self::LIST_FIELDS[$key]['field'], '>', 0);
                    } else {
                        $query->where(static function (Builder $query) use ($key) {
                            return $query->where(self::LIST_FIELDS[$key]['field'], '=', 0)
                                ->orWhereNull(self::LIST_FIELDS[$key]['field']);
                        });
                    }
                    break;
                case self::TYPE_SEARCH_FIELD_FIO_TEXT_LIKE:
                    $query->where(DB::raw(self::LIST_FIELDS[$key]['field']), 'ILIKE', '%' . $value . '%');
                    break;
                case self::TYPE_SEARCH_FIELD_MULTI_SELECT_STRICT:
                    $query->where(static function (Builder $query) use ($value, $key) {
                        foreach ($value as $item) {
                            $query->orWhere(self::LIST_FIELDS[$key]['field'], '=', $item);
                        }
                    });
                    break;
                case self::TYPE_SEARCH_SUBSIDIARY_COMPANIES:
                    $query->where('companies_clone.type', '=', Company::TYPE_COMPANY_SUBSIDIARY)
                        ->where(self::LIST_FIELDS[$key]['field'], 'ILIKE', '%' . $value . '%');
                    break;
                case self::TYPE_SEARCH_HOLDING_COMPANIES:
                    $query->where('companies_clone.type', '=', Company::TYPE_COMPANY_HOLDING)
                        ->where(self::LIST_FIELDS[$key]['field'], 'ILIKE', '%' . $value . '%');
                    break;
                case SearchType::TYPE_SEARCH_FIELD_LINK_COLLEAGUE_TEXT_LIKE:
                    $contactsId = Contact::query()->select('id')
                        ->where('linkedin', 'ILIKE', '%' . $value . '%')->get()->toArray();
                    $query->where(static function (Builder $query) use ($value, $key, $contactsId) {
                        $query->orWhere(self::LIST_FIELDS[$key]['field'], 'ILIKE', '%' . $value . '%');
                        $query->orWhereIn('contact_colleagues.contact_id_relation',
                            array_map(static function ($contactsId) {
                                return $contactsId['id'];
                            }, $contactsId)
                        );
                    });
                    break;
                default:
                    break;
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
                        ' . self::LIST_FIELDS[$key]['field'] . ", '" . self::FORMAT_MONTH_AND_DAY . "'
                    ), '" . self::FORMAT_MASK_STRING_TO_INT . "')"
                ),
                [$min, $max]
            );
        }

        return $query->where(static function (Builder $query) use ($key, $min, $max) {
            return $query->whereBetween(
                DB::raw(
                    'to_number(to_char(
                        ' . self::LIST_FIELDS[$key]['field'] . ", '" . self::FORMAT_MONTH_AND_DAY . "'
                    ), '" . self::FORMAT_MASK_STRING_TO_INT . "')"
                ),
                [$min, ReportRepository::LAST_MONTH_AND_DAY_YEAR]
            )->orWhereBetween(
                DB::raw(
                    'to_number(to_char(
                        ' . self::LIST_FIELDS[$key]['field'] . ", '" . self::FORMAT_MONTH_AND_DAY . "'
                    ), '" . self::FORMAT_MASK_STRING_TO_INT . "')"
                ),
                [self::START_MONTH_AND_DAY_YEAR, $max]
            );
        });
    }

    private function setParamSort(array $input, Builder $query): Builder
    {
        if (!empty($input['sort'])
            && !empty($input['sort']['fieldName'])
            && !empty($input['sort']['typeSort'])
            && array_key_exists($input['sort']['fieldName'], self::LIST_FIELDS)
        ) {
            $field = $input['sort']['fieldName'];
            $sortField = self::LIST_FIELDS[$field]['sortField'] ?? self::LIST_FIELDS[$field]['field'];
            $query = $query->orderBy($sortField, $input['sort']['typeSort']);
        }

        return $query;
    }

    private function revertValue($value): int
    {
        return (int)mb_eregi_replace('[^0-9]', '', $value);
    }
}
