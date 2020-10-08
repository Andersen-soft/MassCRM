import React from 'react';
import { Dialog, DialogContent } from '@material-ui/core';
import { DialogCloseIcon, DefaultPopUp } from 'src/components/common';

export interface IPopUp {
  open: boolean;
  message: string;
  onClose?: () => void;
  onConfirm?: () => void;
}
export const CancelEditModal = ({ open, onClose, onConfirm }: IPopUp) => {
  return (
    <Dialog open={Boolean(open)} onBackdropClick={onClose}>
      <DialogCloseIcon onClick={onClose} />
      <DialogContent>
        <DefaultPopUp
          questionMessage='Are you shure that you want close that form?'
          onClose={onClose}
          onConfirm={onConfirm}
        />
      </DialogContent>
    </Dialog>
  );
};
