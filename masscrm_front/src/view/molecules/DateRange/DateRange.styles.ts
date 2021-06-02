import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    dateRange: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '40px',
      width: '230px',
      background: '#fff',
      border: '1px solid #e1e5ed',
      boxSizing: 'border-box',
      borderRadius: '4px',
      padding: '8px',
      color: '#dadada'
    },

    dateRangeIcon: {
      color: '#69738f'
    }
  })
);

export const fullWidthStyles = makeStyles(() => ({
  fullWidth: {
    width: '100%'
  }
}));
