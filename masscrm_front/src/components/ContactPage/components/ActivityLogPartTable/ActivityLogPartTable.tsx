import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { useLocation } from 'react-router-dom';
import { IStoreState } from '../../../../interfaces';
import { getOneContactActivityLog } from '../../../../actions';
import { SearchInput } from '../../../common/SearchInput';
import { IOneContactActivityLogItem } from '../../../../interfaces/IOneContactData';

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
  middleCell: {
    width: '30%',
    borderBottom: 'none'
  },
  searchField: {
    width: '230px',
    float: 'right',
    marginRight: '24px',
    marginTop: '-24px'
  },
  pagination: {
    borderBottom: 'none',
    width: '800px',
    margin: 'auto',
    '& .MuiPagination-ul': {
      justifyContent: 'center'
    }
  }
});

export const ActivityLogPartTable = () => {
  const dispatch = useDispatch();
  const oneContactActivityLogArray = useSelector(
    (state: IStoreState) => state.oneContactActivityLog.data
  );

  const classes = useStyles();
  const onChangeHandler = () => {};
  const countOfPage = Math.ceil(oneContactActivityLogArray.length / 5);
  const [currentPageRows, setCurrentPageRows] = useState<
    Array<IOneContactActivityLogItem>
  >(oneContactActivityLogArray.slice(0, 5));

  const onPaginationChange = (event: ChangeEvent<unknown>, page: number) => {
    setCurrentPageRows(
      oneContactActivityLogArray.slice((page - 1) * 5, page * 5)
    );
  };

  const location = useLocation();
  const contactId = Number(new URLSearchParams(location.search).get('id'));

  useEffect(() => {
    dispatch(getOneContactActivityLog(contactId));
    setCurrentPageRows(oneContactActivityLogArray.slice(0, 5));
  }, []);

  return (
    <div>
      <SearchInput
        className={classes.searchField}
        placeholder='Search'
        items={['name', 'action']}
        onChange={onChangeHandler}
      />
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
              <TableCell align='left' className={classes.sideCells}>
                Date of Change
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.tableBody}>
            {currentPageRows.map((row, index) => (
              <TableRow key={index}>
                <TableCell
                  align='left'
                  className={classes.sideCells}
                  component='th'
                  scope='row'
                >
                  {row.description}
                </TableCell>
                <TableCell align='left' className={classes.middleCell}>
                  {row.user.name} {row.user.surname}
                </TableCell>
                <TableCell align='left' className={classes.sideCells}>
                  {row.date}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          className={classes.pagination}
          count={countOfPage}
          onChange={onPaginationChange}
        />
      </TableContainer>
    </div>
  );
};
