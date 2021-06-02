import React, { FC, useCallback, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { ContactForm } from 'src/view/organisms';
import { Open, IContactFormInputs } from 'src/interfaces';
import { CancelEditModal } from 'src/view/modals';
import { CLOSE_FORM_CONFIRM } from 'src/constants';
import { CONTACT_MODAL_LABELS } from './constants';
import { useStyles } from './ContactModal.styles';

interface IProps {
  handleClose: () => void;
  open: Open;
  contact?: IContactFormInputs;
  autoFocus?: string;
  onSubmitSuccess?: Function;
}

export const ContactModal: FC<IProps> = ({
  handleClose,
  open,
  contact,
  ...props
}) => {
  const styles = useStyles();

  const [isTouchedForm, setIsTouchedForm] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);

  const handleCloseMessage = useCallback(() => {
    setOpenMessage(false);
  }, [setOpenMessage]);

  const setIsTouchedFormHandle = (val: boolean) => setIsTouchedForm(val);

  const handleToggle = useCallback(() => {
    if (open && !openMessage && isTouchedForm) {
      setOpenMessage(true);
      return;
    }
    setIsTouchedForm(false);
    handleClose();
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
        open={!!open}
        classes={{ root: styles.modal }}
      >
        <DialogTitle>
          <span className='title'>
            {(contact && CONTACT_MODAL_LABELS[open as string]) ||
              CONTACT_MODAL_LABELS.copy}
          </span>
        </DialogTitle>
        <DialogContent classes={{ root: styles.content }}>
          <ContactForm
            {...props}
            onCloseModal={handleConfirmMessage}
            onCancelModal={handleToggle}
            contact={contact}
            setIsTouchedForm={setIsTouchedFormHandle}
            typeModal={open === 'copy' ? 'copy' : 'edit'}
            shouldGetFiltersData
          />
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
