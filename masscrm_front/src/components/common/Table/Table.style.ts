import {
  createStyles,
  makeStyles,
  withStyles,
  Theme
} from '@material-ui/core/styles';
import { TableCell } from '@material-ui/core/';

export const tableStyle = makeStyles(() =>
  createStyles({
    customTable: {
      position: 'relative',
      boxShadow: 'none',
      '& .MuiTableCell-root': {
        cursor: 'pointer',
        padding: '12px 24px',
        color: '#78829D',
        textTransform: 'capitalize',
        whiteSpace: 'nowrap'
      },
      '& .MuiTableCell-root:after': {
        cursor: 'pointer',
        padding: '12px 24px',
        color: '#78829D',
        textTransform: 'capitalize',
        whiteSpace: 'nowrap'
      },
      '& .smallTD': {
        width: '30px',
        padding: '12px 7px'
      },
      '& .MuiTableRow-root .smallTD:first-child': {
        paddingLeft: '24px'
      }
    },
    tableHeight: ({ otherHeight }: any) => ({
      height: `calc(100vh - ${otherHeight})`
    }),
    customBody: {
      '& .MuiTableCell-root ': {
        color: '#212121',
        fontWeight: '100'
      },
      '& .MuiTableRow-root:nth-child(odd)': {
        backgroundColor: '#F9F9FA'
      },
      '& .MuiTableCell-root.bold ': {
        fontWeight: 'bold'
      },
      '& .MuiTableCell-root.blueText ': {
        color: '#13639D'
      }
    },
    tableBlur: {
      filter: 'blur(10px)'
    },
    customCell: {
      display: 'flex',
      alignItems: 'center',
      '& .MuiSvgIcon-root': {
        padding: '0 3px'
      }
    },
    customIcon: {
      '& .MuiBox-root': {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingBottom: '5px'
      },
      '& .MuiBox-root-33': {
        float: 'right'
      }
    },
    customTooltip: {
      background: '#fff'
    },
    pagination: {
      '& .MuiPagination-ul': {
        display: 'flex',
        justifyContent: 'center',
        padding: '8px 0',
        width: '100%',
        background: '#fff',
        borderRadius: '0 0 8px 8px'
      },
      '& .MuiPaginationItem-page.Mui-selected': {
        color: '#000',
        fontWeight: 'bold',
        backgroundColor: '#fff'
      }
    },
    paginationNone: {
      '& .MuiPagination-ul': {
        display: 'none'
      }
    },
    resetButton: {
      background: 'transparent',
      padding: 0,
      width: '24px',
      height: '24px',
      border: 'none',
      outline: 'none'
    },
    customTableRow: {
      display: 'flex'
    },
    resetButtonNone: {
      display: 'none'
    },
    sortButton: {
      width: '24px',
      display: 'flex',
      height: '24px',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'transparent',
      padding: 0,
      border: 'none',
      outline: 'none'
    }
  })
);

export const tooltipStyle = makeStyles(() =>
  createStyles({
    tooltip: {
      color: '#000',
      fontSize: '12px',
      lineHeight: '16px',
      fontWeight: 300,
      backgroundColor: '#fff',
      maxWidth: '230px',
      padding: 10,
      boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.25)'
    }
  })
);

export const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      background: theme.palette.common.white
    }
  })
)(TableCell);
