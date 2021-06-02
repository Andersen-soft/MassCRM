import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    countSelect: {
      marginLeft: '40px',
      marginRight: '25px',
      height: '40px',
      width: '112px',
      outline: 'none',
      '& .MuiSelect-root': {
        backgroundColor: '#fff'
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#e1e5ed'
      }
    }
  })
);
