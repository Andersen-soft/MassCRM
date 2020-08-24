import { createStyles, makeStyles } from '@material-ui/core';

export const checkBoxStyle = makeStyles(() =>
  createStyles({
    checkBox: {
      padding: 0,
      '& .MuiIconButton-root': {
        '&:hover': {
          color: '#69738F',
          backgroundColor: 'none'
        }
      },
      '& .MuiIconButton-label': {
        border: '1px solid rgba(105, 115, 143, 0.5)',
        borderRadius: '4px',
        height: '19px',
        width: '19px'
      },
      '& .MuiCheckbox-root': {
        color: '#78829D'
      }
    }
  })
);
