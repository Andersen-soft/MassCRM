import { makeStyles } from '@material-ui/core';
import { FONT_FAMILY_PRIMARY } from 'src/constants';

export const useStyles = makeStyles({
  root: {
    color: '#939BB2',
    position: 'relative',
    '& .MuiInputBase-root': {
      border: 'solid 1px #E1E5ED',
      height: '104px',
      overflow: 'hidden',
      alignItems: 'baseline',
      padding: 0,
      '&:hover': {
        borderColor: '#B6BECF'
      }
    },
    '& .MuiInputBase-root.Mui-focused': {
      borderColor: '#B6BECF'
    },
    '& .MuiOutlinedInput-input': {
      padding: '10px',
      fontSize: '14px',
      lineHeight: '20px'
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none'
    },
    '& .MuiIconButton-root': {
      padding: '6px'
    },
    '& .MuiInputLabel-outlined': {
      transform: 'translate(14px, 14px) scale(1)',
      color: '#939BB2',
      background: '#fff',
      padding: '0 3px'
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
      transform: 'translate(14px, -4px) scale(1)',
      fontSize: '0.85em'
    }
  },
  textarea: {
    borderColor: '#e1e5ed',
    borderRadius: '4px',
    padding: '8px 36px 8px 8px',
    fontFamily: FONT_FAMILY_PRIMARY,
    boxSizing: 'border-box',
    outline: 'none',
    resize: 'none',
    fontSize: '1em',
    '&:placeholder': {
      color: '#939bb2',
      fontSize: '1em'
    }
  }
});
