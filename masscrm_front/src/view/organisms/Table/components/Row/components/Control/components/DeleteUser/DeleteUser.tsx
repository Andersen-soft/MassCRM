import React, { useState, memo, useEffect, useContext } from 'react';
import { Dialog } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteInactiveUser, getErrors } from 'src/store/slices';
import { ErrorsEmitterContext } from 'src/contexts';
import { CommonAlert, CommonButton } from 'src/view/atoms';
import { useStyles } from './DeleteUser.styles';

interface IProps {
  userId?: number;
  fetchUsers?: () => void;
}

export const DeleteUser = memo<IProps>(({ userId = 0 }) => {
  const styles = useStyles();

  const errorsText = useSelector(getErrors);
  const { errorsEventEmitter } = useContext(ErrorsEmitterContext);

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    if (errorsText) {
      setAlert(!!errorsText?.length);
    }
  }, [errorsText]);

  const toggleModal = () => {
    setOpen(prev => !prev);
  };

  const toggleAlert = () => {
    setAlert(prev => !prev);
  };

  const deleteUser = async () => {
    dispatch(deleteInactiveUser(userId, errorsEventEmitter));
    toggleModal();
  };

  return (
    <>
      <DeleteIcon
        id={`delete-user${userId}-icon`}
        onClick={toggleModal}
        className={styles.deleteIcon}
      />
      <Dialog classes={{ root: styles.dialog }} open={open}>
        <p className={styles.modalText}>
          Are you sure you want to delete the record?
        </p>
        <div>
          <CommonButton
            size='big'
            color='white'
            text='No'
            onClickHandler={toggleModal}
          />
          <CommonButton
            size='big'
            color='yellow'
            text='Yes'
            onClickHandler={deleteUser}
          />
        </div>
      </Dialog>
      <CommonAlert
        open={alert}
        onClose={toggleAlert}
        errorMessage='Failed to delete user'
        type='error'
      />
    </>
  );
});
