import React, { ChangeEvent, FC, useContext, useState } from 'react';
import { Check, Close } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { CommonIcon, CustomTextarea } from 'src/view/atoms';
import {
  getAddContactList,
  updateContact,
  getFilterSettings
} from 'src/store/slices';
import { ErrorsEmitterContext } from 'src/contexts';
import { DoubleClickError } from 'src/utils';
import { ICommentCell } from 'src/interfaces';
import { SNACKBAR_ERRORS } from 'src/constants';
import { useStyles } from './Edit.styles';

interface IProps {
  handleClose: () => void;
}

export const Edit: FC<ICommentCell & IProps> = ({
  id,
  value = '',
  handleClose
}) => {
  const styles = useStyles();

  const { errorsEventEmitter } = useContext(ErrorsEmitterContext);

  const dispatch = useDispatch();

  const filter = useSelector(getFilterSettings);

  const [val, setVal] = useState<string>(value);

  const onSubmitHandler = () =>
    updateContact({ comment: val }, id)
      .then(() => dispatch(getAddContactList(filter)))
      .catch(errors => {
        errorsEventEmitter.emit(SNACKBAR_ERRORS, {
          errorsArray: [DoubleClickError(errors)]
        });
      });

  const onChangeHandler = ({
    target: { value: newVal }
  }: ChangeEvent<HTMLTextAreaElement>) => {
    setVal(newVal);
  };

  return (
    <div className={styles.edit}>
      <CustomTextarea
        className={styles.editText}
        value={val || ''}
        onChange={onChangeHandler}
      />
      <div className={styles.editBtn}>
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
    </div>
  );
};
