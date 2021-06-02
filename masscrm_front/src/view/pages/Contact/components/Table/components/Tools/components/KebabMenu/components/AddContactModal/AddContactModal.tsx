import React, { FC, useCallback, useState } from 'react';
import { ListItemText } from '@material-ui/core';
import { ContactModal } from 'src/view/modals';
import { IContactFormInputs } from 'src/interfaces';

interface IProps {
  contact?: IContactFormInputs;
}

export const AddContactModal: FC<IProps> = ({ contact }) => {
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
