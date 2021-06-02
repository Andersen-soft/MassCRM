import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  () => ({
    root: {
      display: 'flex',
      alignItems: 'center'
    },
    label: {
      color: '#939BB2',
      marginRight: 8
    }
  }),
  { name: 'FieldLabel' }
);
