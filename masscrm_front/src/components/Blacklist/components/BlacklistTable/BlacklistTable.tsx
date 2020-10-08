import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import { getCurrentPage } from 'src/selectors';
import { setPage } from 'src/actions';
import { TableBase } from 'src/components/common/Table';
import {
  deleteBlacklistItem,
  getBlacklist,
  getAutocompleteBlacklist,
  setBlacklistFilter,
  setFiltersUse
} from 'src/actions/blacklist.action';
import {
  getBlacklistFilter,
  getBlacklistSelector,
  getTotalCount,
  getFiltersUse
} from 'src/selectors/blacklist.selector';
import {
  IBlacklistFiltersState,
  IBlacklistItem,
  IBlacklistSearch
} from 'src/interfaces';
import {
  blacklistTableConfig,
  blacklistTableMap,
  MAP_AUTOCOMPLETE_BLACKLIST,
  MAP_REQUEST_BLACKLIST,
  OTHER_HEIGHT,
  SORT
} from 'src/utils/table';
import { formatDateFilter } from 'src/utils/form/date';
import { styleNames } from 'src/services';
import style from './BlacklistTable.scss';
import { IPropsBlacklistTable } from '../../interfaces';

const sn = styleNames(style);

export const BlacklistTable = ({ showCount }: IPropsBlacklistTable) => {
  const dispatch = useDispatch();
  const blacklist = useSelector(getBlacklistSelector);
  const totalCount = useSelector(getTotalCount);
  const filtersState = useSelector(getBlacklistFilter);
  const isFiltersUse = useSelector(getFiltersUse);
  const currentPage: number = useSelector(getCurrentPage);
  const dataTable = blacklist?.map(blacklistTableMap);

  const [inputValue, setInputValue] = useState<string>('');

  const filtersValues: IBlacklistFiltersState = {
    blacklist: filtersState.blacklist,
    user: filtersState.user,
    date: filtersState.date || []
  };

  const requestValues: IBlacklistSearch = {
    limit: showCount,
    page: currentPage,
    search: {
      domain: filtersState.blacklist || undefined,
      user: filtersState.user || undefined,
      date: formatDateFilter(filtersState.date)
    },
    sort: SORT
  };

  const onChangeFilter = useCallback(
    (filterParams: any): void => {
      dispatch(setPage(1));
      dispatch(
        setBlacklistFilter({
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
        setBlacklistFilter({
          ...filtersState,
          [name]: Array.isArray(filtersState[name]) ? [] : ''
        })
      );
    },
    [filtersState]
  );

  useEffect(() => {
    dispatch(getBlacklist(requestValues));
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
  }, [showCount, currentPage, filtersState]);

  const deleteData = (ids: number[]) =>
    deleteBlacklistItem(ids).then(() => dispatch(getBlacklist(requestValues)));

  const count = totalCount && Math.ceil(totalCount / showCount);

  const [objectRequest, setObjectRequest] = useState<any>(null);

  const [loadedAutocomplete, setLoadedAutocomplete] = useState<any>([]);

  const handleChangeInput = debounce((value: string, name: string) => {
    setObjectRequest(
      MAP_REQUEST_BLACKLIST[name](
        value,
        formatDateFilter(filtersState.date),
        showCount
      )
    );
    setInputValue(value);
  }, 500);

  const makeArrayAutocomplete = (name: string) =>
    loadedAutocomplete?.reduce(
      (acc: IBlacklistItem, current: IBlacklistItem) => ({
        result: MAP_AUTOCOMPLETE_BLACKLIST[name](acc, current)
      }),
      {
        result: []
      }
    );

  const autocompleteValues = (name: string): string[] =>
    [...new Set(makeArrayAutocomplete(name).result as string)] || [];

  useEffect(() => {
    (async () => {
      if (inputValue.length > 1) {
        const { data } = await getAutocompleteBlacklist(objectRequest);
        setLoadedAutocomplete(data);
      }
    })();
  }, [inputValue]);

  return (
    <>
      {dataTable.length || isFiltersUse ? (
        <TableBase
          config={blacklistTableConfig}
          filtersValues={filtersValues}
          changeFilter={onChangeFilter}
          resetFilter={resetFilter}
          data={dataTable}
          onDeleteData={deleteData}
          autocompleteValues={autocompleteValues}
          otherHeight={OTHER_HEIGHT.blacklistTable}
          changeInput={handleChangeInput}
          count={count}
        />
      ) : (
        <div className={sn('data-mess')}>
          <p>No data to display</p>
        </div>
      )}
    </>
  );
};
