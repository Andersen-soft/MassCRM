import React, { useState, memo, useEffect, useContext } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { deleteInactiveUser } from 'src/actions/user.action';
import { getErrors } from 'src/selectors';
import { ErrorEmitterContext } from 'src/context';
import { dialogStyle } from './DeleteUser.style';
import { CommonButton } from '../CommonButton';
import { CommonAlert } from '../CommonAlert';

export const DeleteUser = memo<{
  id?: number;
  fetchUsers?: () => void;
}>(({ id = 0 }) => {
  const style = dialogStyle();

  const errorsText = useSelector(getErrors);
  const { errorsEventEmitter } = useContext(ErrorEmitterContext);

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    if (errorsText) {
      setAlert(Boolean(errorsText?.length));
    }
  }, [errorsText]);

  const toggleModal = () => {
    setOpen(prev => !prev);
  };

  const toggleAlert = () => {
    setAlert(prev => !prev);
  };

  const deleteUser = async () => {
    dispatch(deleteInactiveUser(id, errorsEventEmitter));
    toggleModal();
  };

  return (
    <>
      <DeleteIcon onClick={toggleModal} className={style.deleteIcon} />
      <Dialog classes={{ root: style.dialog }} open={open}>
        <p className={style.modalText}>
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
