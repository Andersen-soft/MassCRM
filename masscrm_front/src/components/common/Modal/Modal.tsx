import React, { FC } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { AddUserForm } from 'src/components/UsersCRM/AddUserForm';
import { dialogStyle } from './Modal.style';

interface IModalProps {
  open: boolean;
  onClose: (value: boolean) => void;
  id?: number;
}

export const Modal: FC<IModalProps> = props => {
  const style = dialogStyle();

  const { onClose, open, id } = props;

  const handleClose = () => {
    onClose(false);
  };

  return (
    <Dialog classes={{ root: style.dialog }} open={open}>
      <AddUserForm id={id} handleClose={handleClose} />
    </Dialog>
  );
};
