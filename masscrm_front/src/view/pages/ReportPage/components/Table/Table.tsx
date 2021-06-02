import { debounce } from 'lodash';
import { parseISO, format } from 'date-fns';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAutocompleteReport,
  getSelectedContacts,
  getReport,
  getCurrentPage,
  setPage,
  setReportFilterSettings,
  setReportFilterValues,
  setReportSort,
  setReportSortValues,
  setSelectedContacts,
  setSelectedReportContactsAction,
  getReportFilterSettings,
  getReportFilterSorting,
  getReportSelector,
  getReportSortBy,
  getReportTotalCount,
  getShowCountReport,
  getUserRoles
} from 'src/store/slices';
import { TableBase } from 'src/view/organisms';
import {
  OTHER_HEIGHT,
  deleteItemFilter,
  addItemFilter,
  getSelectedEntity,
  formatDateFilter,
  containsAllElems,
  getDateOfFormatYYYY_MM,
  getDatesPeriod
} from 'src/utils';
import history from 'src/utils/history';
import {
  ITableRow,
  ITableConfig,
  ReportData,
  IReportFilter
} from 'src/interfaces';
import { DD_MM_YYYY, initReportFiltersState } from 'src/constants';
import { Panel } from './components';
import { IAutocompleteReport, ReportTableMapWithoutDate } from './interfaces';
import {
  reportTableMapForNC1,
  reportTableMapForNC2,
  reportTableMapForManager,
  reportTableConfigForNC1,
  reportTableConfigForNC2,
  reportTableConfigForManager,
  REPORT_SORTING_FIELDS_CONFIG
} from './configs';
import { MAP_AUTOCOMPLETE_REPORT, MAP_REQUEST_REPORT } from './helpers';
import {
  FROM_TO_ARR,
  summaryDataInitValueForNC1,
  summaryDataInitValueForNC2
} from './constants';
import { useStyles } from './Table.styles';

interface IProps {
  reportPage: boolean;
}

export const Table: FC<IProps> = ({ reportPage }) => {
  const totalCount = useSelector(getReportTotalCount);
  const showCount = useSelector(getShowCountReport);
  const reportData = useSelector(getReportSelector);
  const userRole = useSelector(getUserRoles);
  const filterSettings = useSelector(getReportFilterSettings);
  const currentPage = useSelector(getCurrentPage);
  const sortBy = useSelector(getReportSortBy);
  const sortingState = useSelector(getReportFilterSorting);
  const selectedContacts = useSelector(
    getSelectedContacts(
      getSelectedEntity({
        reportVal: 'selectedReportContacts',
        reportCompProp: reportPage
      })
    )
  );

  const styles = useStyles();

  const { search: locationSearch } = history.location;

  const paramURL = new URLSearchParams(locationSearch);
  const filtersParamURL = paramURL.get('reportfilter');
  const filterValue = filtersParamURL && JSON.parse(filtersParamURL);

  const filtersState = {
    ...initReportFiltersState,
    ...filterValue
  };

  const dispatch = useDispatch();

  // TODO ts
  const [objectRequest, setObjectRequest] = useState<any>(null);
  const [inputValue, setInputValue] = useState('');
  const [loadedAutocomplete, setLoadedAutocomplete] = useState(
    [] as ReportData
  );

  const requestValues: IReportFilter = {
    limit: showCount,
    page: currentPage,
    search: {
      role: filtersState.role.length
        ? filtersState.role.map((item: string) => item.toLowerCase())
        : undefined,
      employee: filtersState.employee || undefined,
      date:
        filtersState.date && Object.values(filtersState.date)
          ? getDatesPeriod(filtersState.date, FROM_TO_ARR, DD_MM_YYYY)
          : undefined
    },
    sort: sortBy
  };

  const getSummaryData = () => {
    const summaryDataWithoutDate = reportData.reduce(
      (acc: ReportTableMapWithoutDate, curr: ReportTableMapWithoutDate) => {
        const { date, ...rest } = curr;

        Object.keys(rest).forEach(key => {
          acc[key] += rest[key];
        });
        return acc;
      },
      {
        ...(userRole.nc1
          ? summaryDataInitValueForNC1
          : summaryDataInitValueForNC2)
      }
    );

    return [
      {
        period: getDateOfFormatYYYY_MM(
          getDatesPeriod(filtersState.date, FROM_TO_ARR)
        ),
        ...summaryDataWithoutDate
      }
    ];
  };

  const getNCTableData = (mapFunc: Function) =>
    [...reportData, ...(filtersState.date ? getSummaryData() : [])].map(
      mapFunc(!!filtersState.date)
    );

  const getTableData = () => {
    if (userRole.nc1) {
      return getNCTableData(reportTableMapForNC1);
    }

    if (userRole.nc2) {
      return getNCTableData(reportTableMapForNC2);
    }

    if (userRole.manager) return reportData.map(reportTableMapForManager);
    return [] as ITableRow[];
  };

  const count = totalCount && Math.ceil(totalCount / showCount);

  const handleSetSelectedContacts = useMemo(
    () =>
      setSelectedContacts(
        getSelectedEntity({
          reportVal: 'selectedReportContacts',
          reportCompProp: reportPage
        }),
        getSelectedEntity({
          reportVal: setSelectedReportContactsAction,
          reportCompProp: reportPage
        })
      ),
    [setSelectedReportContactsAction, reportPage]
  );

  const getReportTableConfig = () => {
    if (userRole.nc1) return reportTableConfigForNC1;
    if (userRole.nc2) return reportTableConfigForNC2;
    if (userRole.manager) return reportTableConfigForManager;
    return {} as ITableConfig;
  };

  const handleChangeInput = debounce((value: string, name: string) => {
    if (!value.trim().length) return;

    setObjectRequest(MAP_REQUEST_REPORT[name](value, showCount));
    setInputValue(value);
  }, 500);

  const areFiltersDataNonEqual = () =>
    JSON.stringify(requestValues) !== JSON.stringify(filterSettings);

  // TODO ts
  const changeFilter = (filterParams: any) => {
    if (!filterParams.item) return;

    // Temporary solution to avoid repeating invoking of changeFilter func; TODO: refine after release
    const areDateFilterParamsEqual = () => {
      const getFilterParamsDates = (key: string) =>
        formatDateFilter(filterParams.item, FROM_TO_ARR, DD_MM_YYYY)[key] || '';
      const getFilterValueDates = (index: number) =>
        format(new Date(filterValue.date[index]), DD_MM_YYYY);

      return containsAllElems(
        [getFilterValueDates(0), getFilterValueDates(1)],
        [getFilterParamsDates('from'), getFilterParamsDates('to')]
      );
    };

    if (filterParams.code === 'date') {
      if (!filterValue?.date || !areDateFilterParamsEqual()) {
        dispatch(setPage(1));
        dispatch(
          setReportFilterValues({
            ...filtersState,
            [filterParams.code]: filterParams.item
          })
        );
      }
      return;
    }
    // Temporary solution to avoid repeating invoking of changeFilter func; TODO: refine after release

    dispatch(setPage(1));
    if (filterParams.isCheckbox) {
      const value = (filtersState[filterParams.code] as string[]).includes(
        filterParams.item
      )
        ? deleteItemFilter(
            filtersState[filterParams.code] as string[],
            filterParams.item
          )
        : addItemFilter(
            filtersState[filterParams.code] as string[],
            filterParams.item
          );
      dispatch(
        setReportFilterValues({
          ...filtersState,
          [filterParams.code]: [...value]
        })
      );
      return;
    }
    dispatch(
      setReportFilterValues({
        ...filtersState,
        [filterParams.code]: filterParams.item
      })
    );
  };

  const makeArrayAutocomplete = (name: string) =>
    loadedAutocomplete.reduce(
      // TODO ts
      (acc: any, current: any) => ({
        result: MAP_AUTOCOMPLETE_REPORT[name](acc, current)
      }),
      {
        result: []
      }
    );

  const autocompleteCallback = (value: string) => [
    ...new Set(makeArrayAutocomplete(value).result as string)
  ];

  const getAutocompleteObj: IAutocompleteReport = {
    employee: autocompleteCallback('employee'),
    role: ['NC1', 'NC2']
  };

  const autocompleteValues = (name: string): string[] => {
    return [...new Set(getAutocompleteObj[name])] || [];
  };

  const resetFilter = (name: string) => {
    dispatch(
      setReportFilterValues({
        [name]: Array.isArray(filtersState[name]) ? [] : ''
      })
    );
  };

  useEffect(() => {
    (async () => {
      if (inputValue.length) {
        const { data } = await getAutocompleteReport(objectRequest);
        setLoadedAutocomplete(data);
      }
    })();
  }, [inputValue]);

  // required here in order to update page, e.g. in case of importing contacts or updating the one/(-s)
  useEffect(() => {
    dispatch(getReport(requestValues));
  }, []);

  useEffect(() => {
    if (areFiltersDataNonEqual()) {
      dispatch(setReportFilterSettings(requestValues));
    }
  }, [currentPage, requestValues, sortBy]);

  useEffect(() => {
    if (areFiltersDataNonEqual()) {
      dispatch(getReport(requestValues));
    }
  }, [showCount, currentPage, filtersState, sortBy]);

  const datesRange = filtersState.date
    ? [parseISO(filtersState.date[0]), parseISO(filtersState.date[1])]
    : undefined;
  return (
    <div
      className={getTableData().length ? styles.dataTable : styles.dataWithout}
    >
      <Panel
        changeFilter={changeFilter}
        resetFilter={resetFilter}
        datesRange={datesRange}
      />
      <TableBase
        config={getReportTableConfig()}
        filtersValues={filtersState}
        data={getTableData()}
        count={count}
        setSelectedContacts={handleSetSelectedContacts}
        selectedContacts={selectedContacts}
        tableDataList={reportData}
        changeInput={handleChangeInput}
        changeFilter={changeFilter}
        resetFilter={resetFilter}
        otherHeight={OTHER_HEIGHT.reportTable}
        autocompleteValues={autocompleteValues}
        sortingState={sortingState}
        sortingFieldId={REPORT_SORTING_FIELDS_CONFIG}
        setSortAction={setReportSort}
        setSortValuesAction={setReportSortValues}
      />
    </div>
  );
};

export default Table;
