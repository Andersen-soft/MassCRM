import React, { FC, useMemo } from 'react';
import { Dialog, DialogContent } from '@material-ui/core';
import { DialogCloseIcon } from 'src/view/atoms';
import { useStyles } from './MessageModal.styles';

interface IProps {
  message: string;
  onClose?: () => void;
}

export const MessageModal: FC<IProps> = ({ message, onClose }) => {
  const styles = useStyles();

  const memoizedContentClasses = useMemo(() => ({ root: styles.content }), [
    styles.content
  ]);

  return (
    <Dialog open={!!message}>
      <DialogCloseIcon onClick={onClose} />
      <DialogContent classes={memoizedContentClasses}>
        <div className={styles.message}>{message}</div>
      </DialogContent>
    </Dialog>
  );
};
