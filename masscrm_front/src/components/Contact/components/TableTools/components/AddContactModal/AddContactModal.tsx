import React, { FC, useCallback, useState } from 'react';
import { ListItemText } from '@material-ui/core';
import { ContactModal } from 'src/components/common/ContactModal';
import { IContactFormInputs } from 'src/components/common/ContactForm/interfaces';

export const AddContactModal: FC<{ contact?: IContactFormInputs }> = ({
  contact
}) => {
  const [open, setOpen] = useState(false);

  const handleToggleModal = useCallback(() => {
    setOpen(val => !val);
  }, [setOpen]);

  return (
    <>
      <ListItemText primary='Add contact' onClick={handleToggleModal} />
      <ContactModal
        handleClose={handleToggleModal}
        open={open}
        contact={contact}
      />
    </>
  );
};
