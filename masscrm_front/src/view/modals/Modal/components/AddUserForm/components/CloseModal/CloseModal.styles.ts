import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    dialog: {
      '& .MuiDialog-paperWidthSm': {
        maxWidth: '1000px'
      }
    }
  })
);
