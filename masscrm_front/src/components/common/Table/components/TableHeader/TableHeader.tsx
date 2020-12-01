import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Tooltip, TableHead, TableRow, Box } from '@material-ui/core';
import {
  Close,
  FilterList,
  Delete,
  Error,
  InfoOutlined
} from '@material-ui/icons';
import {
  CommonIcon,
  DateRange,
  MoreInformation,
  CheckboxFilter,
  InputFilter,
  RadioFilter,
  NumericRangeFilter
} from 'src/components/common';
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';
import ArrowDropUpRoundedIcon from '@material-ui/icons/ArrowDropUpRounded';
import { TooltipMessage } from 'src/data/moc.filter';
import {
  SORTING_FIELD_ID,
  VISIBLE_RESET_FILTER,
  getFilteringFields
} from 'src/utils/table';
import {
  getFilterSorting,
  getSearchUser,
  getUserFullName
} from 'src/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { setSortValues, setSort } from 'src/actions';
import { ISortingObject } from 'src/interfaces';
import { tooltipStyle } from 'src/styles/ToolTip.style';
import { ITableHeaderProps, ITableHeaderItem } from '../../interfaces';
import { headerStyle, StyledTableCell } from './TableHeader.style';
import { ChangeResponsible } from './ChangeResponsible';
import { SelectData } from './SelectData';

export const TableHeader: FC<ITableHeaderProps> = ({
  changeInput,
  resetFilter,
  autocompleteValues,
  config,
  changeFilter,
  filtersValues,
  clearAutocompleteList,
  isFullTable,
  data
}) => {
  const dispatch = useDispatch();
  const sortingState = useSelector(getFilterSorting);
  const searchUserList = useSelector(getSearchUser) || [];
  const changeResponsibleAutocomplete = useSelector(getUserFullName) || [];
  const style = headerStyle();
  const [visibleReset, setVisibleReset] = useState<{ [key: string]: boolean }>(
    VISIBLE_RESET_FILTER
  );

  const styleTooltip = tooltipStyle();

  const {
    column: {
      hasCopy,
      hasControl,
      hasDelete,
      hasEdit,
      hasInfo,
      hasSelectAll,
      onSelectAll
    },
    body: { selectedRows },
    rows
  } = config;

  const isCheckedAll = selectedRows && selectedRows?.length > 0;

  const onDeleteHandler = () =>
    config.column.onDeleteSelected && config.column.onDeleteSelected();

  const onClickFilter = useCallback(
    name => () =>
      config.column?.onFilteredBy && config.column?.onFilteredBy(name),
    []
  );

  const handleClickSorting = (name: string) => () => {
    const value: ISortingObject = {
      field_name: SORTING_FIELD_ID[name] || '',
      type_sort: sortingState[name]?.type_sort === 'DESC' ? 'ASC' : 'DESC'
    };
    dispatch(
      setSortValues({
        [name]: value
      })
    );
    dispatch(setSort(value));
  };

  const mockDate = useCallback(() => new Date().toISOString(), []);

  const onChangeFilter = (filterParams: {
    name: string;
    item: number[] | string | string[] | (string | string[])[] | Date[] | null;
    isCheckbox?: boolean;
  }) => {
    const { isCheckbox, ...restProps } = filterParams;
    setVisibleReset(state => ({
      ...state,
      [filterParams.name]: true
    }));
    return changeFilter
      ? changeFilter(isCheckbox ? filterParams : restProps)
      : [];
  };

  const onResetFilter = (name: string) => () => {
    setVisibleReset(state => ({
      ...state,
      [name]: false
    }));
    resetFilter && resetFilter(name);
  };

  useEffect(() => {
    setVisibleReset(state => ({
      ...state,
      ...getFilteringFields(filtersValues)
    }));
  }, []);

  const canEdit = useMemo(
    () =>
      hasEdit && (
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
    <TableHead>
      <TableRow>
        {hasSelectAll && onSelectAll && (
          <StyledTableCell
            component='th'
            scope='row'
            key='select'
            className='smallTD'
          >
            <SelectData
              data={data}
              isCheckedAll={isCheckedAll || false}
              onSelectAll={onSelectAll}
            />
          </StyledTableCell>
        )}
        {hasDelete && (
          <StyledTableCell
            component='th'
            scope='row'
            key='delete'
            className='smallTD'
          >
            <CommonIcon IconComponent={Delete} onClick={onDeleteHandler} />
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
            hasFilter,
            hasInputFilter,
            hasCheckboxFilter,
            hasRadioFilter,
            hasMultiSelectFilter,
            hasDataRangeFilter,
            hasSorting,
            hasNumericRangeFilter
          }: ITableHeaderItem) => (
            <StyledTableCell
              component='th'
              scope='row'
              key={name}
              onClick={onClickFilter(name)}
            >
              <Box className={style.customCell}>
                {name}
                {hasFilter && (hasInputFilter || hasMultiSelectFilter) && (
                  <MoreInformation
                    icon={FilterList}
                    clearAutocompleteList={clearAutocompleteList}
                    popperInfo={
                      <InputFilter
                        multiSelect={!!hasMultiSelectFilter}
                        name={name}
                        changeInput={changeInput}
                        value={filtersValues[name]}
                        placeholder={name}
                        items={
                          autocompleteValues ? autocompleteValues(name) : []
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
                        changeFilter={onChangeFilter}
                        items={
                          autocompleteValues ? autocompleteValues(name) : []
                        }
                        itemsChecked={filtersValues[name]}
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
                        name={name}
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
                        changeFilter={onChangeFilter}
                        items={
                          autocompleteValues ? autocompleteValues(name) : []
                        }
                      />
                    }
                  />
                )}
                {hasSorting && (
                  <button
                    type='button'
                    className={style.sortButton}
                    onClick={handleClickSorting(name)}
                  >
                    <CommonIcon
                      IconComponent={
                        sortingState[name]?.type_sort === 'DESC'
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
                      visibleReset[name]
                        ? style.resetButton
                        : style.resetButtonNone
                    }
                    onClick={onResetFilter(name)}
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
              classes={styleTooltip}
              title={TooltipMessage}
              placement='top-end'
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
