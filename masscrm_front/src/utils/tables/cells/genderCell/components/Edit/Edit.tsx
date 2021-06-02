import React, { ChangeEvent, FC, useContext, useState } from 'react';
import { Check, Close } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { CommonIcon, Gender } from 'src/view/atoms';
import {
  getAddContactList,
  updateContact,
  getFilterSettings
} from 'src/store/slices';
import { ErrorsEmitterContext } from 'src/contexts';
import { DoubleClickError } from 'src/utils';
import { IGenderCell } from 'src/interfaces';
import { SNACKBAR_ERRORS } from 'src/constants';
import { useStyles } from './Edit.styles';

interface IProps {
  handleClose: () => void;
}

export const Edit: FC<IGenderCell & IProps> = ({
  id,
  value = '',
  handleClose
}) => {
  const styles = useStyles();

  const { errorsEventEmitter } = useContext(ErrorsEmitterContext);

  const dispatch = useDispatch();

  const filter = useSelector(getFilterSettings);

  const [val, setVal] = useState(value);

  const onSubmitHandler = () =>
    updateContact({ gender: val }, id)
      .then(() => dispatch(getAddContactList(filter)))
      .catch((errors: string) => {
        errorsEventEmitter.emit(SNACKBAR_ERRORS, {
          errorsArray: [DoubleClickError(errors)]
        });
      });

  const onChangeHandler = ({
    target: { value: newVal }
  }: ChangeEvent<HTMLInputElement>) => {
    setVal(newVal);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.gender}>
        <Gender onChangeHandler={onChangeHandler} value={val} />
      </div>
      <CommonIcon
        onClick={onSubmitHandler}
        IconComponent={Check}
        fontSize='large'
        className={styles.icon}
      />
      <CommonIcon
        IconComponent={Close}
        onClick={handleClose}
        fontSize='large'
        className={styles.icon}
      />
    </div>
  );
};
