import { createStyles, makeStyles } from '@material-ui/core';

export const tooltipStyles = makeStyles(() =>
  createStyles({
    tooltip: {
      color: '#000',
      fontSize: '12px',
      lineHeight: '16px',
      fontWeight: 300,
      backgroundColor: '#fff',
      maxWidth: '230px',
      padding: 10,
      boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.25)'
    }
  })
);
