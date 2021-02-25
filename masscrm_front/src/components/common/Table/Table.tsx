import React, { ChangeEvent, FC, useEffect, useState, useRef } from 'react';
import { TableContainer, TableBody, Table, Paper } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { getContactListRequest, setPage } from 'src/actions';
import { getCurrentPage, getLoader, getUser } from 'src/selectors';
import { useLocation } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { TableHeader, TableRowItem } from './components';
import { ITableConfig, ITableProps } from './interfaces';
import { tableStyle } from './Table.style';
import { Loader } from '../Loader';

export const TableBase: FC<ITableProps> = ({
  fetchUsers,
  changeInput,
  count,
  resetFilter,
  autocompleteValues,
  filtersValues,
  changeFilter,
  config,
  data,
  onDeleteData,
  onEdit,
  clearAutocompleteList,
  otherHeight,
  isFullTable,
  requestValues,
  setSelectedContacts,
  selectedContacts,
  isMyContacts
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const scrollRef = useRef<HTMLTableElement>(null);
  const load = useSelector(getLoader);
  const currentUser = useSelector(getUser);
  const style = tableStyle({ otherHeight });

  const [filteredBy, setFilteredBy] = useState<Array<string>>([]);
  const currentPage = useSelector(getCurrentPage);

  const isNC2myContacts =
    Object.keys(currentUser.roles).includes('nc2') && isMyContacts;

  const onSelectRow = (item: number) =>
    setSelectedContacts && dispatch(setSelectedContacts({ id: item }));

  const handleDeleteMultipleContacts = () => {
    onDeleteData && selectedContacts && onDeleteData(selectedContacts);
    setSelectedContacts && dispatch(setSelectedContacts({}));
  };

  const onDeleteSelected = (id?: number) =>
    onDeleteData && (id ? onDeleteData([id]) : handleDeleteMultipleContacts());

  const onSelectAll = () =>
    setSelectedContacts && dispatch(setSelectedContacts({ data }));

  const onFilteredBy = () => {
    return setFilteredBy(state => state.filter(id => !filteredBy.includes(id)));
  };

  const tableScrollUp = () =>
    scrollRef.current && scrollRef.current.scrollIntoView();

  const onChangePage = (event: ChangeEvent<unknown>, page: number) => {
    dispatch(setPage(page));
    tableScrollUp();
  };

  const tableConfig: ITableConfig = {
    ...config,
    column: {
      ...config.column,
      onSelectAll,
      onDeleteSelected,
      onSelectRow,
      onFilteredBy,
      onEdit
    },
    body: {
      selectedRows: selectedContacts,
      filteredBy
    }
  };

  useEffect(() => {
    const param = new URLSearchParams(location.search);
    const selectAll = param.get('selectAll');
    const selectAllOnPage = param.get('selectAllOnPage');
    const page = param.get('page');

    const handleSelectedContacts = (pageNumber: string | null) => {
      getContactListRequest({
        ...requestValues,
        page: Number(pageNumber)
      }).then(
        (contactList: AxiosResponse) =>
          setSelectedContacts &&
          dispatch(setSelectedContacts({ data: contactList.data }))
      );
    };

    if (selectAll) {
      handleSelectedContacts(page);
    }
    if (selectAllOnPage && selectAllOnPage === String(currentPage)) {
      handleSelectedContacts(selectAllOnPage);
    }
    if (selectAllOnPage && selectAllOnPage !== String(currentPage)) {
      setSelectedContacts && dispatch(setSelectedContacts({}));
    }
  }, [location]);

  return (
    <>
      <TableContainer
        component={Paper}
        classes={{ root: `${style.customTable} ${style.tableHeight}` }}
      >
        <Table stickyHeader aria-label='sticky table' ref={scrollRef}>
          <TableHeader
            data={data}
            changeInput={changeInput}
            resetFilter={resetFilter}
            autocompleteValues={autocompleteValues}
            filtersValues={filtersValues}
            changeFilter={changeFilter}
            config={tableConfig}
            clearAutocompleteList={clearAutocompleteList}
            isFullTable={isFullTable}
            currentPage={currentPage}
            setSelectedContacts={setSelectedContacts}
            isNC2myContacts={isNC2myContacts}
          />
          <TableBody
            classes={{ root: `${style.customBody} ${load && style.tableBlur}` }}
          >
            {data &&
              data.map(item => (
                <TableRowItem
                  config={tableConfig.column}
                  row={item}
                  key={item.id}
                  data={tableConfig.body}
                  currentPage={currentPage}
                  fetchUsers={fetchUsers}
                  isNC2myContacts={isNC2myContacts}
                />
              ))}
            {load && <Loader />}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        classes={{ root: style.pagination }}
        count={count}
        page={currentPage}
        onChange={onChangePage}
      />
    </>
  );
};
