import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  () => ({
    message: {
      color: '#212121',
      fontSize: 16,
      fontWeight: 300,
      lineHeight: 2,
      textAlign: 'center'
    },
    content: {
      padding: '56px 85px',

      '&:first-child': {
        padding: 56
      }
    }
  }),
  { name: 'DownloadReportModal' }
);
