import { createStyles, makeStyles } from '@material-ui/core';

export const dialogStyle = makeStyles(() =>
  createStyles({
    dialog: {
      '& .MuiDialog-paperWidthSm': {
        maxWidth: '1000px'
      }
    }
  })
);
