import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { TableContainer, TableBody, Table, Paper } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import {
  getContactListRequest,
  setPage,
  setSelectedContacts
} from 'src/actions';
import { getCurrentPage, getLoader, getSelectedContacts } from 'src/selectors';
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
  requestValues
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const load = useSelector(getLoader);
  const selectedContacts = useSelector(getSelectedContacts);
  const style = tableStyle({ otherHeight });

  const [filteredBy, setFilteredBy] = useState<Array<string>>([]);
  const currentPage = useSelector(getCurrentPage);

  const onDeleteSelected = (id?: number) =>
    onDeleteData && (id ? onDeleteData([id]) : onDeleteData(selectedContacts));

  const onSelectRow = (item: number) =>
    dispatch(setSelectedContacts({ id: item }));

  const onSelectAll = () => dispatch(setSelectedContacts({ data }));

  const onFilteredBy = () => {
    return setFilteredBy(state => state.filter(id => !filteredBy.includes(id)));
  };

  const onChangePage = (event: ChangeEvent<unknown>, page: number) => {
    dispatch(setPage(page));
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
    if (selectAll || selectAllOnPage === String(currentPage)) {
      dispatch(setSelectedContacts({ data }));
    }
    if (selectAllOnPage && selectAllOnPage !== String(currentPage)) {
      getContactListRequest({
        ...requestValues,
        page: Number(selectAllOnPage)
      }).then((contactList: AxiosResponse) =>
        dispatch(setSelectedContacts({ data: contactList.data }))
      );
    }
  }, [location]);

  return (
    <>
      <TableContainer
        component={Paper}
        classes={{ root: `${style.customTable} ${style.tableHeight}` }}
      >
        <Table stickyHeader aria-label='sticky table'>
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
