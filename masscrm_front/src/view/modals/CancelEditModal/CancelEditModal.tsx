import React, { FC } from 'react';
import { Dialog, DialogContent } from '@material-ui/core';
import { DialogCloseIcon } from 'src/view/atoms';
import { DefaultPopup } from 'src/view/molecules';
import { CLOSE_FORM_CONFIRM } from 'src/constants';

interface IProps {
  message?: string;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const CancelEditModal: FC<IProps> = ({
  open,
  onClose,
  onConfirm,
  message = `${CLOSE_FORM_CONFIRM}`
}) => (
  <Dialog open={open} onBackdropClick={onClose}>
    <DialogCloseIcon onClick={onClose} />
    <DialogContent>
      <DefaultPopup
        questionMessage={message}
        onClose={onClose}
        onConfirm={onConfirm}
      />
    </DialogContent>
  </Dialog>
);
