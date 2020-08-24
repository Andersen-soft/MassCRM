import React, { FC, useCallback, useEffect, useMemo } from 'react';
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
  CustomCheckBox,
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
import { initialSortingState } from 'src/reducers/tableSorting.reducer';
import { SORTING_FIELD_ID, VISIBLE_RESET_FILTER } from 'src/utils/table';
import { getFilterSorting, getSortBy } from 'src/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { setSortValues, setSort } from 'src/actions';
import { ITableHeaderProps, ITableHeaderItem } from '../../interfaces';
import { tableStyle, tooltipStyle, StyledTableCell } from '../../Table.style';
import { ISortingObject } from '../../../../../interfaces';

export const TableHeader: FC<ITableHeaderProps> = ({
  sorting,
  changeInput,
  resetFilter,
  autocompleteValues,
  config,
  changeFilter,
  filtersValues,
  clearAutocompleteList
}) => {
  const dispatch = useDispatch();
  const sortingState = useSelector(getFilterSorting);
  const sortBy = useSelector(getSortBy);

  const style = tableStyle();

  const styleTooltip = tooltipStyle();

  const isCheckedAll =
    config.body.selectedRows && config.body.selectedRows?.length > 0;

  const onDeleteHandler = () =>
    config.column.onDeleteSelected && config.column.onDeleteSelected();

  const canBeDeleted = useMemo(() => config.column.hasDelete, []);

  const canBeSelected = useMemo(() => config.column.hasSelectAll, []);

  const hasInfo = useMemo(() => config.column.hasInfo, []);

  const hasControl = useMemo(() => config.column.hasControl, []);

  const canEdit = useMemo(
    () =>
      config.column.hasEdit && (
        <StyledTableCell
          component='th'
          scope='row'
          key='edit'
          className='smallTD'
        />
      ),
    []
  );

  const onClickFilter = useCallback(
    name => () =>
      config.column?.onFilteredBy && config.column?.onFilteredBy(name),
    []
  );

  const onSelectHandler = (value: boolean): void =>
    config.column.onSelectAll && config.column.onSelectAll(value);

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

  useEffect(() => {
    if (sortBy && sorting) {
      sorting(sortBy);
    }
  }, [sortingState]);

  useEffect(() => {
    dispatch(setSortValues(initialSortingState));
  }, []);

  const onChangeFilter = (filterParams: {
    name: string;
    item: number[] | string | string[] | (string | string[])[] | Date[] | null;
    isCheckbox?: boolean;
  }) => {
    const { isCheckbox, ...restProps } = filterParams;
    VISIBLE_RESET_FILTER[filterParams.name] = true;
    return changeFilter
      ? changeFilter(isCheckbox ? filterParams : restProps)
      : [];
  };

  const onResetFilter = (name: string) => () => {
    VISIBLE_RESET_FILTER[name] = false;
    resetFilter && resetFilter(name);
  };

  return (
    <TableHead>
      <TableRow>
        {canBeSelected && (
          <StyledTableCell
            component='th'
            scope='row'
            key='select'
            className='smallTD'
          >
            <CustomCheckBox value={isCheckedAll} onChange={onSelectHandler} />
          </StyledTableCell>
        )}
        {canBeDeleted && (
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
        {config.rows.map(
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
                      VISIBLE_RESET_FILTER[name]
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
