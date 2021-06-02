import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { deleteCompany } from 'src/store/slices';
import { CancelEditModal } from 'src/view/modals';
import { IContactResult } from 'src/interfaces';
import { DELETE_COMPANY_CONFIRM } from 'src/constants';

interface IProps {
  open: boolean;
  handleClose: Function;
  relatedContacts: IContactResult[];
  handleSetOpenMessage: Function;
  id: number;
}

export const CompanyDelete: FC<IProps> = ({
  handleClose,
  open,
  relatedContacts,
  handleSetOpenMessage,
  id
}) => {
  const history = useHistory();

  const handleDeleteCompany = useCallback(() => {
    handleClose();

    if (relatedContacts.length) {
      return handleSetOpenMessage();
    }
    return deleteCompany(id).then(() => history.push('/'));
  }, [handleClose, relatedContacts]);

  const handleCancelEditModalClose = useCallback(() => handleClose(), [
    handleClose
  ]);

  return (
    <CancelEditModal
      open={open}
      onClose={handleCancelEditModalClose}
      onConfirm={handleDeleteCompany}
      message={DELETE_COMPANY_CONFIRM}
    />
  );
};
