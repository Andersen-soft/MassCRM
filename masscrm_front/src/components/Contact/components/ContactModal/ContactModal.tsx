import React, { FC, useCallback, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { modalStyle } from 'src/styles/CommonModal.style';
import { ContactForm } from '../ContactForm';
import { IContactFormInputs } from '../ContactForm/interfaces';
import { CancelEditModal } from '../TableSearch/components/CancelEditModal';

export const ContactModal: FC<{
  handleClose: () => void;
  open: boolean;
  contact?: IContactFormInputs;
}> = ({ handleClose, open, contact }) => {
  const style = modalStyle();
  const [isTouchedForm, setIsTouchedForm] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);

  const handleCloseMessage = useCallback(() => {
    setOpenMessage(false);
  }, [setOpenMessage]);

  const setIsTouchedFormHandle = (val: boolean) => setIsTouchedForm(val);

  const handleToggle = useCallback(() => {
    if (open && !openMessage && isTouchedForm) {
      setOpenMessage(true);
    } else {
      setIsTouchedForm(false);
      handleClose();
    }
  }, [open, openMessage, isTouchedForm, setOpenMessage, handleClose]);

  const handleConfirmMessage = useCallback(() => {
    setOpenMessage(false);
    setIsTouchedForm(false);
    handleClose();
  }, [setOpenMessage]);

  return (
    <>
      <Dialog
        onClose={handleToggle}
        maxWidth='lg'
        open={open}
        classes={{ root: style.modal }}
      >
        <DialogTitle>
          <span className='title'>
            {contact ? 'Edit Contact' : 'Add Contact'}
          </span>
        </DialogTitle>
        <DialogContent classes={{ root: style.content }}>
          <ContactForm
            onCloseModal={handleConfirmMessage}
            onCancelModal={handleToggle}
            contact={contact}
            setIsTouchedForm={setIsTouchedFormHandle}
          />
        </DialogContent>
      </Dialog>
      <CancelEditModal
        open={openMessage}
        onClose={handleCloseMessage}
        onConfirm={handleConfirmMessage}
        message='Data export will take time. You will be notified once this action is complete.'
      />
    </>
  );
};
