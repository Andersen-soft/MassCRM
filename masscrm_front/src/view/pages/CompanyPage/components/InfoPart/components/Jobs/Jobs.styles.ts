import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {
      display: 'flex',
      flexDirection: 'column'
    },
    tabWrapper: {
      display: 'flex',
      flexDirection: 'column',
      paddingBottom: '24px'
    },

    wrappersJobs: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gridGap: '10px',
      height: '210px',
      overflow: 'auto',
      marginBottom: '16px',
      '&::after': {
        gridColumn: 'span 3',
        height: '1px',
        content: '""'
      }
    },
    addJob: {
      margin: '0 0 0 auto'
    }
  })
);
