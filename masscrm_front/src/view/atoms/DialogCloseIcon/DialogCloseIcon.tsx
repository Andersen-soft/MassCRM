import React, { FC } from 'react';
import { Close as CloseIcon } from '@material-ui/icons';
import { useStyles } from './DialogCloseIcon.styles';

interface IProps {
  onClick?: () => void;
  className?: string;
}

export const DialogCloseIcon: FC<IProps> = props => {
  const styles = useStyles(props);

  const { onClick, className = '' } = props;

  return (
    <CloseIcon className={`${styles.root} ${className}`} onClick={onClick} />
  );
};
