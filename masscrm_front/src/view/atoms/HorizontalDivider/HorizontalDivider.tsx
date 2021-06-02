import React, { FC } from 'react';
import cn from 'classnames';
import { useStyles } from './HorizontalDivider.styles';

interface IProps {
  className?: string;
}

export const HorizontalDivider: FC<IProps> = ({ className }) => {
  const styles = useStyles();

  return <div className={cn(styles.root, className)} />;
};
