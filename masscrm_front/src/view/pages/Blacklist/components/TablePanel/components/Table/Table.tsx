import React, { useCallback, useEffect, useMemo, useState, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import {
  getCurrentPage,
  getSelectedContacts,
  getBlacklistSelector,
  getBlacklistTotalCount,
  getFiltersUse,
  deleteBlacklistItem,
  fetchBlacklistContacts,
  getAutocompleteBlacklist,
  setBlacklistFilterSettings,
  setFiltersUse,
  setPage,
  setSelectedBlacklistContactsAction,
  setSelectedContacts,
  setBlacklistFilterValues,
  initBlacklistFiltersState
} from 'src/store/slices';
import { TableBase } from 'src/view/organisms';
import { IBlacklistItem, IBlacklistSearch } from 'src/interfaces';
import {
  getDatesPeriod,
  formatDateFilter,
  getSelectedEntity,
  OTHER_HEIGHT
} from 'src/utils';
import history from 'src/utils/history';
import { SORT } from 'src/constants';
import { MAP_AUTOCOMPLETE_BLACKLIST, MAP_REQUEST_BLACKLIST } from './helpers';
import { blacklistTableConfig, blacklistTableMap } from './configs';
import { useStyles } from './Table.styles';

interface IProps {
  showCount: number;
  blacklistPage: boolean;
}

export const Table: FC<IProps> = ({ showCount, blacklistPage }) => {
  const dispatch = useDispatch();

  const blacklist = useSelector(getBlacklistSelector);
  const totalCount = useSelector(getBlacklistTotalCount);
  const isFiltersUse = useSelector(getFiltersUse);
  const currentPage = useSelector(getCurrentPage);
  const selectedContacts = useSelector(
    getSelectedContacts(
      getSelectedEntity({
        blacklistVal: 'selectedBlacklistContacts',
        blacklistCompProp: blacklistPage
      })
    )
  );

  const { search: filterQueriesString } = history.location;

  const styles = useStyles();

  const paramURL = new URLSearchParams(history.location.search);
  const filtersParamURL = paramURL.get('blacklistfilter');
  const filterValue = filtersParamURL && JSON.parse(filtersParamURL);
  const filtersState = {
    ...initBlacklistFiltersState,
    ...filterValue
  };

  const dataTable = blacklist?.map(blacklistTableMap);

  const [inputValue, setInputValue] = useState<string>('');

  const requestValues: IBlacklistSearch = useMemo(
    () => ({
      limit: showCount,
      page: currentPage,
      search: {
        domain: filtersState.blacklist || undefined,
        user: filtersState.user || undefined,
        date: getDatesPeriod(filtersState.date)
      },
      sort: SORT
    }),
    [showCount, currentPage, filtersState, SORT]
  );

  const onChangeFilter = useCallback(
    (filterParams: any): void => {
      if (!filterParams.item) return;

      dispatch(setPage(1));
      dispatch(
        setBlacklistFilterValues({
          ...filtersState,
          [filterParams.code]: filterParams.item
        })
      );
    },
    [filtersState]
  );

  const resetFilter = useCallback(
    (code: string) => {
      dispatch(setPage(1));
      dispatch(
        setBlacklistFilterValues({
          ...filtersState,
          [code]: Array.isArray(filtersState[code]) ? [] : ''
        })
      );
      dispatch(fetchBlacklistContacts(requestValues));
    },
    [filtersState]
  );

  const getBlacklistData = useCallback(
    () => dispatch(fetchBlacklistContacts(requestValues)),
    [requestValues]
  );

  const deleteData = (ids: number[]) =>
    deleteBlacklistItem(ids).then(() => getBlacklistData());

  const count = totalCount && Math.ceil(totalCount / showCount);

  const [objectRequest, setObjectRequest] = useState<any>(null);

  const [loadedAutocomplete, setLoadedAutocomplete] = useState<any>([]);

  const handleChangeInput = debounce((value: string, code: string) => {
    if (!value.trim().length) return;

    setObjectRequest(
      MAP_REQUEST_BLACKLIST[code](
        value,
        formatDateFilter(filtersState.date),
        showCount
      )
    );
    setInputValue(value);
  }, 500);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const makeArrayAutocomplete = (code: string) =>
    loadedAutocomplete.reduce(
      (acc: IBlacklistItem, current: IBlacklistItem) => ({
        // temporarily filter is applicable only for blacklist-email due to the absence of corresponding filter on the backend side
        // TODO refine after backend will be implemented
        result: MAP_AUTOCOMPLETE_BLACKLIST.blacklist(acc, current)
      }),
      {
        result: []
      }
    );

  const autocompleteValues = (code: string): string[] =>
    [...new Set(makeArrayAutocomplete(code).result as string)] || [];

  const handleSetSelectedContacts = useMemo(
    () =>
      setSelectedContacts(
        getSelectedEntity({
          blacklistVal: 'selectedBlacklistContacts',
          blacklistCompProp: blacklistPage
        }),
        getSelectedEntity({
          blacklistVal: setSelectedBlacklistContactsAction,
          blacklistCompProp: blacklistPage
        })
      ),
    [setSelectedBlacklistContactsAction, blacklistPage]
  );

  useEffect(() => {
    getBlacklistData();
  }, [showCount, currentPage, filtersParamURL]);

  useEffect(() => {
    (async () => {
      if (inputValue.length) {
        const { data } = await getAutocompleteBlacklist(objectRequest);
        setLoadedAutocomplete(data);
      }
    })();
  }, [inputValue]);

  useEffect(() => {
    dispatch(setBlacklistFilterSettings(requestValues));
  }, [currentPage, filterQueriesString]);

  useEffect(() => {
    if (
      (filtersState.blacklist ||
        filtersState.user ||
        filtersState.date?.length) &&
      !isFiltersUse
    ) {
      dispatch(setFiltersUse(true));
    }
    !filtersState.blacklist &&
      !filtersState.user &&
      !filtersState.date?.length &&
      isFiltersUse &&
      dispatch(setFiltersUse(false));
  }, [filterQueriesString]);

  return (
    <>
      {dataTable.length || isFiltersUse ? (
        <TableBase
          config={blacklistTableConfig}
          filtersValues={filtersState}
          changeFilter={onChangeFilter}
          resetFilter={resetFilter}
          data={dataTable}
          onDeleteData={deleteData}
          autocompleteValues={autocompleteValues}
          otherHeight={OTHER_HEIGHT.blacklistTable}
          changeInput={handleChangeInput}
          count={count}
          setSelectedContacts={handleSetSelectedContacts}
          selectedContacts={selectedContacts}
          tableDataList={blacklist}
          filterRequestValues={requestValues}
        />
      ) : (
        <div className={styles.dataMess}>
          <p className={styles.dataMessP}>No data to display</p>
        </div>
      )}
    </>
  );
};
