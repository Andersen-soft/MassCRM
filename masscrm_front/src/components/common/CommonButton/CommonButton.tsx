import React, { FC } from 'react';
import { Button } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { ICommonButtonProps } from './interfaces';

const DefaultButton = withStyles({
  root: {
    width: '140px',
    height: '32px',
    padding: '1px 0',
    margin: '0 8px',
    borderRadius: '50px',
    fontSize: 14,
    lineHeight: '16px',
    fontFamily: 'Roboto',
    textTransform: 'none',
    color: '#212121',
    fontWeight: 'normal',
    '&:hover': {
      opacity: 0.8
    },
    '&:active': {
      opacity: 0.8
    },
    '&:focus': {
      opacity: 0.8
    }
  }
})(Button);

const useStyles = makeStyles(() => ({
  yellow: {
    background: '#FEDA00',
    '&:hover': {
      background: '#FEC600'
    },
    '&:active': {
      background: '#FFA726'
    }
  },
  white: {
    border: '1px solid #B6BECF',
    '&:hover': {
      background: '#FFFFFF'
    },
    '&:active': {
      background: '#FEDA00',
      borderColor: '#FEDA00'
    }
  },
  small: {
    '&:disabled': {
      background: '#EFEFF0',
      color: '#939BB2',
      border: 'none'
    }
  },
  big: {
    width: '180px',
    padding: '6px 0',
    fontSize: 16,
    lineHeight: '20px',
    height: '36px',
    '&:disabled': {
      background: '#EFEFF0',
      color: '#C1C3C6',
      border: 'none'
    }
  }
}));

export const CommonButton: FC<ICommonButtonProps> = ({
  text,
  color,
  size,
  onClickHandler,
  disabled,
  type,
  children,
  className = ''
}) => {
  const classes = useStyles();

  return (
    <DefaultButton
      className={`${classes[color || 'white']} ${
        classes[size || 'small']
      } ${className}`}
      onClick={onClickHandler}
      disabled={disabled}
      type={type}
    >
      {text || children}
    </DefaultButton>
  );
};
