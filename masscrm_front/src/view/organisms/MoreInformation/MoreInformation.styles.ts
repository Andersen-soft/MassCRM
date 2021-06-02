import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    popover: {
      marginTop: '10px',
      '& .MuiPaper-elevation8': {
        overflow: 'visible'
      }
    },
    notification: {
      maxWidth: '317px'
    },
    more: {
      outline: 'none'
    }
  })
);
