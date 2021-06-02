import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    jobList: {
      marginTop: '0',
      marginBottom: '0',
      paddingLeft: '0',
      listStyle: 'none'
    },
    jobListEl: {
      display: 'grid',
      gridTemplateColumns: 'auto auto 30px 20px',
      color: '#212121',
      marginBottom: '10px',

      '& > span:not(:last-of-type)': {
        paddingRight: '10px'
      }
    },
    jobListLink: {
      color: '#13639D',
      textDecoration: 'none'
    },
    jobListIcon: {
      opacity: '.5',

      '&:hover': {
        opacity: '1'
      }
    }
  })
);
