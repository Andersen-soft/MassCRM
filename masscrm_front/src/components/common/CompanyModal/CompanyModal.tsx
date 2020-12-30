import React, { FC, useCallback, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { CompanyForm, CancelEditModal } from '..';
import { TOpen } from '../Table/interfaces';
import { ICompanyFormInputs } from '../CompanyForm/interfaces';
import { modalStyles } from './CompanyModal.styles';

export const CompanyModal: FC<{
  handleClose: () => void;
  open: TOpen;
  company?: ICompanyFormInputs;
  onSubmitSuccess?: Function;
}> = ({ handleClose, open, company, ...props }) => {
  const styles = modalStyles();

  const [openMessage, setOpenMessage] = useState(false);

  const handleCloseMessage = useCallback(() => {
    setOpenMessage(false);
  }, [setOpenMessage]);

  const handleToggle = useCallback(() => {
    if (open && !openMessage) {
      setOpenMessage(true);
    } else {
      handleClose();
    }
  }, [open, openMessage, setOpenMessage, handleClose]);

  const handleConfirmMessage = useCallback(() => {
    setOpenMessage(false);
    handleClose();
  }, [setOpenMessage]);

  return (
    <>
      <Dialog
        onClose={handleToggle}
        maxWidth='lg'
        open={Boolean(open)}
        classes={{ root: styles.modal }}
      >
        <DialogTitle>
          <span className='title'>Edit company</span>
        </DialogTitle>
        <DialogContent classes={{ root: styles.content }}>
          <CompanyForm
            {...props}
            onCloseModal={handleConfirmMessage}
            onCancelModal={handleToggle}
            company={company}
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
