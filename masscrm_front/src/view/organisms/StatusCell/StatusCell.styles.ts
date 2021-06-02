import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  () => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      height: '45px'
    },
    text: {
      display: 'flex',
      alignItems: 'center',
      width: 80,
      marginRight: 20
    },
    statusWrapper: {
      display: 'flex',
      justifyContent: 'center',
      width: '50px'
    },
    doneIcon: {
      color: '#46C662'
    }
  }),
  { name: 'StatusCell' }
);
