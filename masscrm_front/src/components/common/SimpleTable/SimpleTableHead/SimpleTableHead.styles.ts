import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme: Theme) => ({
    cell: {
      background: theme.palette.common.white
    }
  }),
  { name: 'SimpleTableHead' }
);
