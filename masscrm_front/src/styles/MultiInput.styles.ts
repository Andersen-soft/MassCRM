import { createStyles, makeStyles } from '@material-ui/core';

export const multiInputStyles = makeStyles(() =>
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
        height: '200px'
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
    IconDropdown: {
      marginLeft: '4px',
      marginRight: '0',
      '& .makeStyles-box-10': {
        alignItems: 'center'
      }
    },
    IconClose: {
      '& svg': {
        width: '13px',
        height: '13px',
        fill: '#69738F'
      }
    },
    IconButtonRoot: {
      padding: '0 ',
      marginRight: '0'
    },
    IconFormControl: {
      opacity: '.5',

      '&:hover': {
        opacity: '1'
      }
    },
    wrap: {
      position: 'relative',
      '& .Mui-error': {
        borderColor: '#FD5757'
      }
    },
    popper: {
      zIndex: 3000
    },
    tipContent: {
      padding: '8px 12px',
      fontSize: '12px',
      fontWeight: 300,
      boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
      width: '200px',
      background: '#fff'
    },
    addButton: {
      display: 'flex',
      alignItems: 'center',
      color: '#939BB2',
      padding: 0,
      textTransform: 'inherit',
      fontWeight: 'normal',

      '&:hover': {
        backgroundColor: 'transparent'
      }
    },
    modalHeader: {
      padding: '17px 20px',
      borderBottom: '1px solid #E1E5ED'
    },
    modalContent: {
      display: 'flex',
      flexDirection: 'column',
      padding: '20px 15px 20px',
      minWidth: '200px'
    },
    modal: {
      '& .MuiPaper-elevation8': {
        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)'
      }
    },
    list: {
      margin: '0',
      paddingLeft: '0',
      listStyle: 'none'
    },
    listEl: {
      display: 'flex',
      alignItems: 'center',

      '&:not(:last-child)': {
        marginBottom: '15px'
      },

      '& > span:not(:last-of-type)': {
        paddingRight: '10px'
      }
    },
    listLink: {
      color: '#13639D',
      textDecoration: 'none'
    },
    lastInList: {
      marginLeft: 'auto'
    }
  })
);
