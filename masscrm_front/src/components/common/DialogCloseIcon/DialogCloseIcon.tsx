import * as React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { useStyles } from './DialogCloseIcon.styles';

interface Props {
  onClick?: () => void;
  className?: string;
}

export const DialogCloseIcon: React.FC<Props> = props => {
  const classes = useStyles(props);
  const { onClick, className = '' } = props;

  return (
    <CloseIcon className={`${classes.root} ${className}`} onClick={onClick} />
  );
};
