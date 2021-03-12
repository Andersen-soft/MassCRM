import React, { ChangeEvent, FC } from 'react';
import { TextField, makeStyles } from '@material-ui/core';
import { styleNames } from 'src/services';
import style from './CustomTextarea.scss';

const sn = styleNames(style);

const useStyles = makeStyles({
  root: {
    color: '#939BB2',
    position: 'relative',
    '& .MuiInputBase-root': {
      border: 'solid 1px #E1E5ED',
      height: '104px',
      overflow: 'hidden',
      alignItems: 'baseline',
      padding: 0,
      '&:hover': {
        borderColor: '#B6BECF'
      }
    },
    '& .MuiInputBase-root.Mui-focused': {
      borderColor: '#B6BECF'
    },
    '& .MuiOutlinedInput-input': {
      padding: '10px',
      fontSize: '14px',
      lineHeight: '20px'
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
  }
});

interface Props {
  className?: string;
  value?: string;
  name?: string;
  dataTestId?: string;
  placeholder?: string;
  height?: string;
  minHeight?: string;
  width?: string;
  maxlength?: number;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

export const CustomTextarea: FC<Props> = ({
  value,
  placeholder,
  name,
  dataTestId,
  onChange,
  className,
  height,
  width,
  maxlength
}) => {
  const classes = useStyles();

  return className ? (
    <textarea
      name={name}
      data-testid={dataTestId}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`${sn('textarea')} ${className}`}
      style={{ height, width }}
      maxLength={maxlength}
    />
  ) : (
    <TextField
      variant='outlined'
      label='Comment'
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={classes.root}
      multiline
      style={{ width }}
    />
  );
};
