import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    countSelect: {
      marginLeft: '40px',
      marginRight: '25px',
      height: '40px',
      width: '106px',
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
