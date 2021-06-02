import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  () => ({
    tabs: {
      width: '285px',
      padding: '0 16px',
      fontSize: '16px'
    },
    '& .Tabs-contentContainer-52': {
      padding: 0
    },
    tabContent: {
      padding: '24px 0'
    }
  }),
  { name: 'Notification' }
);
