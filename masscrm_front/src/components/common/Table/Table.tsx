import React, { ChangeEvent, FC, useEffect, useState, useRef } from 'react';
import { TableContainer, TableBody, Table, Paper } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { getContactListRequest, setPage } from 'src/actions';
import { getCurrentPage, getLoader, getUser } from 'src/selectors';
import { useHistory, useLocation } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { getStringifiedItemsWithoutChosenOne } from 'src/utils/array/filters';
import { createProperty, getObjectValueFunction } from 'src/utils/object';
import { TableHeader, TableRowItem } from './components';
import { ITableConfig, ITableProps, ITableRow } from './interfaces';
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
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const scrollRef = useRef<HTMLTableElement>(null);
  const load = useSelector(getLoader);
  const currentUser = useSelector(getUser);
  const style = tableStyle({ otherHeight });

  const param = new URLSearchParams(location.search);
  const selectAllOnPage = param.get('selectAllOnPage');
  const checkedContacts = param.get('selectedContacts');
  const page = param.get('page');

  const [filteredBy, setFilteredBy] = useState<string[]>([]);
  const currentPage = useSelector(getCurrentPage);
  const currentPageStringified = `${currentPage}`;
  const contactsIDs = data?.map(({ id: contactId }: ITableRow) => contactId);
  const checkedContactsArray = checkedContacts
    ?.split(',')
    .filter(contact => contact)
    .map(contact => +contact);

  const areAllCheckedContactsFromCurrentPage = (item: number) =>
    contactsIDs?.every(contactId =>
      [...(checkedContactsArray || []), item].includes(contactId)
    );

  const isNC2myContacts =
    Object.keys(currentUser.roles).includes('nc2') && isMyContacts;

  const onSelectRow = (item: number) => (value: boolean) => {
    const itemStringified = `${item}`;

    const checkedRowCasesConfig = {
      [createProperty(
        'firstCase',
        areAllCheckedContactsFromCurrentPage(item)
      )]: () => {
        param.delete('selectedContacts');
        param.set('selectAllOnPage', currentPageStringified);
      },
      [createProperty('secondCase', !checkedContacts)]: () => {
        param.set('selectedContacts', itemStringified);
      },
      [createProperty('thirdCase', !!checkedContacts)]: () => {
        param.set('selectedContacts', `${checkedContacts},${item}`);
      },
      default: () => {}
    };

    const uncheckedRowCasesConfig = {
      [createProperty(
        'firstCase',
        checkedContactsArray?.length === 1 &&
          checkedContactsArray.includes(item)
      )]: () => {
        param.delete('selectedContacts');
      },
      [createProperty(
        'secondCase',
        checkedContactsArray && checkedContactsArray?.length > 1
      )]: () => {
        param.set(
          'selectedContacts',
          getStringifiedItemsWithoutChosenOne(item, checkedContactsArray)
        );
      },
      [createProperty(
        'thirdCase',
        selectAllOnPage === currentPageStringified
      )]: () => {
        param.delete('selectAllOnPage');
        param.set(
          'selectedContacts',
          getStringifiedItemsWithoutChosenOne(item, selectedContacts)
        );
      },
      default: () => {}
    };

    if (value) {
      getObjectValueFunction(checkedRowCasesConfig);
    } else {
      getObjectValueFunction(uncheckedRowCasesConfig);
    }

    history.push({
      search: param.toString()
    });
  };

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

  const onChangePage = (event: ChangeEvent<unknown>, pageNum: number) => {
    dispatch(setPage(pageNum));
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
    const handleSelectedContacts = (
      pageNumber: string | null,
      items?: { id: number }[],
      isConcatItems?: boolean
    ) => {
      getContactListRequest({
        ...requestValues,
        page: +(pageNumber || 1)
      }).then((contactList: AxiosResponse) => {
        setSelectedContacts &&
          dispatch(
            setSelectedContacts({
              data:
                isConcatItems && items
                  ? [...contactList.data, ...items]
                  : items || contactList.data
            })
          );
      });
    };

    const selectedItems = checkedContactsArray?.map(
      (checkedContact: number) => ({
        id: checkedContact
      })
    );

    const resetSelectedContacts = () =>
      setSelectedContacts && dispatch(setSelectedContacts({}));

    if (selectAllOnPage) {
      if (selectAllOnPage === currentPageStringified) {
        // eslint-disable-next-line no-unused-expressions
        checkedContacts
          ? handleSelectedContacts(selectAllOnPage, selectedItems, true)
          : handleSelectedContacts(selectAllOnPage);
      } else {
        // eslint-disable-next-line no-unused-expressions
        checkedContacts
          ? handleSelectedContacts(selectAllOnPage, selectedItems, true)
          : resetSelectedContacts();
      }
    } else {
      // eslint-disable-next-line no-unused-expressions
      selectedItems
        ? handleSelectedContacts(page, selectedItems)
        : resetSelectedContacts();
    }
  }, [location]);

  return (
    <>
      <TableContainer
        component={Paper}
        classes={{ root: `${style.customTable} ${style.tableHeight}` }}
      >
        <Table
          stickyHeader
          aria-label='sticky table'
          ref={scrollRef}
          data-testid='table'
        >
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
            currentPageStringified={currentPageStringified}
            setSelectedContacts={setSelectedContacts}
            selectedContacts={selectedContacts}
            isNC2myContacts={isNC2myContacts}
            param={param}
            checkedContacts={checkedContacts}
            selectAllOnPage={selectAllOnPage}
            checkedContactsArray={checkedContactsArray}
            contactsIDs={contactsIDs}
          />
          <TableBody
            classes={{ root: `${style.customBody} ${load && style.tableBlur}` }}
            data-testid='table_body'
          >
            {data.length ? (
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
              ))
            ) : (
              <div className={style.noDataMessage}>No data to display</div>
            )}
            {load && <Loader />}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        classes={{ root: style.pagination }}
        count={count}
        page={currentPage}
        onChange={onChangePage}
        data-testId='table_pagination'
      />
    </>
  );
};
