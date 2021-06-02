import React, { FC } from 'react';
import cn from 'classnames';
import { useStyles } from './FieldLabel.styles';

interface IProps {
  label: string;
  className?: string;
  labelClassName?: string;
}

export const FieldLabel: FC<IProps> = ({
  className = '',
  children,
  label,
  labelClassName
}) => {
  const styles = useStyles();

  return (
    <div className={`${styles.root} ${className}`}>
      <div className={cn(styles.label, labelClassName)}>{label}</div>
      <div>{children}</div>
    </div>
  );
};
