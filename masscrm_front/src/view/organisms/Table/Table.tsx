import React, { ChangeEvent, FC, useEffect, useState, useRef } from 'react';
import { TableContainer, TableBody, Table, Paper } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import {
  getStringifiedItemsWithoutChosenOne,
  containsAllElems,
  createProperty,
  getObjectValueFunction
} from 'src/utils';
import {
  ITableConfig,
  ITableRow,
  Open,
  IUserFiltersValues,
  IExportInputFilterValues,
  FiltersStateType,
  IContactFilter,
  IContactsSortingFieldId,
  IReportSortingState,
  ISortingState,
  IFilterValue
} from 'src/interfaces';
import { NC1, NC2 } from 'src/constants';
import { setPage, getCurrentPage, getLoader, getUser } from 'src/store/slices';
import { Loader } from 'src/view/atoms';
import { TableRowItem, TableHeader } from './components';
import { FilterRequestValues } from './interfaces';
import { useStyles } from './Table.styles';

interface IProps {
  config: ITableConfig;
  data: ITableRow[];
  fetchUsers?: () => void;
  clearAutocompleteList?: () => void;
  currentPage?: number;
  count?: number;
  onChangePage?: Function;
  changeFilter?: (
    obj: IFilterValue | IUserFiltersValues | IExportInputFilterValues
  ) => void;
  resetFilter?: (name: string) => void;
  autocompleteValues?: (name: string) => string[];
  changeInput?: (value: string, name: string) => void;
  filtersValues: FiltersStateType;
  inputFilter?: Function;
  onChangeData?: (fun: (item: ITableRow) => boolean) => void;
  onDeleteData?: (ids: number[]) => void;
  onEdit?: (id: number, type?: Open) => void;
  otherHeight?: any;
  isFullTable?: boolean;
  requestValues?: IContactFilter;
  setSelectedContacts?: Function;
  selectedContacts?: number[];
  isMyContacts?: boolean;
  tableDataList?: Record<string, any>[];
  filterRequestValues?: FilterRequestValues;
  sortingState?: ISortingState | IReportSortingState;
  sortingFieldId?: IContactsSortingFieldId;
  setSortAction?: Function;
  setSortValuesAction?: Function;
}

export const TableBase: FC<IProps> = ({
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
  setSelectedContacts,
  selectedContacts,
  isMyContacts,
  tableDataList = [],
  sortingState,
  sortingFieldId,
  setSortAction,
  setSortValuesAction
}) => {
  const history = useHistory();

  const dispatch = useDispatch();

  const { search: locationSearch } = useLocation();

  const scrollRef = useRef<HTMLTableElement>(null);

  const load = useSelector(getLoader);
  const currentUser = useSelector(getUser);
  const currentPage = useSelector(getCurrentPage);

  const [filteredBy, setFilteredBy] = useState<string[]>([]);

  const styles = useStyles({ otherHeight });

  const param = new URLSearchParams(locationSearch);

  const selectAllOnPage = Number(param.get('selectAllOnPage'));
  const contactsIDs = data.map(({ id: contactId }: ITableRow) => contactId);

  const checkedContacts = (param.get('selectedContacts') || '')
    ?.split(',')
    .filter(contact => contact)
    .map(contact => +contact);

  const areAllCheckedContactsFromCurrentPage = (item: number) =>
    contactsIDs.every(contactId =>
      [...checkedContacts, item].includes(contactId)
    );

  const isNC2myContacts =
    Object.keys(currentUser.roles).includes(NC2) && isMyContacts;

  const canEditContact = !(
    Object.keys(currentUser.roles).includes(NC1) ||
    Object.keys(currentUser.roles).includes(NC2)
  );

  const onSelectRow = (item: number) => (value: boolean) => {
    const checkedRowCasesConfig = {
      [createProperty(
        'firstCase',
        areAllCheckedContactsFromCurrentPage(item)
      )]: () => {
        param.delete('selectedContacts');
        param.set('selectAllOnPage', `${currentPage}`);
      },
      [createProperty('secondCase', !checkedContacts.length)]: () => {
        param.set('selectedContacts', `${item}`);
      },
      [createProperty('thirdCase', !!checkedContacts.length)]: () => {
        param.set('selectedContacts', `${checkedContacts.join(',')},${item}`);
      },
      default: () => {}
    };

    const uncheckedRowCasesConfig = {
      [createProperty(
        'firstCase',
        checkedContacts.length === 1 && checkedContacts.includes(item)
      )]: () => {
        param.delete('selectedContacts');
      },
      [createProperty('secondCase', checkedContacts.length > 1)]: () => {
        param.set(
          'selectedContacts',
          getStringifiedItemsWithoutChosenOne(item, checkedContacts)
        );
      },
      [createProperty('thirdCase', selectAllOnPage === currentPage)]: () => {
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

  const onSelectRows = () => {
    const uncheckedRowCasesConfig = {
      [createProperty(
        'firstCase',
        selectAllOnPage && !checkedContacts.length
      )]: () => {
        param.delete('selectAllOnPage');
      },
      [createProperty(
        'secondCase',
        selectAllOnPage && checkedContacts.length
      )]: () => {
        param.delete('selectAllOnPage');
        param.delete('selectedContacts');
      },
      [createProperty(
        'thirdCase',
        selectedContacts &&
          containsAllElems(checkedContacts, selectedContacts) &&
          containsAllElems(selectedContacts, checkedContacts)
      )]: () => {
        param.delete('selectedContacts');
      },
      default: () => {}
    };

    getObjectValueFunction(uncheckedRowCasesConfig);

    history.push({
      search: param.toString()
    });
  };

  const onDeleteSelected = (id?: number) => {
    if (onDeleteData) {
      if (id) {
        onDeleteData([id]);
        onSelectRow(id)(false);
        return;
      }
      selectedContacts && onDeleteData(selectedContacts);
      onSelectRows();
    }
  };

  const onFilteredBy = () => {
    return setFilteredBy(state => state.filter(id => !filteredBy.includes(id)));
  };

  const tableScrollUp = () =>
    scrollRef.current && scrollRef.current.scrollIntoView();

  const onChangePage = (_: ChangeEvent<unknown>, pageNum: number) => {
    dispatch(setPage(pageNum));
    tableScrollUp();
  };

  const tableConfig: ITableConfig = {
    ...config,
    column: {
      ...config.column,
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
      items?: { id: number }[],
      isConcatItems?: boolean
    ) => {
      setSelectedContacts &&
        dispatch(
          setSelectedContacts({
            data:
              isConcatItems && items
                ? [...tableDataList, ...items]
                : items || tableDataList
          })
        );
    };

    const selectedItems = checkedContacts.map((checkedContact: number) => ({
      id: checkedContact
    }));

    const resetSelectedContacts = () =>
      setSelectedContacts && dispatch(setSelectedContacts({}));

    if (selectAllOnPage) {
      if (selectAllOnPage === currentPage) {
        // eslint-disable-next-line no-unused-expressions
        checkedContacts.length
          ? handleSelectedContacts(selectedItems, true)
          : handleSelectedContacts();
      } else {
        // eslint-disable-next-line no-unused-expressions
        checkedContacts.length
          ? handleSelectedContacts(selectedItems, true)
          : resetSelectedContacts();
      }
    } else {
      // eslint-disable-next-line no-unused-expressions
      selectedItems
        ? handleSelectedContacts(selectedItems)
        : resetSelectedContacts();
    }
  }, [locationSearch]);

  return (
    <>
      <TableContainer
        component={Paper}
        classes={{ root: `${styles.customTable} ${styles.tableHeight}` }}
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
            currentPage={currentPage}
            setSelectedContacts={setSelectedContacts}
            selectedContacts={selectedContacts}
            isNC2myContacts={isNC2myContacts}
            canEditContact={canEditContact}
            param={param}
            selectAllOnPage={selectAllOnPage}
            checkedContacts={checkedContacts}
            contactsIDs={contactsIDs}
            sortingState={sortingState}
            sortingFieldId={sortingFieldId}
            setSortAction={setSortAction}
            setSortValuesAction={setSortValuesAction}
          />
          <TableBody
            classes={{
              root: `${styles.customBody} ${load && styles.tableBlur}`
            }}
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
                  canEditContact={canEditContact}
                />
              ))
            ) : (
              <div className={styles.noDataMessage}>No data to display</div>
            )}
            {load && <Loader />}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        classes={{ root: styles.pagination }}
        count={count}
        page={currentPage}
        onChange={onChangePage}
        data-testid='table_pagination'
      />
    </>
  );
};
