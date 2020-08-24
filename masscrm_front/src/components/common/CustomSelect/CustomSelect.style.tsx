import { createStyles, makeStyles } from '@material-ui/core';

export const selectStyle = makeStyles(() =>
  createStyles({
    multiCount: {
      width: '24px',
      height: '24px',
      background: '#F4F6FA',
      boxShadow: '0px 1px 1px rgba(0, 25, 91, 0.15)',
      borderRadius: '4px',
      textAlign: 'center',
      padding: '5px 1px',
      fontSize: '0.85em',
      boxSizing: 'border-box',
      position: 'absolute',
      top: '17%',
      right: '26%',
      color: '#939BB2'
    },
    customSelectIcon: {
      color: '#69738F'
    },
    customSelectOutlined: {
      paddingRight: 0,
      width: '85%',
      background: '#fff !important',
      textAlign: 'left'
    },
    Paper: {
      marginTop: '50px',
      '& .MuiMenu-paper': {
        maxHeight: '200px'
      }
    },
    ListItemBtn: {
      '&:hover': {
        background: '#F9F9FA'
      }
    },
    InputAdornmentPositionEnd: {
      marginLeft: '-65px'
    },
    IconBtnEdgeEnd: {
      left: '15px',
      padding: '0',
      marginRight: '0',
      '&:hover': {
        background: 'none'
      }
    },
    InputLabelOutlined: {
      transform: 'translate(14px, 14px) scale(1)',
      color: '#939BB2',
      fontSize: '1em'
    },
    InputLabelShrink: {
      background: '#fff'
    },
    FormLabel: {
      width: '230px',
      minHeight: '40px',
      boxSizing: 'border-box',
      '& .MuiOutlinedInput-root': {
        height: '100%'
      },
      '& .MuiFormLabel-root.Mui-focused': {
        color: '#939BB2',
        transform: 'translate(14px, -4px) scale(1)',
        fontSize: '0.85em'
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#E1E5ED'
      },
      '.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline, & .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#B6BECF',
        borderWidth: '1px'
      },
      '& .MuiSelect-nativeInput': {
        color: '#212121',
        top: 0,
        opacity: 1,
        border: 'none',
        width: '50%',
        left: '10px'
      },
      '& .MuiInputAdornment-root': {
        marginLeft: '-42px'
      }
    },
    required: {
      '& .MuiInputLabel-outlined::before': {
        content: '"*"'
      }
    },
    error: {
      '& .MuiOutlinedInput-root, & .MuiOutlinedInput-notchedOutline': {
        borderColor: '#FD5757'
      }
    },
    SvgIconFontSizeSmall: {
      fontSize: '1rem'
    },
    MultiIconButtonLabel: {
      background: '#fff',
      zIndex: 2,
      '&&:hover': {
        background: '#fff'
      }
    },
    IconButtonRoot: {
      padding: '0 ',
      marginRight: '0'
    },
    wrap: {
      position: 'relative'
    }
  })
);
