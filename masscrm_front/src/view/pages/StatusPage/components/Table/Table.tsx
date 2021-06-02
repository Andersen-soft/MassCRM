import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
  ChangeEvent
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { TableBase, TablePanel } from 'src/view/organisms';
import { formatDateFilter, OTHER_HEIGHT } from 'src/utils';
import {
  getFiltersData,
  getImportResult,
  setPage,
  setSelectedTabAction,
  getCurrentPage,
  getFilterExportData,
  setShowCountImportContacts,
  setShowCountExportContacts
} from 'src/store/slices';
import {
  IExport,
  IExportSearch,
  IImportSearch,
  ITableRow,
  IExportDataTable,
  IImportDataTable,
  IStoreState
} from 'src/interfaces';
import { ImportModal } from 'src/view/modals';
import { SHOW_COUNTS_STATUS_TABLE } from './constants';
import { useStyles } from './Table.styles';
import { MAP_AUTOCOMPLETE_EXPORT, MAP_REQUEST_EXPORT } from './helpers';
import { exportTableConfig } from './configs';

interface IProps {
  selector: (state: IStoreState) => IImportDataTable | IExportDataTable;
  getData: Function;
  setFilter: Function;
  dataMap: Function;
  getAutocomplete: Function;
  title?: string;
  isImport?: boolean;
}

export const Table: FC<IProps> = ({
  selector,
  getData,
  setFilter,
  dataMap,
  getAutocomplete,
  title,
  isImport
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

  const styles = useStyles();

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
          [filterParams.code]: filterParams.item
        })
      );
    },
    [filter, setFilter]
  );

  const resetFilter = useCallback(
    (name: string) => {
      dispatch(setPage(1));
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
      openModal && (
        <ImportModal
          open={!!openModal}
          onClose={toggleModal(0)}
          importTabs='Import'
        />
      ),
    [openModal, toggleModal]
  );

  const handleChangeShowCount = (event: ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as number;

    dispatch(setPage(1));
    dispatch(
      isImport
        ? setShowCountImportContacts(value)
        : setShowCountExportContacts(value)
    );
  };

  useEffect(() => {
    dispatch(getData(requestValues));
  }, [currentPage, filter, show]);

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
      <TablePanel
        title={title}
        total={total}
        show={show}
        countConfig={SHOW_COUNTS_STATUS_TABLE}
        handleChangeShowCount={handleChangeShowCount}
      />
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
        <div className={styles.dataMess}>
          <p className={styles.dataMessP}>No data to display</p>
        </div>
      )}
      {modal}
    </>
  );
};
