import React, { FC, useCallback, ChangeEvent } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { parse } from 'date-fns';
import { FilterList } from '@material-ui/icons';
import { DateRange } from 'src/view/molecules';
import { MoreInformation } from 'src/view/organisms';
import { CommonButton, CommonInput } from 'src/view/atoms';
import { IActivityLog, ISearchParams, IChangePageArgs } from 'src/interfaces';
import { DD_MM_YYYY } from 'src/constants';
import { useStyles } from './ActivityLog.styles';

interface IProps {
  activityLog: IActivityLog;
  searchParams: ISearchParams;
  onChangeSearch: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleDateOfChange: (name: string, value: Date[]) => void;
  onPaginationChange: (
    event: ChangeEvent<unknown>,
    currentPage: number
  ) => void;
  changePageHandler: ({ page, query, from, to }: IChangePageArgs) => void;
}

export const ActivityLog: FC<IProps> = ({
  activityLog: {
    data = [],
    meta: { current_page = 1, total, per_page }
  },
  changePageHandler,
  onChangeSearch,
  handleDateOfChange,
  onPaginationChange,
  searchParams: { page, query, from, to }
}) => {
  const styles = useStyles();

  const count = Math.ceil(total / per_page);

  const onSubmit = useCallback(() => {
    changePageHandler({ page, query, from, to });
  }, [page, query, from, to]);

  const getFormattedDate = () => {
    if (from && to) {
      const dateFrom = parse(from, DD_MM_YYYY, new Date());
      const dateTo = parse(to, DD_MM_YYYY, new Date());

      return [dateFrom, dateTo];
    }
    return [];
  };

  return (
    <>
      <div className={styles.searchFieldWrapper}>
        <CommonInput
          name='search'
          className={styles.searchField}
          placeholder='Search'
          onChangeValue={onChangeSearch}
        />
        <CommonButton
          className={styles.searchSubmitButton}
          text='Search'
          type='submit'
          onClickHandler={onSubmit}
        />
      </div>
      <TableContainer component='div' className={styles.root}>
        <Table>
          <TableHead className={styles.tableHead}>
            <TableRow>
              <TableCell align='left' className={styles.sideCells}>
                Action
              </TableCell>
              <TableCell align='left' className={styles.middleCell}>
                User
              </TableCell>
              <TableCell align='left' className={styles.sideCellsLast}>
                <span className={styles.sideCellsLastText}>Date of Change</span>
                <MoreInformation
                  icon={FilterList}
                  popperInfo={
                    <DateRange
                      name='date_of_change'
                      code='date_of_change'
                      date={getFormattedDate()}
                      hasDataRangeFilter
                      onChange={handleDateOfChange}
                      placeholder='Date of change'
                    />
                  }
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={styles.tableBody}>
            {data?.map(({ id, user: { name, surname }, date, description }) => (
              <TableRow key={id}>
                <TableCell
                  align='left'
                  className={styles.sideCells}
                  component='th'
                  scope='row'
                >
                  {description}
                </TableCell>
                <TableCell align='left' className={styles.middleCell}>
                  {name} {surname}
                </TableCell>
                <TableCell align='left' className={styles.sideCells}>
                  {date}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          className={styles.pagination}
          count={count}
          onChange={onPaginationChange}
          page={current_page}
        />
      </TableContainer>
    </>
  );
};
