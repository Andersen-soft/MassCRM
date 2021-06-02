import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  () => ({
    message: {
      color: '#212121',
      fontSize: 20
    },
    content: {
      padding: 56,
      '&:first-child': {
        padding: 56
      }
    }
  }),
  { name: 'MessageModal' }
);
