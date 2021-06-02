import React, { ChangeEvent, FC } from 'react';
import { TextField } from '@material-ui/core';
import { useStyles } from './CustomTextarea.styles';

interface IProps {
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

export const CustomTextarea: FC<IProps> = ({
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
  const styles = useStyles();

  return className ? (
    <textarea
      name={name}
      data-testid={dataTestId}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`${styles.textarea} ${className}`}
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
      className={styles.root}
      multiline
      style={{ width }}
    />
  );
};
