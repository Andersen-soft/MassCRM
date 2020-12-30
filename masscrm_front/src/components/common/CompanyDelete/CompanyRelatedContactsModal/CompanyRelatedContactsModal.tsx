import React from 'react';
import { Dialog, DialogContent } from '@material-ui/core';
import { styleNames } from 'src/services';
import { DialogCloseIcon } from '../..';

import style from './CompanyRelatedContactsModal.scss';

interface ICancelEditModal {
  open: boolean;
  onClose: () => void;
}

const sn = styleNames(style);

export const CompanyRelatedContactsModal = ({
  open,
  onClose
}: ICancelEditModal) => {
  return (
    <Dialog open={Boolean(open)} onBackdropClick={onClose}>
      <DialogCloseIcon onClick={onClose} />
      <DialogContent>
        <p className={sn('message')}>
          There are related contacts in the company. <br /> You can`t delete the
          company
        </p>
      </DialogContent>
    </Dialog>
  );
};
