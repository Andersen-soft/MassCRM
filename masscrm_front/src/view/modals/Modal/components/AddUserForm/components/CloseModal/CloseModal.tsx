import React, { FC } from 'react';
import { Dialog } from '@material-ui/core';
import { CloseModalForm } from '.';
import { useStyles } from './CloseModal.styles';

interface IProps {
  open: boolean;
  onCloseCheck: (value: boolean) => void;
  onClose: () => void;
}

export const CloseModal: FC<IProps> = ({ onCloseCheck, open, onClose }) => {
  const styles = useStyles();

  const handleClose = () => {
    onCloseCheck(false);
  };

  return (
    <Dialog classes={{ root: styles.dialog }} open={open}>
      <CloseModalForm handleClose={handleClose} onClose={onClose} />
    </Dialog>
  );
};
