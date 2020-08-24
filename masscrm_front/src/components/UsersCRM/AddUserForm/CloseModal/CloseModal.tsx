import React, { FC } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { CloseModalForm } from 'src/components/UsersCRM/AddUserForm/CloseModal/CloseModalForm';
import { dialogStyle } from './CloseModal.style';

interface IModalProps {
  open: boolean;
  onCloseCheck: (value: boolean) => void;
  onClose: () => void;
}

export const CloseModal: FC<IModalProps> = props => {
  const style = dialogStyle();

  const { onCloseCheck, open, onClose } = props;

  const handleClose = () => {
    onCloseCheck(false);
  };

  return (
    <Dialog classes={{ root: style.dialog }} open={open}>
      <CloseModalForm handleClose={handleClose} onClose={onClose} />
    </Dialog>
  );
};
