import { createStyles, makeStyles } from '@material-ui/core';
import { FONT_FAMILY_PRIMARY, MEDIA_DESKTOP_MEDIUM } from 'src/constants';

export const useStyles = makeStyles(() =>
  createStyles({
    form: {
      boxSizing: 'border-box',
      width: '100%',
      background: '#fff',
      border: '1px solid rgba(205, 214, 225, 0.3)',
      borderRadius: '8px',
      overflow: 'hidden'
    },
    formHeader: {
      padding: '24px',
      boxSizing: 'border-box',
      background: '#fff',
      border: 'none',
      outline: 'none',
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between'
    },
    formBody: {
      boxSizing: 'border-box',
      padding: '0 24px 24px'
    },
    formTitle: {
      fontSize: '1.35em',
      fontFamily: FONT_FAMILY_PRIMARY
    },
    formBtn: {
      margin: '20px 0 0 -8px'
    },
    formTextArea: {
      width: '230px',
      height: '116px'
    },
    listTransition: {
      listTransitionEnterActive: {
        transition: 'all 400ms'
      },
      listTransitionAppearActive: {
        transition: 'all 400ms'
      },
      listTransitionExitActive: {
        transition: 'all 400ms'
      }
    },
    addForm: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'column',
      maxHeight: '360px'
    },
    addFormItem: {
      width: '20%',
      padding: '15px 0',
      maxWidth: '230px'
    },
    addFormItemEmpty: {
      padding: '15px 0',
      height: '40px'
    },
    addFormAlign: {
      padding: '10px 0'
    },
    wrap: {
      background: '#fff',
      display: 'flex',
      paddingBottom: '24px'
    },
    createContact: {
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap',
      width: '50%',
      height: '605px',
      marginTop: '-24px',
      paddingLeft: '20px',
      [`${MEDIA_DESKTOP_MEDIUM}`]: {
        alignItems: 'center',
        height: '1170px'
      },
      '&:first-child': {
        justifyContent: 'space-between',
        paddingRight: '20px',
        paddingLeft: 0,
        borderRight: '1px solid #e5e9f0'
      }
    },
    createContactItem: {
      width: '230px',
      padding: '12px 20px',
      '&:empty': {
        padding: 0
      }
    },
    createContactText: {
      width: '230px',
      height: '105px',
      position: 'absolute'
    },
    createContactBtn: {
      textAlign: 'center'
    }
  })
);
