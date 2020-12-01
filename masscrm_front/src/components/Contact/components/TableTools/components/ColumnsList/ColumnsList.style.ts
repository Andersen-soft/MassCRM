import { createStyles, makeStyles } from '@material-ui/core';

export const columnsListStyle = makeStyles(() =>
  createStyles({
    filter: {
      background: '#fff',
      borderRadius: '4px',
      display: 'flex',
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
    },
    wrapper: {
      padding: '16px 0',
      '& .MuiFormControlLabel-root': {
        padding: '9px 22px',
        width: '50%',
        margin: 0,
        boxSizing: 'border-box'
      },
      '& .MuiCheckbox-root': {
        marginRight: '18px'
      }
    }
  })
);
