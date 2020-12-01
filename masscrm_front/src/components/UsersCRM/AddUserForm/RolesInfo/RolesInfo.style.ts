import { createStyles, makeStyles } from '@material-ui/core/styles';

export const rolesInfoStyles = makeStyles(() =>
  createStyles({
    customBody: {
      '& .MuiTableCell-root ': {
        color: '#212121',
        fontWeight: '100',
        padding: '10px',
        '& :hover': {
          textDecoration: 'underline dashed #939BB2'
        }
      },
      '& .MuiTableRow-root:nth-child(odd)': {
        backgroundColor: '#F9F9FA'
      },
      '& .MuiTableCell-root.bold ': {
        fontWeight: 'bold'
      },
      '& .MuiTableCell-root.blueText ': {
        color: '#13639D'
      }
    },
    customTooltip: {
      background: '#fff'
    },
    customTableRow: {
      display: 'flex'
    }
  })
);
