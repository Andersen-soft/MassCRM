import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    tableSearch: {
      display: 'flex',
      justifyContent: ' space-between'
    },
    tableSearchItem: {
      display: 'flex',
      justifyContent: 'space - between',
      alignItems: 'center'
    },
    tableSearchTitle: {
      fontSize: '1.3em',
      marginRight: '24px'
    },
    tableSearchInput: {
      marginRight: '24px',
      width: '230px'
    }
  })
);
