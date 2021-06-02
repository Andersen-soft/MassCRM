import { makeStyles } from '@material-ui/core';
import { FONT_FAMILY_PRIMARY } from 'src/constants';

export const useStyles = makeStyles(() => ({
  root: {
    fontFamily: FONT_FAMILY_PRIMARY,
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
}));
