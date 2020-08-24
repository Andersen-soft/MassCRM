import React, { ChangeEvent, FC } from 'react';
import { styleNames } from 'src/services';
import style from './CustomTextarea.scss';

const sn = styleNames(style);

interface Props {
  className?: string;
  value?: string;
  name?: string;
  placeholder?: string;
  height?: string;
  width?: string;
  maxlength?: number;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

export const CustomTextarea: FC<Props> = ({
  className = '',
  value,
  placeholder,
  name,
  height,
  width,
  maxlength,
  onChange
}) => (
  <textarea
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`${sn('textarea')} ${className}`}
    style={{ height, width }}
    maxLength={maxlength}
  />
);
