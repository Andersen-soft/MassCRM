import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import { TableBase, TablePanel } from 'src/components/common/';
import { ITableRow } from 'src/components/common/Table/interfaces';
import {
  exportTableConfig,
  MAP_AUTOCOMPLETE_EXPORT,
  MAP_REQUEST_EXPORT,
  OTHER_HEIGHT
} from 'src/utils/table';
import { formatDateFilter } from 'src/utils/form/date';
import {
  getFiltersData,
  getImportResult,
  setPage,
  setSelectedTabAction
} from 'src/actions';
import { IExport, IExportSearch, IImportSearch } from 'src/interfaces';
import { getCurrentPage, getFilterExportData } from 'src/selectors';
import { styleNames } from 'src/services';
import { ImportModal } from 'src/components/ImportModal';
import { IStatusTable } from './interfaces';
import style from '../../StatusPage.scss';

const sn = styleNames(style);

export const StatusTable: FC<IStatusTable> = ({
  selector,
  getData,
  setFilter,
  dataMap,
  getAutocomplete,
  title
}) => {
  const dispatch = useDispatch();
  const currentPage: number = useSelector(getCurrentPage);
  const { total, show, data, filter } = useSelector(selector);
  const statusFilter = useSelector(getFilterExportData);
  const [inputValue, setInputValue] = useState<string>('');
  const [objectRequest, setObjectRequest] = useState<any>(null);
  const [loadedAutocomplete, setLoadedAutocomplete] = useState<any>([]);
  const [openModal, setOpenModal] = useState<number>();
  const toggleModal = useCallback(
    (id?: number) => () => setOpenModal(id || 0),
    [setOpenModal]
  );

  const handleClick = useCallback(
    (id: number) => () => {
      dispatch(setSelectedTabAction('Import'));
      dispatch(getImportResult(id));
      toggleModal(id)();
    },
    []
  );

  const exportCells = useMemo(() => dataMap(handleClick), [toggleModal]);

  const dataTable: ITableRow[] = data.map(exportCells);
  const count = Math.ceil(total / show);

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

  const requestValues: IExportSearch | IImportSearch = useMemo(
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
    [currentPage, show, filter, findStatus]
  );

  const onChangeFilter = useCallback(
    (filterParams): void => {
      dispatch(setPage(1));
      dispatch(
        setFilter({
          ...filter,
          [filterParams.name]: filterParams.item
        })
      );
    },
    [filter, setFilter]
  );

  const resetFilter = useCallback(
    (name: string) => {
      dispatch(
        setFilter({
          ...filter,
          [name]: Array.isArray(filter[name]) ? [] : ''
        })
      );
    },
    [filter, setFilter]
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

  const modal = useMemo(
    () =>
      Boolean(openModal) && (
        <ImportModal
          open={Boolean(openModal)}
          onClose={toggleModal(0)}
          importTabs='Import'
        />
      ),
    [openModal, toggleModal]
  );

  useEffect(() => {
    dispatch(getData(requestValues));
  }, [currentPage, filter]);

  useEffect(() => {
    setLoadedAutocomplete(data);
  }, [data]);

  useEffect(() => {
    (async () => {
      if (inputValue.length > 1 && !objectRequest.search.status) {
        const { data: dataAutoComplete } = await getAutocomplete(objectRequest);
        setLoadedAutocomplete(dataAutoComplete);
      }
    })();
  }, [inputValue, statusFilter]);

  useEffect(() => {
    dispatch(getFiltersData());
  }, []);

  return (
    <>
      <TablePanel title={title} total={total} show={data.length} />
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
      {modal}
    </>
  );
};
