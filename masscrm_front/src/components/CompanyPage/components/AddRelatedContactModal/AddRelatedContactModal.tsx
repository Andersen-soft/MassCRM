import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import React, { FC, useCallback, useState } from 'react';
import {
  CancelEditModal,
  DialogCloseIcon,
  ContactByEmail,
  CommonButton
} from 'src/components/common';
import { styleNames } from 'src/services';
import { IContact } from 'src/interfaces';

import { updateContact } from 'src/actions';
import styles from './AddRelatedContactModal.scss';
import { modalStyles } from './AddRelatedContactModal.style';

const sn = styleNames(styles);

interface IAddRelatedContactModal {
  open: boolean;
  handleClose: Function;
  companyId: number;
  fetchRelatedContacts: Function;
}

export const AddRelatedContactModal: FC<IAddRelatedContactModal> = ({
  handleClose,
  open,
  companyId,
  fetchRelatedContacts
}) => {
  const style = modalStyles();
  const [openMessage, setOpenMessage] = useState<boolean>(false);
  const [chosenContact, setChosenContact] = useState<any>('');

  const handleToggleMessage = useCallback(
    (shouldClose: boolean) => (): void => {
      setOpenMessage(false);
      shouldClose && handleClose();
    },
    []
  );

  const handleToggle = useCallback(() => {
    if (open && !openMessage) {
      setOpenMessage(true);
    } else {
      handleClose();
    }
  }, [open, openMessage, setOpenMessage, handleClose]);

  const onChangeContact = useCallback(
    (setContactFieldValue: (key?: IContact) => void) => (val?: IContact) => {
      setContactFieldValue(val);
    },
    []
  );

  const handleSubmit = useCallback(async () => {
    if (chosenContact) {
      // props below were excluded since they interfere with the update in the presented form
      // and they're not required for this specific one
      const {
        company,
        mails,
        emails,
        ...neededPropsForContactUpdate
      } = chosenContact;

      await updateContact(
        { ...neededPropsForContactUpdate, company_id: companyId },
        chosenContact.id
      );
      await fetchRelatedContacts();
      handleClose();
    }
  }, [chosenContact]);

  return (
    <>
      <Dialog
        onClose={handleToggle}
        maxWidth='lg'
        open={Boolean(open)}
        classes={{ root: style.modal }}
      >
        <DialogCloseIcon onClick={handleToggle} />
        <DialogTitle>
          <span className='title'>Add new related contact</span>
        </DialogTitle>
        <DialogContent classes={{ root: style.content }}>
          <ContactByEmail
            id={companyId}
            name='email'
            value={chosenContact ? chosenContact.id : ''}
            onSelect={onChangeContact(setChosenContact)}
            placeholder='Contact`s Email'
          />
          <div className={sn('wrapper-btns')}>
            <CommonButton
              text='Cancel'
              type='reset'
              onClickHandler={handleToggle}
            />
            <CommonButton
              text='Submit'
              color='yellow'
              onClickHandler={handleSubmit}
            />
          </div>
        </DialogContent>
      </Dialog>
      <CancelEditModal
        open={openMessage}
        onClose={handleToggleMessage(false)}
        onConfirm={handleToggleMessage(true)}
        message='Are you sure that you want close that form?'
      />
    </>
  );
};
