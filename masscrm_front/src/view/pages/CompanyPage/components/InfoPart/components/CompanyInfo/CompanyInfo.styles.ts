import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    column: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: '67%'
    },
    columnSmall: {
      width: '33%'
    },
    icon: {
      width: '16px',
      height: '16px'
    },
    spanLeft: {
      fontSize: '14px',
      color: '#939BB2',
      marginRight: '10px'
    },
    spanRight: {
      wordBreak: 'break-all',
      textAlign: 'right'
    },
    logo: {
      width: '16px',
      height: '16px'
    },
    list: {
      padding: '10px 20px'
    }
  })
);
