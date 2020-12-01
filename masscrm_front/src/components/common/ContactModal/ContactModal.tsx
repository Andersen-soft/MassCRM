import React, { FC, useCallback, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { modalStyle } from 'src/styles/CommonModal.style';
import { ContactForm, CancelEditModal } from '..';
import { IContactFormInputs } from '../ContactForm/interfaces';
import { TOpen } from '../Table/interfaces';

const LABELS: { [key: string]: string } = {
  copy: 'Add Contact',
  edit: 'Edit Contact'
};

export const ContactModal: FC<{
  handleClose: () => void;
  open: TOpen;
  contact?: IContactFormInputs;
  autoFocus?: string;
  onSubmitSuccess?: Function;
}> = ({ handleClose, open, contact, ...props }) => {
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
        open={Boolean(open)}
        classes={{ root: style.modal }}
      >
        <DialogTitle>
          <span className='title'>
            {(contact && LABELS[open as string]) || LABELS.copy}
          </span>
        </DialogTitle>
        <DialogContent classes={{ root: style.content }}>
          <ContactForm
            {...props}
            onCloseModal={handleConfirmMessage}
            onCancelModal={handleToggle}
            contact={contact}
            setIsTouchedForm={setIsTouchedFormHandle}
            typeModal={open === 'copy' ? 'copy' : 'edit'}
          />
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
