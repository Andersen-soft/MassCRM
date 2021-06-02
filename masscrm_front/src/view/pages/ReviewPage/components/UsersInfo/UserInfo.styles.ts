import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {
      maxHeight: '640px',
      overflow: 'auto',
      padding: '16px',
      width: '79%',
      background: '#F9F9FA',
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap'
    }
  })
);
