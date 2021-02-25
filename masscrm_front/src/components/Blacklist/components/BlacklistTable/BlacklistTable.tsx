import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import {
  getCurrentPage,
  getSelectedContacts,
  getBlacklistFilter,
  getBlacklistSelector,
  getBlacklistTotalCount,
  getFiltersUse
} from 'src/selectors';
import {
  deleteBlacklistItem,
  getBlacklist,
  getAutocompleteBlacklist,
  setBlacklistFilterSettings,
  setFiltersUse,
  setPage,
  setSelectedBlacklistContactsAction,
  setSelectedContacts,
  setBlacklistFilterValues
} from 'src/actions';
import { TableBase } from 'src/components/common';
import { IBlacklistItem, IBlacklistSearch } from 'src/interfaces';
import {
  blacklistTableConfig,
  blacklistTableMap,
  MAP_AUTOCOMPLETE_BLACKLIST,
  MAP_REQUEST_BLACKLIST,
  OTHER_HEIGHT,
  SORT
} from 'src/utils/table';
import { getDatesPeriod } from 'src/utils/dates';
import { formatDateFilter } from 'src/utils/form/date';
import { styleNames } from 'src/services';
import { getSelectedEntity } from 'src/utils/selectedEntity';
import { setLocalStorageItem } from 'src/utils/localStorage';
import { useHistory, useLocation } from 'react-router-dom';
import { TABLE_DEFAULT_INIT_URL } from 'src/constants';
import { IPropsBlacklistTable } from '../../interfaces';
import style from './BlacklistTable.scss';

const sn = styleNames(style);

export const BlacklistTable = ({
  showCount,
  blacklistPage
}: IPropsBlacklistTable) => {
  const dispatch = useDispatch();
  const blacklist = useSelector(getBlacklistSelector);
  const totalCount = useSelector(getBlacklistTotalCount);
  const filtersState = useSelector(getBlacklistFilter);
  const isFiltersUse = useSelector(getFiltersUse);
  const currentPage: number = useSelector(getCurrentPage);

  const selectedContacts = useSelector(
    getSelectedContacts(
      getSelectedEntity({
        blacklistVal: 'selectedBlacklistContacts',
        blacklistCompProp: blacklistPage
      })
    )
  );

  const { search: filterQueriesString } = useLocation();
  const history = useHistory();

  const dataTable = blacklist?.map(blacklistTableMap);

  const [inputValue, setInputValue] = useState<string>('');

  const requestValues: IBlacklistSearch = {
    limit: showCount,
    page: currentPage,
    search: {
      domain: filtersState.blacklist || undefined,
      user: filtersState.user || undefined,
      date: getDatesPeriod(filtersState.date)
    },
    sort: SORT
  };

  const onChangeFilter = useCallback(
    (filterParams: any): void => {
      if (!filterParams.item) return;

      dispatch(setPage(1));
      dispatch(
        setBlacklistFilterValues({
          ...filtersState,
          [filterParams.name]: filterParams.item
        })
      );
    },
    [filtersState]
  );

  const resetFilter = useCallback(
    (name: string) => {
      dispatch(
        setBlacklistFilterValues({
          ...filtersState,
          [name]: Array.isArray(filtersState[name]) ? [] : ''
        })
      );
    },
    [filtersState]
  );

  const getBlacklistData = () => dispatch(getBlacklist(requestValues));

  const deleteData = (ids: number[]) =>
    deleteBlacklistItem(ids).then(() => getBlacklistData());

  const count = totalCount && Math.ceil(totalCount / showCount);

  const [objectRequest, setObjectRequest] = useState<any>(null);

  const [loadedAutocomplete, setLoadedAutocomplete] = useState<any>([]);

  const handleChangeInput = debounce((value: string, name: string) => {
    if (!value.trim().length) return;

    setObjectRequest(
      MAP_REQUEST_BLACKLIST[name](
        value,
        formatDateFilter(filtersState.date),
        showCount
      )
    );
    setInputValue(value);
  }, 500);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const makeArrayAutocomplete = (name: string) =>
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

  const initialLocalStorageValues = (localStorageKey: string) => {
    const localStorageFilters = localStorage.getItem(localStorageKey);

    return localStorageFilters ? JSON.parse(localStorageFilters) : {};
  };

  const localStorageBasicConfig = {
    blacklistCompProp: blacklistPage,
    blacklistVal: 'blacklist'
  };

  const currPageName = getSelectedEntity(localStorageBasicConfig);

  const setLocalStorage = (updateStorageFunc: Function) => {
    updateStorageFunc(currPageName);
  };

  const autocompleteValues = (name: string): string[] =>
    [...new Set(makeArrayAutocomplete(name).result as string)] || [];

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
    (async () => {
      if (inputValue.length) {
        const { data } = await getAutocompleteBlacklist(objectRequest);
        setLoadedAutocomplete(data);
      }
    })();
  }, [inputValue]);

  useEffect(() => {
    if (filterQueriesString) {
      if (!filterQueriesString.includes(TABLE_DEFAULT_INIT_URL)) {
        return setLocalStorage(
          setLocalStorageItem('filterQueriesString', filterQueriesString)
        );
      }
      return localStorage.removeItem(currPageName);
    }
    const storageFilterQueriesString = initialLocalStorageValues(currPageName)
      ?.filterQueriesString;

    return (
      storageFilterQueriesString &&
      history.push({
        search: storageFilterQueriesString
      })
    );
  }, [filterQueriesString]);

  useEffect(() => {
    dispatch(setBlacklistFilterSettings(requestValues));
  }, [currentPage, requestValues]);

  useEffect(() => {
    if (
      filterQueriesString ||
      !initialLocalStorageValues(currPageName)?.filterQueriesString
    ) {
      getBlacklistData();

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
    }
  }, [showCount, currentPage, filtersState]);

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
        />
      ) : (
        <div className={sn('data-mess')}>
          <p>No data to display</p>
        </div>
      )}
    </>
  );
};
