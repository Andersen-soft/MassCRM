import * as React from 'react';
import cn from 'classnames';
import { useStyles } from './HorizontalDivider.styles';

interface Props {
  className?: string;
}

export const HorizontalDivider: React.FC<Props> = ({ className }) => {
  const classes = useStyles();

  return <div className={cn(classes.root, className)} />;
};
