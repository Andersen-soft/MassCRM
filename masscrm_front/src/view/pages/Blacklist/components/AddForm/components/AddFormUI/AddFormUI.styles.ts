import { createStyles, makeStyles } from '@material-ui/core';
import { FONT_FAMILY_PRIMARY } from 'src/constants';

export const useStyles = makeStyles(() =>
  createStyles({
    addTextAreaTall: {
      background: '#fff',
      width: '100%',
      marginTop: '24px',
      padding: '8px',
      border: '1px solid #e1e5ed',
      boxSizing: 'border-box',
      borderRadius: '4px',
      resize: 'none',
      fontFamily: FONT_FAMILY_PRIMARY,
      height: 'calc(100vh - 335px)'
    },

    addTextAreaLow: {
      background: '#fff',
      width: '100%',
      marginTop: '24px',
      padding: '8px',
      border: '1px solid #e1e5ed',
      boxSizing: 'border-box',
      borderRadius: '4px',
      resize: 'none',
      fontFamily: FONT_FAMILY_PRIMARY,
      height: '116px'
    },

    addTextArea: {
      '&::-webkit-input-placeholder': {
        color: '#939bb2',
        fontSize: '14px',
        lineHeight: '18px'
      }
    },
    addPrompt: {
      fontSize: '12px',
      lineHeight: '16px',
      color: '#939bb2',
      marginBottom: '24px'
    },
    addButtonGroup: {
      marginLeft: '-8px'
    }
  })
);
