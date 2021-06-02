import { makeStyles, withStyles } from '@material-ui/core';
import { FONT_FAMILY_PRIMARY } from 'src/constants';

export const useStyles = makeStyles(() => ({
  yellow: {
    background: '#FEDA00',
    '&:hover': {
      background: '#FEC600'
    },
    '&:active': {
      background: '#FFA726'
    }
  },
  white: {
    border: '1px solid #B6BECF',
    '&:hover': {
      background: '#FFFFFF'
    },
    '&:active': {
      background: '#FEDA00',
      borderColor: '#FEDA00'
    }
  },
  small: {
    '&:disabled': {
      background: '#EFEFF0',
      color: '#939BB2',
      border: 'none'
    }
  },
  big: {
    width: '180px',
    padding: '6px 0',
    fontSize: 16,
    lineHeight: '20px',
    height: '36px',
    '&:disabled': {
      background: '#EFEFF0',
      color: '#C1C3C6',
      border: 'none'
    }
  },
  alignRight: {
    margin: '0 0 0 auto'
  }
}));

export const defaultButtonStyles = withStyles({
  root: {
    width: '140px',
    height: '32px',
    padding: '1px 0',
    margin: '0 8px',
    borderRadius: '50px',
    fontSize: 14,
    lineHeight: '16px',
    fontFamily: FONT_FAMILY_PRIMARY,
    textTransform: 'none',
    color: '#212121',
    fontWeight: 'normal',
    '&:hover': {
      opacity: 0.8
    },
    '&:active': {
      opacity: 0.8
    },
    '&:focus': {
      opacity: 0.8
    }
  }
});
