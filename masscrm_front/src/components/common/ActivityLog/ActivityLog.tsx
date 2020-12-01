import React, { FC, useCallback } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Pagination } from '@material-ui/lab';
import { SearchInput } from 'src/components/common/SearchInput';
import { FilterList } from '@material-ui/icons';
import { parse } from 'date-fns';
import { CommonButton } from '../CommonButton';
import { DateRange } from '../DateRangePicker';
import { MoreInformation } from '../MoreInformation';
import { IActivityLogProps } from '../../ContactPage/components/ContactActivityLog/interfaces/IContactActivivtyLog';

const useStyles = makeStyles({
  root: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontSize: '14px',
    lineHeight: '16px',
    '& .MuiTablePagination-root': {
      display: 'flex',
      justifyContent: 'center'
    }
  },
  tableHead: {
    '& .MuiTableRow-root:nth-child(odd)': {
      color: '#78829D'
    },
    '& .MuiTableCell-root': {
      color: '#78829D'
    }
  },
  tableBody: {
    '& .MuiTableRow-root:nth-child(odd)': {
      backgroundColor: '#F9F9FA'
    }
  },
  sideCells: {
    width: '30%',
    borderBottom: 'none',
    paddingLeft: '24px'
  },
  sideCellsLast: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
    borderBottom: 'none',
    paddingLeft: '24px'
  },
  sideCellsLastText: {
    marginRight: 10
  },
  middleCell: {
    width: '30%',
    borderBottom: 'none'
  },
  searchFieldWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    float: 'right',
    marginRight: '24px',
    marginTop: '-10px'
  },
  searchField: {
    width: 230
  },
  searchSubmitButton: {
    width: 140
  },
  pagination: {
    margin: 'auto',
    paddingTop: '10px',
    '& .MuiPagination-ul': {
      justifyContent: 'center'
    }
  }
});

export const ActivityLog: FC<IActivityLogProps> = ({
  activityLog: {
    data = [],
    meta: { current_page = 1, total, per_page }
  },
  changePageHandler,
  onChangeSearch,
  handleDateOfChange,
  onPaginationChange,
  searchParams
}) => {
  const classes = useStyles();
  const { page, query, from, to } = searchParams;

  const count = Math.ceil(total / per_page);

  const onSubmit = useCallback(() => {
    changePageHandler({ page, query, from, to });
  }, [page, query, from, to]);

  const getFormattedDate = () => {
    if (from && to) {
      const dateFrom = parse(from, 'dd-MM-yyyy', new Date());
      const dateTo = parse(to, 'dd-MM-yyyy', new Date());
      return [dateFrom, dateTo];
    }
    return [];
  };

  return (
    <>
      <div className={classes.searchFieldWrapper}>
        <SearchInput
          className={classes.searchField}
          placeholder='Search'
          items={['name', 'action']}
          onChange={onChangeSearch}
        />
        <CommonButton
          className={classes.searchSubmitButton}
          text='Search'
          type='submit'
          onClickHandler={onSubmit}
        />
      </div>
      <TableContainer component='div' className={classes.root}>
        <Table>
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell align='left' className={classes.sideCells}>
                Action
              </TableCell>
              <TableCell align='left' className={classes.middleCell}>
                User
              </TableCell>
              <TableCell align='left' className={classes.sideCellsLast}>
                <span className={classes.sideCellsLastText}>
                  Date of Change
                </span>
                <MoreInformation
                  icon={FilterList}
                  popperInfo={
                    <DateRange
                      name='date_of_change'
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
          <TableBody className={classes.tableBody}>
            {data?.map(({ id, user: { name, surname }, date, description }) => (
              <TableRow key={id}>
                <TableCell
                  align='left'
                  className={classes.sideCells}
                  component='th'
                  scope='row'
                >
                  {description}
                </TableCell>
                <TableCell align='left' className={classes.middleCell}>
                  {name} {surname}
                </TableCell>
                <TableCell align='left' className={classes.sideCells}>
                  {date}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          className={classes.pagination}
          count={count}
          onChange={onPaginationChange}
          page={current_page}
        />
      </TableContainer>
    </>
  );
};
