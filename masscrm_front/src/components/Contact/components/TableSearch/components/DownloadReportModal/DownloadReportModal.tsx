import React from 'react';
import { Dialog, DialogContent } from '@material-ui/core';
import { DialogCloseIcon } from 'src/components/common/DialogCloseIcon';
import { useStyles } from './DownloadReportModal.styles';

export interface IPopUp {
  open: boolean;
  message: string;
  onClose?: () => void;
}
export const DownloadReportModal = ({ open, message, onClose }: IPopUp) => {
  const classes = useStyles();
  const memoizedContentClasses = React.useMemo(
    () => ({ root: classes.content }),
    [classes.content]
  );

  return (
    <Dialog open={Boolean(open)} onBackdropClick={onClose}>
      <DialogCloseIcon onClick={onClose} />
      <DialogContent classes={memoizedContentClasses}>
        <div className={classes.message}>{message}</div>
      </DialogContent>
    </Dialog>
  );
};
