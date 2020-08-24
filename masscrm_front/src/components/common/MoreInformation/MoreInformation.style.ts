import { createStyles, makeStyles } from '@material-ui/core';

export const customPopover = makeStyles(() =>
  createStyles({
    popover: {
      marginTop: '10px',
      '& .MuiPaper-elevation8': {
        overflow: 'visible'
      }
    }
  })
);
