import React, { FC } from 'react';
import { Dialog, DialogContent } from '@material-ui/core';
import { DialogCloseIcon } from 'src/view/atoms';
import { useStyles } from './RelatedContactsModal.styles';

interface IProps {
  open: boolean;
  onClose: () => void;
}

export const RelatedContactsModal: FC<IProps> = ({ open, onClose }) => {
  const styles = useStyles();

  return (
    <Dialog open={open} onBackdropClick={onClose}>
      <DialogCloseIcon onClick={onClose} />
      <DialogContent>
        <p className={styles.message}>
          There are related contacts in the company. <br /> You can`t delete the
          company
        </p>
      </DialogContent>
    </Dialog>
  );
};
