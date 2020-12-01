import React, { FC, useCallback, useState } from 'react';
import { Dialog } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { CommonButton, DefaultPopUp } from 'src/components/common';
import { deleteContactList } from 'src/actions';

export const DeleteContact: FC<{ id: number }> = ({ id }) => {
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
          <DefaultPopUp
            questionMessage='Are you sure you want to delete this contact?'
            onClose={toggleConfirm}
            onConfirm={deleteData}
          />
        </Dialog>
      )}
    </>
  );
};
