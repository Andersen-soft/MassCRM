<?php

namespace App\Repositories\Report;

use App\Repositories\Contact\ContactRepository;
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
    private ContactRepository $contactRepository;

    //TODO "companies.id" was deleted from groupBy
    private const GROUP_BY_QUERY = [
        'contacts.id'
    ];

    public function __construct(ContactRepository $contactRepository)
    {
        $this->contactRepository = $contactRepository;
    }

    private function getRelationTablesQuery(array $search, Builder $query): Builder
    {
        if (empty($search)) {
            return $query;
        }

        foreach ($search as $key => $value) {
            if (empty(self::LIST_FIELDS[$key]['join'])) {
                continue;
            }
            foreach (self::LIST_FIELDS[$key]['join'] as $item) {
                if (!$this->contactRepository->isJoined($query, $item['table'])) {
                    $query->leftJoin($item['table'], $item['first'], '=', $item['second']);
                }
            }
        }

        return $query;
    }

    public function buildQueryReport(array $search, array $sort): Builder
    {
        $query = Contact::query()->select(['contacts.*']);
        $query = $this->getRelationTablesQuery($search, $query);
        $query = $this->setParamsSearch($search, $query);
        $query = $this->setParamSort($sort, $query);

        return $query->groupBy(self::GROUP_BY_QUERY);
    }

    private function setParamsSearch(array $search, Builder $query): Builder
    {
        if (empty($search)) {
            return $query;
        }

        foreach ($search as $key => $value) {
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
                    if (!empty($value['max'])) {
                        $query->whereRaw(
                            $value['min'] . ' BETWEEN companies.min_employees AND companies.max_employees'
                        )->where('companies.max_employees', '<=', $value['max']);
                    } else {
                        $query->where('companies.min_employees', '>=', $value['min']);
                    }
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

    private function setParamSort(array $sort, Builder $query): Builder
    {
        if (!empty($sort)
            && !empty($sort['fieldName'])
            && !empty($sort['typeSort'])
            && array_key_exists($sort['fieldName'], self::LIST_FIELDS)
        ) {
            $field = $sort['fieldName'];
            $sortField = self::LIST_FIELDS[$field]['sortField'] ?? self::LIST_FIELDS[$field]['field'];
            $query = $query->orderBy($sortField, $sort['typeSort']);
        }

        return $query;
    }

    private function revertValue($value): int
    {
        return (int)mb_eregi_replace('[^0-9]', '', $value);
    }
}
