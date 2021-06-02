import React, { FC, useCallback, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { ContactsJobs, IContactJobValues } from 'src/interfaces';
import { DialogCloseIcon } from 'src/view/atoms';
import { CancelEditModal } from 'src/view/modals';
import { CLOSE_FORM_CONFIRM } from 'src/constants';
import { AddOrEditJobForm } from './components';
import { useStyles } from './AddOrEditJobModal.styles';

interface IProps {
  vacancies?: ContactsJobs;
  handleClose: () => () => void;
  open: boolean;
  modalType: string;
  companyId: number;
  vacancyToEdit: IContactJobValues;
}

export const AddOrEditJobModal: FC<IProps> = ({
  vacancies,
  handleClose,
  open,
  modalType,
  companyId,
  vacancyToEdit
}) => {
  const styles = useStyles();

  const [openMessage, setOpenMessage] = useState(false);

  const handleCloseMessage = useCallback(() => {
    setOpenMessage(false);
  }, [setOpenMessage]);

  const handleToggle = useCallback(() => {
    if (open && !openMessage) {
      return setOpenMessage(true);
    }
    return handleClose()();
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
        open={open}
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
        message={CLOSE_FORM_CONFIRM}
      />
    </>
  );
};
