import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  () => ({
    root: {
      height: 1,
      minHeight: 1,
      backgroundColor: '#E5E9F0',
      width: '100%'
    }
  }),
  { name: 'HorizontalDivider' }
);
