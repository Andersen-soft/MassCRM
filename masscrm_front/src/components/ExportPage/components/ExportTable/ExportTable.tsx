import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import { TableBase } from 'src/components/common/';
import { ITableRow } from 'src/components/common/Table/interfaces';
import {
  exportTableConfig,
  exportTableMap,
  MAP_AUTOCOMPLETE_EXPORT,
  MAP_REQUEST_EXPORT,
  OTHER_HEIGHT
} from 'src/utils/table';
import { formatDateFilter } from 'src/utils/form/date';
import {
  getAutocompleteExport,
  getExportList,
  setExportFilter,
  setPage
} from 'src/actions';
import { IExport, IExportDataTable, IExportSearch } from 'src/interfaces';
import { getCurrentPage, getFilterExportData } from 'src/selectors';
import { styleNames } from 'src/services';
import style from '../../ExportPage.scss';

const sn = styleNames(style);

export const ExportTable: FC<IExportDataTable> = ({
  data,
  total,
  show,
  filter
}) => {
  const dispatch = useDispatch();
  const dataTable: ITableRow[] = data.map(exportTableMap);
  const count = Math.ceil(total / show);
  const currentPage: number = useSelector(getCurrentPage);
  const statusFilter = useSelector(getFilterExportData);
  const [inputValue, setInputValue] = useState<string>('');
  const [objectRequest, setObjectRequest] = useState<any>(null);
  const [loadedAutocomplete, setLoadedAutocomplete] = useState<any>([]);

  const findStatus = useCallback(
    (status: string) => {
      const keys = Object.keys(statusFilter);
      let result = '';
      keys.forEach(item => {
        if (statusFilter[item] === status) result = item;
      });
      return result;
    },
    [statusFilter]
  );

  const requestValues: IExportSearch = useMemo(
    () => ({
      limit: show || undefined,
      page: currentPage,
      search: {
        user: filter?.user || undefined,
        date: filter?.date ? formatDateFilter(filter?.date) : undefined,
        status: filter?.status ? findStatus(filter?.status) : undefined,
        name: filter?.name || undefined
      }
    }),
    [currentPage, show, filter]
  );

  const onChangeFilter = useCallback(
    (filterParams): void => {
      dispatch(setPage(1));
      dispatch(
        setExportFilter({
          ...filter,
          [filterParams.name]: filterParams.item
        })
      );
    },
    [filter]
  );

  const resetFilter = useCallback(
    (name: string) => {
      dispatch(
        setExportFilter({
          ...filter,
          [name]: Array.isArray(filter[name]) ? [] : ''
        })
      );
    },
    [filter]
  );

  const handleChangeInput = debounce((value: string, name: string) => {
    setObjectRequest(
      MAP_REQUEST_EXPORT[name](value, formatDateFilter(filter.date || []), show)
    );
    setInputValue(value);
  }, 500);

  const makeArrayAutocomplete = (name: string) => {
    return name === 'status'
      ? { result: Object.values(statusFilter) }
      : loadedAutocomplete?.reduce(
          (acc: IExport, current: IExport) => ({
            result: MAP_AUTOCOMPLETE_EXPORT[name](acc, current)
          }),
          { result: [] }
        );
  };
  const autocompleteValues = (name: string): string[] =>
    [...new Set(makeArrayAutocomplete(name).result as string)] || [];

  useEffect(() => {
    dispatch(getExportList(requestValues));
  }, [currentPage, filter]);

  useEffect(() => {
    setLoadedAutocomplete(data);
  }, [data]);

  useEffect(() => {
    (async () => {
      if (inputValue.length > 1 && !objectRequest.search.status) {
        const { data: dataAutoComplete } = await getAutocompleteExport(
          objectRequest
        );
        setLoadedAutocomplete(dataAutoComplete);
      }
    })();
  }, [inputValue, statusFilter]);

  return (
    <>
      {dataTable.length || filter ? (
        <TableBase
          config={exportTableConfig}
          changeFilter={onChangeFilter}
          resetFilter={resetFilter}
          filtersValues={filter}
          autocompleteValues={autocompleteValues}
          changeInput={handleChangeInput}
          data={dataTable}
          count={count}
          otherHeight={OTHER_HEIGHT.exportTable}
        />
      ) : (
        <div className={sn('data-mess')}>
          <p>No data to display</p>
        </div>
      )}
    </>
  );
};
