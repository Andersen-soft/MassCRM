import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {
      width: '19%',
      padding: '16px 24px',
      background: '#fff'
    },
    form: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%'
    },
    formFilter: {
      marginBottom: '24px',
      alignSelf: 'stretch'
    },
    formFilters: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'column',
      alignSelf: 'stretch'
    },
    formControls: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignSelf: 'stretch'
    }
  })
);
