import React, { FC, useCallback, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { ICompanyFormInputs, Open } from 'src/interfaces';
import { CancelEditModal } from 'src/view/modals';
import { CLOSE_FORM_CONFIRM } from 'src/constants';
import { Form } from './components';
import { useStyles } from './CompanyModal.styles';

interface IProps {
  handleClose: () => void;
  open: Open;
  company?: ICompanyFormInputs;
  onSubmitSuccess?: Function;
}

export const CompanyModal: FC<IProps> = ({
  handleClose,
  open,
  company,
  ...props
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
    return handleClose();
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
        open={!!open}
        classes={{ root: styles.modal }}
      >
        <DialogTitle>
          <span className='title'>Edit company</span>
        </DialogTitle>
        <DialogContent classes={{ root: styles.content }}>
          <Form
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
        message={CLOSE_FORM_CONFIRM}
      />
    </>
  );
};
