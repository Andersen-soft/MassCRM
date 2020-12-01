import React from 'react';
import { Dialog, DialogContent } from '@material-ui/core';
import { DialogCloseIcon, DefaultPopUp } from '..';

interface ICancelEditModal {
  message?: string;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const CancelEditModal = ({
  open,
  onClose,
  onConfirm,
  message = 'Are you sure that you want close that form?'
}: ICancelEditModal) => {
  return (
    <Dialog open={Boolean(open)} onBackdropClick={onClose}>
      <DialogCloseIcon onClick={onClose} />
      <DialogContent>
        <DefaultPopUp
          questionMessage={message}
          onClose={onClose}
          onConfirm={onConfirm}
        />
      </DialogContent>
    </Dialog>
  );
};
