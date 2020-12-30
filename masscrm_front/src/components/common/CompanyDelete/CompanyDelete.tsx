import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { deleteCompany } from 'src/actions';
import { CancelEditModal } from 'src/components/common';
import { IContactResult } from 'src/interfaces';

interface ICompanyDelete {
  open: boolean;
  handleClose: Function;
  relatedContacts: Array<IContactResult>;
  handleSetOpenMessage: Function;
  id: number;
}

export const CompanyDelete: FC<ICompanyDelete> = ({
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
      handleSetOpenMessage();
    } else {
      deleteCompany(id).then(() => history.push('/'));
    }
  }, [handleClose, relatedContacts]);

  const handleCancelEditModalClose = useCallback(() => handleClose(), [
    handleClose
  ]);

  return (
    <CancelEditModal
      open={open}
      onClose={handleCancelEditModalClose}
      onConfirm={handleDeleteCompany}
      message='Are you sure you want to delete the company?'
    />
  );
};
