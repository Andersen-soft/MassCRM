import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  theme => ({
    root: {
      cursor: 'pointer',
      fill: '#69738F',
      position: 'absolute',
      right: theme.spacing(2),
      top: theme.spacing(2)
    }
  }),
  { name: 'DialogCloseIcon' }
);
