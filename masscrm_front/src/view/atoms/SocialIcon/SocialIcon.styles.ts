import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    icon: {
      width: '24px',
      height: '24px'
    },

    activeIcon: {
      cursor: 'pointer',
      '&:hover': {
        opacity: '0.8'
      }
    }
  })
);
