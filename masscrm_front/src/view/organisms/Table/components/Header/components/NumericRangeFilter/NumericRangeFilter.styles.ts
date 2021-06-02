import { withStyles } from '@material-ui/core';

export const useStyles = withStyles({
  root: {
    color: '#FEDA00',
    height: 3,
    margin: '5px 30px',
    width: '160px'
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: '#fff',
    border: '4px solid #FEDA00',
    marginTop: -9,
    marginLeft: -10,
    '&:focus, &:hover, &$active': {
      boxShadow: '#ccc 0 2px 3px 1px'
    },
    '& .bar': {
      height: 9,
      width: 1,
      backgroundColor: 'currentColor',
      marginLeft: 1,
      marginRight: 1
    }
  },
  active: {},
  track: {
    height: 3
  },
  rail: {
    color: '#EFEFF0',
    opacity: 1,
    height: 4
  }
});
