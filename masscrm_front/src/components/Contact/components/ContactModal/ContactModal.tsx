import React, { FC } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { modalStyle } from 'src/styles/CommonModal.style';
import { ContactForm } from '../ContactForm';
import { IContactFormInputs } from '../ContactForm/interfaces';

export const ContactModal: FC<{
  handleClose: () => void;
  open: boolean;
  contact?: IContactFormInputs;
}> = ({ handleClose, open, contact }) => {
  const style = modalStyle();

  return (
    <Dialog
      onClose={handleClose}
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
        <ContactForm onCloseModal={handleClose} contact={contact} />
      </DialogContent>
    </Dialog>
  );
};
