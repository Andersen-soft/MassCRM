import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import React, { FC, useState } from 'react';
import { CancelEditModal, DialogCloseIcon } from 'src/components/common';
import { modalStyles } from './ReturnToNCModalStyles.style';
import { ReturnToNCForm } from '..';

interface IReturnToNCModal {
  open?: boolean;
  handleClose: Function;
}

export const ReturnToNCModal: FC<IReturnToNCModal> = ({
  open,
  handleClose
}) => {
  const styles = modalStyles();
  const [openMessage, setOpenMessage] = useState(false);

  const handleCloseMessage = () => setOpenMessage(false);

  const handleToggle = () => {
    if (open && !openMessage) {
      setOpenMessage(true);
    } else {
      handleClose();
    }
  };

  const handleConfirmMessage = () => {
    setOpenMessage(false);
    handleClose();
  };

  return (
    <>
      <Dialog
        onClose={handleToggle}
        maxWidth='lg'
        open
        // TODO remove comments on the stage of implementing functionality
        // open={Boolean(open)}
        classes={{ root: styles.modal }}
      >
        <DialogCloseIcon onClick={handleToggle} />
        <DialogTitle>
          <span className='title'>Return contact to NC?</span>
        </DialogTitle>
        <DialogContent classes={{ root: styles.content }}>
          <ReturnToNCForm />
        </DialogContent>
      </Dialog>
      <CancelEditModal
        open={openMessage}
        onClose={handleCloseMessage}
        onConfirm={handleConfirmMessage}
        message='Are you sure that you want close that form?'
      />
    </>
  );
};

export default ReturnToNCModal;
