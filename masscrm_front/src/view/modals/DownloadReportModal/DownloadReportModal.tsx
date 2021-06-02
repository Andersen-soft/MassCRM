import React, { FC } from 'react';
import { Dialog, DialogContent } from '@material-ui/core';
import { DialogCloseIcon } from 'src/view/atoms';
import { useStyles } from './DownloadReportModal.styles';

interface IProps {
  open: boolean;
  message: string;
  onClose?: () => void;
}

export const DownloadReportModal: FC<IProps> = ({ open, message, onClose }) => {
  const styles = useStyles();

  return (
    <Dialog open={open} onBackdropClick={onClose}>
      <DialogCloseIcon onClick={onClose} />
      <DialogContent classes={{ root: styles.content }}>
        <div className={styles.message}>{message}</div>
      </DialogContent>
    </Dialog>
  );
};
