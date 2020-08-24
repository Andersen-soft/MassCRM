import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  () => ({
    root: {
      boxShadow: 'none',
      '& .MuiTableCell-root': {
        cursor: 'pointer',
        padding: '6px 24px',
        color: '#78829D',
        textTransform: 'capitalize',
        whiteSpace: 'nowrap',
        fontSize: 12
      }
    },
    tableBody: {
      '& .MuiTableCell-root ': {
        color: '#212121',
        fontWeight: '100',
        fontSize: 14
      },
      '& .MuiTableRow-root:nth-child(odd)': {
        backgroundColor: '#F9F9FA'
      }
    }
  }),
  { name: 'SimpleTable' }
);
