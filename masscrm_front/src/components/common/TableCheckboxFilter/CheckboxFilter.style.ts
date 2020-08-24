import { createStyles, makeStyles } from '@material-ui/core';

export const checkboxFilterStyle = makeStyles(() =>
  createStyles({
    filter: {
      background: '#fff',
      boxShadow: '0 5px 15px rgba(5, 31, 43, 0.17)',
      borderRadius: '4px',
      display: 'flex',
      flexDirection: 'column',
      padding: '9px 50px 9px 0px',
      '& .MuiFormControlLabel-root': {
        padding: '9px 22px',
        width: '100%',
        margin: 0,
        boxSizing: 'border-box'
      },
      '& .MuiCheckbox-root': {
        marginRight: '18px'
      }
    }
  })
);
