import * as React from 'react';
import cn from 'classnames';
import { useStyles } from './FieldLabel.styles';

interface Props {
  label: string;
  className?: string;
  labelClassName?: string;
}

export const FieldLabel: React.FC<Props> = props => {
  const classes = useStyles();
  const { className, children, label, labelClassName } = props;

  return (
    <div className={`${classes.root} ${className || ''}`}>
      <div className={cn(classes.label, labelClassName)}>{label}</div>
      <div>{children}</div>
    </div>
  );
};
