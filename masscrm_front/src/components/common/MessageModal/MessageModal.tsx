import React from 'react';
import { Dialog, DialogContent } from '@material-ui/core';
import { DialogCloseIcon } from '../DialogCloseIcon';
import { useStyles } from './MessageModal.styles';

export interface IPopUp {
  message: string;
  onClose?: () => void;
}

export const MessageModal = ({ message, onClose }: IPopUp) => {
  const classes = useStyles();
  const memoizedContentClasses = React.useMemo(
    () => ({ root: classes.content }),
    [classes.content]
  );

  return (
    <Dialog open={Boolean(message)}>
      <DialogCloseIcon onClick={onClose} />
      <DialogContent classes={memoizedContentClasses}>
        <div className={classes.message}>{message}</div>
      </DialogContent>
    </Dialog>
  );
};
