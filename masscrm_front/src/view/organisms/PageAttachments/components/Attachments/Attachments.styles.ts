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
  wrapperTableFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingTop: '30px'
  },
  spanInWrapperTableFooter: {
    paddingTop: '9px',
    paddingRight: '16px',
    color: '#78829D',
    fontFamily: FONT_FAMILY_PRIMARY,
    fontSize: '14px',
    lineHeight: '16px'
  },
  uploadButton: {
    backgroundColor: '#FEDA00',
    borderRadius: '50px',
    fontSize: '14px',
    lineHeight: '16px',
    marginRight: '24px',
    width: '140px',
    height: '32px',
    textTransform: 'none',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: '#FEDA00'
    }
  },
  firstColumn: {
    width: '30%',
    borderBottom: 'none',
    paddingLeft: '24px'
  },
  middleColumn: {
    width: '20%',
    borderBottom: 'none'
  },
  attachment: {
    position: 'relative',
    '&:focus': {
      outline: 'none'
    }
  }
}));
