import { createStyles, makeStyles } from '@material-ui/core';

export const inputStyle = makeStyles(() =>
  createStyles({
    input: {
      color: '#939BB2',
      position: 'relative',
      '& .MuiOutlinedInput-root': {
        width: '100%',
        minHeight: '40px',
        border: 'solid 1px #E1E5ED',
        '&:hover': {
          borderColor: '#B6BECF'
        }
      },
      '& .MuiOutlinedInput-root.Mui-focused': {
        borderColor: '#B6BECF'
      },
      '& .MuiOutlinedInput-input': {
        padding: '10px',
        fontSize: '14px',
        lineHeight: '16px'
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
    soloInput: {
      '& .MuiOutlinedInput-root': {
        overflow: 'hidden'
      }
    },
    multiInputForm: {
      '& .MuiOutlinedInput-root': {
        maxHeight: '90px',
        overflow: 'auto'
      }
    },
    multiInputFilter: {
      '& .MuiOutlinedInput-root': {
        maxHeight: '350px',
        overflow: 'auto'
      }
    },
    inputError: {
      '& .MuiOutlinedInput-root': {
        borderColor: '#FD5757'
      }
    },
    minWidthResponsible: {
      '& .MuiOutlinedInput-root': {
        minWidth: '230px'
      }
    },
    inputRequire: {
      '& .MuiInputLabel-outlined::before': {
        content: '"*"'
      }
    },
    error: {
      color: '#FD5757',
      marginTop: '4px',
      fontSize: '0.85em',
      position: 'absolute'
    },
    dialogError: {
      color: '#FD5757',
      marginTop: '4px',
      fontSize: '0.85em',
      position: 'absolute',
      bottom: 0
    },
    buttonGroup: {
      textAlign: 'center',
      marginTop: '30px'
    }
  })
);
