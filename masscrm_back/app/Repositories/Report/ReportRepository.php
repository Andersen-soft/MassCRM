<?php

declare(strict_types=1);

namespace App\Repositories\Report;

use App\Models\ReportPageLog;
use App\Models\User\User;
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
    private const USER_ROLES = [User::USER_ROLE_NC1, User::USER_ROLE_NC2];
    private const LAST_MONTH_AND_DAY_YEAR = 1231;
    private const START_MONTH_AND_DAY_YEAR = 101;
    private const FORMAT_MASK_STRING_TO_INT = '9999';
    private ContactRepository $contactRepository;


    private const GROUP_BY_QUERY = [
        'contacts.id'
    ];

    public function __construct(ContactRepository $contactRepository)
    {
        $this->contactRepository = $contactRepository;
    }

    public function getReportListForManagers(array $search, array $sort): Builder
    {
        $statistic = ReportPageLog::query()
            ->selectRaw("
             users.id as user_id,
             CONCAT(users.name, users.surname) as full_name,
             users.name as name,
             users.surname as surname,
             users.roles as role,
             COALESCE(SUM(created), 0) as created,
             COALESCE(SUM(updated), 0) as updated,
             (COALESCE(SUM(created), 0) + COALESCE(SUM(updated), 0)) as total
             ")
            ->join('users', 'users.id', '=', 'report_page_log.user_id');

        $this->setParamsSearchDateList($search, $statistic);

        $query = $this->setParamsSearchForManagersList($search, $statistic)->groupBy('users.id');

        $query = $this->setParamSorList($sort, $query);

        return $query;
    }

    public function getReportListForNC(array $search, array $sort, int $userId): Builder
    {
        $statistic = ReportPageLog::query()
            ->selectRaw("
             COALESCE(SUM(created), 0) as created,
             COALESCE(SUM(updated), 0) as updated,
             (COALESCE(SUM(created), 0) + COALESCE(SUM(updated), 0)) as total,
             to_char(report_page_log.created_at, 'YYYY-MM') as date
             ")
            ->join('users', 'users.id', '=', 'report_page_log.user_id')
            ->where('report_page_log.user_id', $userId);

        $this->setParamsSearchDateList($search, $statistic);

        $statistic = $this->setParamSorList($sort, $statistic->groupBy(['report_page_log.user_id', 'date']));

        return $statistic;
    }

    public function setParamsSearchForManagersList(array $search, Builder $query): Builder
    {

        if (array_key_exists('employee', $search)) {
            $searchParam = $search['employee'];
            $query->whereRaw("CONCAT(users.name, ' ', users.surname) ILIKE '%$searchParam%'");
        }

        if (array_key_exists('role', $search)) {
            $query->where(static function (Builder $query) use ($search) {
                foreach ($search['role'] as $item) {
                    $query->orWhereJsonContains('users.roles', $item);
                }
            });
        } else {
            $query->where(function (Builder $query) {
                $roles = self::USER_ROLES;
                    foreach ($roles as $item) {
                        $query->orWhereJsonContains('users.roles', $item);
                    }
            });
        }

        return $query;
    }

    public function setParamsSearchDateList(array $search, Builder $query): Builder
    {
        if (array_key_exists('date', $search)){
            $query->whereBetween('report_page_log.created_at',
                [Carbon::parse($search['date']['from'])->startOfDay(),
                    Carbon::parse($search['date']['to'])->endOfDay()]
            );
        } else {
            $query->whereBetween('report_page_log.created_at',
                [Carbon::now()->startOfMonth(),
                    Carbon::now()->endOfMonth()]
            );
        }

        return $query;
    }

    private function setParamSorList(array $sort, Builder $query): Builder
    {
        if (!empty($sort)
            && !empty($sort['field_name'])
            && !empty($sort['type_sort'])
        ) {
            $query->orderByRaw($sort['field_name'] . ' ' . $sort['type_sort']);
        }

        return $query;
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

    public function buildQueryReport(array $search, array $sort, array $ids = []): Builder
    {
        $query = $this->buildBaseQueryReport($search, $ids);
        $query = $this->setParamSort($sort, $query);

        $query = $query->selectSub('SELECT CONCAT(first_name,\' \',last_name) FROM contacts subContactFirst
        WHERE (
			position ILIKE \'%ceo%\'
			AND contacts.company_id = subContactFirst.company_id
			AND contacts.id != subContactFirst.id
		) OR (
			position NOT ILIKE \'%ceo%\'
			AND subContactFirst.company_id = contacts.company_id
			AND (subContactFirst.position ILIKE \'%ceo%\')
        ) LIMIT 1',
            'colleague_first'
        );

        $query = $query->selectSub(
            'SELECT CONCAT(first_name,\' \',last_name) FROM contacts subContactSecond
                WHERE subContactSecond.company_id = contacts.company_id AND subContactSecond.id != contacts.id LIMIT 1',
            'colleague_second'
        );

        return $query->groupBy(self::GROUP_BY_QUERY);
    }

    public function buildQueryReportCount(array $search, array $ids = []): int
    {
        $query = $this->buildBaseQueryReport($search, $ids);
        $query = $query->distinct(self::GROUP_BY_QUERY);

        return $query->count();
    }

    private function buildBaseQueryReport(array $search, array $ids = []): Builder
    {
        $query = Contact::query()->select(['contacts.*']);

        if (isset($search['global'])) {
            $data = Contact::search(json_encode($search['global']))->select([Contact::ID_FIELD])->take(1000)->keys();
            $query->whereIn('contacts.' . Contact::ID_FIELD, $data);
        }

        $query = $this->getRelationTablesQuery($search, $query);
        $query = $this->setParamsSearch($search, $query, $ids);

        return $query;
    }

    private function setParamsSearch(array $search, Builder $query, array $ids = []): Builder
    {
        if (!empty($ids)) {
            return $query->whereIn('contacts.id', $ids);
        }

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
                    $query->whereBetween(
                        self::LIST_FIELDS[$key]['field'],
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
                case SearchType::TYPE_SEARCH_FIELD_COMPANY_SIZE_RANGE_MULTI:
                    $query->where(static function (Builder $query) use ($value) {
                        foreach ($value as $item) {
                            $query->orWhere(static function ($query) use ($item) {
                                $query->where(Company::MIN_EMPLOYEES_FIELD, '>=', $item['min'])
                                    ->where(Company::MAX_EMPLOYEES_FIELD, '<=', $item['max']);
                            });
                        }
                    });
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
                        $query->orWhereIn(
                            'contact_colleagues.contact_id_relation',
                            array_map(static function ($contactsId) {
                                return $contactsId['id'];
                            }, $contactsId)
                        );
                    });
                    break;
                case SearchType::TYPE_SEARCH_ROLES_USER:
                    $query->where(static function (Builder $query) use ($value, $key) {
                        foreach ($value as $item) {
                            $query->orWhereJsonContains(self::LIST_FIELDS[$key]['field'], $item);
                        }
                    });
                    break;
                case SearchType::TYPE_SEARCH_FIELD_EXIST_OR_NOT:
                    filter_var($value, FILTER_VALIDATE_BOOLEAN)
                        ? $query->has(self::LIST_FIELDS[$key]['field'])
                        : $query->doesntHave(self::LIST_FIELDS[$key]['field']);
                    break;
                case SearchType::TYPE_SEARCH_FIELD_VALUE_SELECT:
                    $query->where(self::LIST_FIELDS[$key]['field'], '=', $value);
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

    private function revertValue(string $value): int
    {
        return (int)mb_eregi_replace('[^0-9]', '', $value);
    }
}
