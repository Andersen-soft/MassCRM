import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  () => ({
    message: {
      color: '#212121',
      fontSize: 20
    },
    content: {
      padding: 56,
      paddingBottom: 8,

      '&:first-child': {
        padding: 56,
        paddingBottom: 8
      }
    },
    actions: {
      padding: '40px 56px',
      justifyContent: 'center'
    }
  }),
  { name: 'QuestionModal' }
);
