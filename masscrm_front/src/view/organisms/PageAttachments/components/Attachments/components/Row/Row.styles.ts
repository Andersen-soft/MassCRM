import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    firstColumn: {
      width: '30%',
      borderBottom: 'none',
      paddingLeft: '24px'
    },
    link: {
      color: '#13639D',
      textDecoration: 'none'
    },
    middleColumn: {
      width: '20%',
      borderBottom: 'none'
    },
    forthFifthColumn: {
      width: '1%',
      borderBottom: 'none'
    }
  })
);
