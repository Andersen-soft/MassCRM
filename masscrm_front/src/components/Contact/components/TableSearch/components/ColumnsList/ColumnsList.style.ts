import { createStyles, makeStyles } from '@material-ui/core';

export const columnsListStyle = makeStyles(() =>
  createStyles({
    filter: {
      background: '#fff',
      boxShadow: '0 5px 15px rgba(5, 31, 43, 0.17)',
      borderRadius: '4px',
      display: 'flex',
      padding: '16px 0',
      flexWrap: 'wrap',
      maxWidth: '395px',
      maxHeight: '404px',
      overflowY: 'scroll',
      boxSizing: 'border-box',
      '& .MuiFormControlLabel-root': {
        padding: '9px 22px',
        width: '50%',
        margin: 0,
        boxSizing: 'border-box'
      },
      '& .MuiFormControlLabel-root:nth-child(odd)': {
        borderRight: '1px solid #E5E9F0'
      },
      '& .MuiCheckbox-root': {
        marginRight: '18px'
      }
    }
  })
);
