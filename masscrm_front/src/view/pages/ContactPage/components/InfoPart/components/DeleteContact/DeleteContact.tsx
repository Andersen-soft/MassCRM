import React, { FC, useCallback, useState } from 'react';
import { Dialog } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { CommonButton } from 'src/view/atoms';
import { deleteContactList } from 'src/store/slices';
import { DefaultPopup } from 'src/view/molecules';
import { DELETE_CONTACT_CONFIRM } from 'src/constants';

interface IProps {
  id: number;
}

export const DeleteContact: FC<IProps> = ({ id }) => {
  const history = useHistory();

  const [confirm, setConfirm] = useState(false);

  const toggleConfirm = useCallback(() => setConfirm(val => !val), [
    setConfirm
  ]);

  const deleteData = useCallback(
    () => deleteContactList([id]).then(() => history.push('/')),
    [deleteContactList, id]
  );

  return (
    <>
      <CommonButton text='Delete page' onClickHandler={toggleConfirm} />
      {confirm && (
        <Dialog open={confirm}>
          <DefaultPopup
            questionMessage={DELETE_CONTACT_CONFIRM}
            onClose={toggleConfirm}
            onConfirm={deleteData}
          />
        </Dialog>
      )}
    </>
  );
};
