import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  () => ({
    root: {
      minHeight: 630
    },
    content: {
      padding: 0,
      overflow: 'hidden',

      '&:first-child': {
        padding: 0
      }
    },
    tabs: {
      padding: '0 24px'
    },
    rab: {
      marginRight: 0,
      marginLeft: 24
    },
    tabContent: {
      padding: 24,
      maxWidth: 'calc(826px - 48px)'
    },
    actions: {
      padding: 24,
      justifyContent: 'center'
    }
  }),
  { name: 'ImportModal' }
);
