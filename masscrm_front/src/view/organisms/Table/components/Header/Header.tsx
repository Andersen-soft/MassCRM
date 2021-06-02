import React, { FC, useCallback, useMemo } from 'react';
import {
  Tooltip,
  TableHead,
  TableRow,
  Box,
  TableCell
} from '@material-ui/core';
import { CommonIcon } from 'src/view/atoms';
import { TableInputFilter, MoreInformation } from 'src/view/organisms';
import {
  ArrowDropDownRounded as ArrowDropDownRoundedIcon,
  ArrowDropUpRounded as ArrowDropUpRoundedIcon,
  Close,
  FilterList,
  Delete,
  Error,
  InfoOutlined
} from '@material-ui/icons';
import { tooltipMessage, TOP_END } from 'src/constants';
import { getSearchUser, getUserFullName } from 'src/store/slices';
import { useDispatch, useSelector } from 'react-redux';
import {
  ISortingObject,
  ITableConfig,
  ITableRow,
  ITableHeaderItem,
  IBlacklistFiltersState,
  IContactFiltersState,
  IFilterValuesUsers,
  IExportInputFilterValues,
  IContactsSortingFieldId,
  IReportSortingState,
  ISortingState
} from 'src/interfaces';
import { tooltipStyles } from 'src/styles';
import { DateRange } from 'src/view/molecules';
import {
  ChangeResponsible,
  SelectData,
  CheckboxFilter,
  RadioFilter,
  NumericRangeFilter
} from './components';
import { tableCellStyles, useStyles } from './Header.styles';

export interface IFilterValue {
  code: string;
  name: string;
  item: string | string[] | null | Date[];
}

interface IProps {
  config: ITableConfig;
  currentPage: number;
  data: ITableRow[];
  selectAllOnPage: number;
  param: URLSearchParams;
  checkedContacts: number[];
  contactsIDs: number[];
  resetFilter?: (name: string) => void;
  autocompleteValues?: (value: string) => string[];
  changeFilter?: Function;
  changeInput?: (value: string, name: string) => void;
  filtersValues:
    | IFilterValuesUsers
    | IContactFiltersState
    | IBlacklistFiltersState
    | IExportInputFilterValues;
  inputFilter?: Function;
  clearAutocompleteList?: () => void;
  isFullTable?: boolean;
  setSelectedContacts?: Function;
  isNC2myContacts?: boolean;
  canEditContact?: boolean;
  selectedContacts?: number[];
  sortingState?: ISortingState | IReportSortingState;
  sortingFieldId?: IContactsSortingFieldId;
  setSortAction?: Function;
  setSortValuesAction?: Function;
}

const StyledTableCell = tableCellStyles(TableCell);

export const TableHeader: FC<IProps> = ({
  changeInput,
  resetFilter,
  autocompleteValues,
  config,
  changeFilter,
  filtersValues,
  clearAutocompleteList,
  isFullTable,
  data,
  currentPage,
  setSelectedContacts,
  selectedContacts = [],
  isNC2myContacts,
  canEditContact,
  param,
  selectAllOnPage,
  checkedContacts,
  contactsIDs,
  sortingState,
  sortingFieldId,
  setSortAction,
  setSortValuesAction
}) => {
  const dispatch = useDispatch();

  const searchUserList = useSelector(getSearchUser) || [];
  const changeResponsibleAutocomplete = useSelector(getUserFullName) || [];

  const style = useStyles();
  const tooltipClasses = tooltipStyles();

  const {
    column: { hasCopy, hasControl, hasDelete, hasEdit, hasInfo, hasSelectAll },
    body: { selectedRows },
    rows
  } = config;

  const isCheckedAll =
    selectedRows &&
    selectedRows.length &&
    data
      ?.map(({ id }: ITableRow) => id)
      .some(item => selectedRows.includes(item));

  const onDeleteHandler = () =>
    config.column.onDeleteSelected && config.column.onDeleteSelected();

  const onClickFilter = useCallback(
    code => () =>
      config.column?.onFilteredBy && config.column?.onFilteredBy(code),
    []
  );

  const handleClickSorting = (code: string) => () => {
    const value: ISortingObject = {
      field_name: sortingFieldId?.[code] || '',
      type_sort: sortingState?.[code]?.type_sort === 'DESC' ? 'ASC' : 'DESC'
    };
    setSortValuesAction &&
      dispatch(
        setSortValuesAction({
          [code]: value
        })
      );
    setSortAction && dispatch(setSortAction(value));
  };

  const mockDate = useCallback(() => new Date().toISOString(), []);

  const onChangeFilter = (filterParams: {
    code: string;
    item: number[] | string | string[] | (string | string[])[] | Date[] | null;
    isCheckbox?: boolean;
  }) => {
    const { isCheckbox, ...restProps } = filterParams;
    return changeFilter
      ? changeFilter(isCheckbox ? filterParams : restProps)
      : [];
  };

  const onResetFilter = (code: string) => () => {
    resetFilter && resetFilter(code);
  };

  const canEdit = useMemo(
    () =>
      hasEdit &&
      !isNC2myContacts &&
      canEditContact && (
        <StyledTableCell
          component='th'
          scope='row'
          key='edit'
          className='smallTD'
        >
          <ChangeResponsible
            config={config}
            searchUserList={searchUserList}
            autocomplete={changeResponsibleAutocomplete}
            isFullTable={isFullTable}
          />
        </StyledTableCell>
      ),
    [changeResponsibleAutocomplete, config]
  );

  return (
    <TableHead data-testid='table_header'>
      <TableRow>
        {hasSelectAll && (
          <StyledTableCell
            component='th'
            scope='row'
            key='select'
            className='smallTD'
          >
            <Tooltip
              id='change-password-tooltip'
              classes={tooltipClasses}
              title={`selected: ${selectedContacts.length}`}
              placement={TOP_END}
            >
              <div>
                <SelectData
                  data={data}
                  isCheckedAll={isCheckedAll || false}
                  currentPage={currentPage}
                  setSelectedContacts={setSelectedContacts}
                  param={param}
                  selectAllOnPage={selectAllOnPage}
                  checkedContacts={checkedContacts}
                  contactsIDs={contactsIDs}
                />
              </div>
            </Tooltip>
          </StyledTableCell>
        )}
        {hasDelete && !isNC2myContacts && (
          <StyledTableCell
            component='th'
            scope='row'
            key='delete'
            className='smallTD add-border'
          >
            <CommonIcon
              IconComponent={Delete}
              onClick={onDeleteHandler}
              className='move-icon'
            />
          </StyledTableCell>
        )}
        {canEdit}
        {hasCopy && (
          <StyledTableCell
            component='th'
            scope='row'
            key='copy'
            className='smallTD'
          />
        )}
        {rows.map(
          ({
            name,
            code,
            hasFilter,
            hasInputFilter,
            hasCheckboxFilter,
            hasRadioFilter,
            hasMultiSelectFilter,
            hasDataRangeFilter,
            hasSorting,
            hasNumericRangeFilter,
            IconComponent
          }: ITableHeaderItem) => (
            <StyledTableCell
              component='th'
              scope='row'
              key={code}
              onClick={onClickFilter(code)}
              data-testid={`table_${code
                .split(' ')
                .join('')
                .toLowerCase()}_row`}
            >
              <Box className={style.customCell}>
                {!!IconComponent && (
                  <div className={style.iconWrapper}>
                    <CommonIcon IconComponent={IconComponent} />
                  </div>
                )}
                {name}
                {hasFilter && (hasInputFilter || hasMultiSelectFilter) && (
                  <MoreInformation
                    icon={FilterList}
                    clearAutocompleteList={clearAutocompleteList}
                    popperInfo={
                      <TableInputFilter
                        multiSelect={!!hasMultiSelectFilter}
                        name={name}
                        code={code}
                        changeInput={changeInput}
                        value={filtersValues[code]}
                        placeholder={name}
                        items={
                          autocompleteValues ? autocompleteValues(code) : []
                        }
                        changeFilter={onChangeFilter}
                      />
                    }
                  />
                )}
                {hasFilter && hasCheckboxFilter && (
                  <MoreInformation
                    icon={FilterList}
                    popperInfo={
                      <CheckboxFilter
                        name={name}
                        code={code}
                        changeFilter={onChangeFilter}
                        items={
                          autocompleteValues ? autocompleteValues(code) : []
                        }
                        itemsChecked={filtersValues[code]}
                      />
                    }
                  />
                )}
                {hasFilter && hasDataRangeFilter && (
                  <MoreInformation
                    icon={FilterList}
                    popperInfo={
                      <DateRange
                        name={name}
                        code={code}
                        hasDataRangeFilter={hasDataRangeFilter}
                        changeFilter={onChangeFilter}
                        onChange={mockDate}
                        placeholder={name}
                      />
                    }
                  />
                )}
                {hasFilter && hasNumericRangeFilter && (
                  <MoreInformation
                    icon={FilterList}
                    popperInfo={
                      <NumericRangeFilter
                        code={code}
                        changeFilter={onChangeFilter}
                      />
                    }
                  />
                )}
                {hasFilter && hasRadioFilter && (
                  <MoreInformation
                    icon={FilterList}
                    popperInfo={
                      <RadioFilter
                        name={name}
                        code={code}
                        changeFilter={onChangeFilter}
                        items={
                          autocompleteValues ? autocompleteValues(code) : []
                        }
                      />
                    }
                  />
                )}
                {hasSorting && (
                  <button
                    type='button'
                    className={style.sortButton}
                    onClick={handleClickSorting(code)}
                  >
                    <CommonIcon
                      IconComponent={
                        sortingState?.[code]?.type_sort === 'DESC'
                          ? ArrowDropDownRoundedIcon
                          : ArrowDropUpRoundedIcon
                      }
                      fontSize='large'
                    />
                  </button>
                )}
                {hasFilter && (
                  <button
                    type='button'
                    className={
                      filtersValues[code]?.length
                        ? style.resetButton
                        : style.resetButtonNone
                    }
                    onClick={onResetFilter(code)}
                  >
                    <CommonIcon IconComponent={Close} fontSize='small' />
                  </button>
                )}
              </Box>
            </StyledTableCell>
          )
        )}
        {hasInfo && (
          <StyledTableCell component='th' scope='row' key='info'>
            <CommonIcon IconComponent={Error} />
          </StyledTableCell>
        )}
        {hasControl && (
          <StyledTableCell
            className={style.customIcon}
            component='th'
            scope='row'
            key='info'
          >
            <Tooltip
              id='change-password-tooltip'
              classes={tooltipClasses}
              title={tooltipMessage}
              placement={TOP_END}
            >
              <div>
                <CommonIcon IconComponent={InfoOutlined} />
              </div>
            </Tooltip>
          </StyledTableCell>
        )}
      </TableRow>
    </TableHead>
  );
};
