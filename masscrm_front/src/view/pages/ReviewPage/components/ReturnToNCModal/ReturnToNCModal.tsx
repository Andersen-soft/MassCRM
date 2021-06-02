import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import React, { FC, useState } from 'react';
import { CancelEditModal } from 'src/view/modals';
import { DialogCloseIcon } from 'src/view/atoms';
import { CLOSE_FORM_CONFIRM } from 'src/constants';
import { Form } from './components';
import { useStyles } from './ReturnToNCModal.styles';

interface IProps {
  open?: boolean;
  handleClose: Function;
}

export const ReturnToNCModal: FC<IProps> = ({ open, handleClose }) => {
  const styles = useStyles();

  const [openMessage, setOpenMessage] = useState(false);

  const handleCloseMessage = () => setOpenMessage(false);

  const handleToggle = () => {
    if (open && !openMessage) {
      return setOpenMessage(true);
    }
    return handleClose();
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
        // open={!!(open)}
        classes={{ root: styles.modal }}
      >
        <DialogCloseIcon onClick={handleToggle} />
        <DialogTitle>
          <span className='title'>Return contact to NC?</span>
        </DialogTitle>
        <DialogContent classes={{ root: styles.content }}>
          <Form />
        </DialogContent>
      </Dialog>
      <CancelEditModal
        open={openMessage}
        onClose={handleCloseMessage}
        onConfirm={handleConfirmMessage}
        message={CLOSE_FORM_CONFIRM}
      />
    </>
  );
};

export default ReturnToNCModal;
