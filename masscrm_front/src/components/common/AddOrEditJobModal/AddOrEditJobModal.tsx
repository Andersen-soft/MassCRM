import React, { FC, useCallback, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { AddOrEditJobForm } from 'src/components/common/AddOrEditJobForm';
import { IContactsJobs, IContactJobValues } from 'src/interfaces';
import { modalStyles } from './AddOrEditJobModalStyles.style';
import { CancelEditModal } from '../CancelEditModal';
import { DialogCloseIcon } from '../DialogCloseIcon';

export const AddOrEditJobModal: FC<{
  vacancies?: IContactsJobs;
  handleClose: () => () => void;
  open: boolean;
  modalType: string;
  companyId: number;
  vacancyToEdit: IContactJobValues;
}> = ({
  vacancies,
  handleClose,
  open,
  modalType,
  companyId,
  vacancyToEdit
}) => {
  const styles = modalStyles();

  const [openMessage, setOpenMessage] = useState(false);

  const handleCloseMessage = useCallback(() => {
    setOpenMessage(false);
  }, [setOpenMessage]);

  const handleToggle = useCallback(() => {
    if (open && !openMessage) {
      setOpenMessage(true);
    } else {
      handleClose()();
    }
  }, [open, openMessage, setOpenMessage, handleClose]);

  const handleConfirmMessage = useCallback(() => {
    setOpenMessage(false);
    handleClose()();
  }, [setOpenMessage]);

  return (
    <>
      <Dialog
        onClose={handleToggle}
        maxWidth='lg'
        open={Boolean(open)}
        classes={{ root: styles.modal }}
      >
        <DialogCloseIcon onClick={handleToggle} />
        <DialogTitle>
          <span className='title'>
            {modalType === 'add' ? 'Add new job' : 'Edit job'}
          </span>
        </DialogTitle>
        <DialogContent classes={{ root: styles.content }}>
          <AddOrEditJobForm
            onClose={handleConfirmMessage}
            onCancel={handleToggle}
            companyId={companyId}
            vacancies={vacancies}
            vacancyToEdit={vacancyToEdit}
            modalType={modalType}
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
