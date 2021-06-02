import React, { FC } from 'react';
import { Dialog } from '@material-ui/core';
import { AddUserForm } from './components';
import { useStyles } from './Modal.styles';

interface IProps {
  open: boolean;
  onClose: (value: boolean) => void;
  id?: number;
}

export const Modal: FC<IProps> = ({ onClose, open, id }) => {
  const styles = useStyles();

  const handleClose = () => onClose(false);

  return (
    <Dialog classes={{ root: styles.dialog }} open={open}>
      <AddUserForm id={id} handleClose={handleClose} />
    </Dialog>
  );
};
