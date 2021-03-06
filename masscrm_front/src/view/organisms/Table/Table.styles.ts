import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    customTable: {
      position: 'relative',
      boxShadow: 'none',
      '& .MuiTableCell-head': {
        cursor: 'pointer',
        padding: '10px',
        color: '#78829D',
        textTransform: 'capitalize',
        whiteSpace: 'nowrap'
      },
      '& .MuiTableCell-head:after': {
        cursor: 'pointer',
        padding: '12px 24px',
        color: '#78829D',
        textTransform: 'capitalize',
        whiteSpace: 'nowrap'
      },
      '& .smallTD': {
        width: '30px'
      },
      '& .add-border': {
        display: 'block',
        paddingBottom: '20px',
        borderBottom: '1px solid rgba(224, 224, 224, 1)'
      },
      '& .move-icon': {
        position: 'relative',
        top: '7px'
      },
      '& .MuiTableRow-root .MuiTableCell-root:first-child': {
        paddingLeft: '24px'
      }
    },
    tableHeight: ({ otherHeight: height }: any) => ({
      height: `calc(100vh - ${height})`
    }),
    customBody: {
      '& .MuiTableCell-root ': {
        color: '#212121',
        fontWeight: '100',
        padding: '10px',
        '& :hover': {
          textDecoration: 'underline dashed #939BB2'
        }
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
    noDataMessage: {
      position: 'absolute',
      top: '50%',
      width: '100%',
      textAlign: 'center',
      color: '#939bb2',
      fontSize: '1.29em'
    }
  })
);
