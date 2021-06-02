import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    sliderLabel: {
      fontSize: '0.85rem',
      color: '#939BB2'
    },
    slider: {
      margin: '10px 0',
      padding: '0',
      color: '#EFEFF0',
      height: '4px',
      width: '98%',
      '& .MuiSlider-thumb.Mui-focusVisible, .MuiSlider-thumb:hover': {
        boxShadow: 'none'
      },
      '& .MuiSlider-track': {
        color: '#FEDA00',
        height: '4px'
      },
      '& .MuiSlider-rail': {
        height: '4px'
      },
      '& .MuiSlider-thumb': {
        height: '20px',
        width: '20px',
        backgroundColor: '#fff',
        border: 'solid 4px #FEDA00',
        marginTop: '-7px'
      },
      '& .MuiSlider-valueLabel span': {
        backgroundColor: '#FEDA00'
      },
      '& .MuiSlider-markLabel': {
        top: '12px',
        color: '#939BB2'
      },
      '&.Mui-disabled': {
        color: '#EFEFF0'
      },
      '&.Mui-disabled .MuiSlider-track': {
        color: '#EFEFF0'
      },
      '&.Mui-disabled .MuiSlider-thumb': {
        borderColor: '#EFEFF0'
      }
    }
  })
);
