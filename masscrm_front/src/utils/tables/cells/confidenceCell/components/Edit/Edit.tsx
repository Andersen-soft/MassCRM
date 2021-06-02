import React, { FC, useContext, useState } from 'react';
import { Check, Close } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { SliderRange, CommonIcon } from 'src/view/atoms';
import {
  getAddContactList,
  updateContact,
  getFilterSettings
} from 'src/store/slices';
import { ErrorsEmitterContext } from 'src/contexts';
import { DoubleClickError } from 'src/utils';
import { IConfidenceCell } from 'src/interfaces';
import { SNACKBAR_ERRORS } from 'src/constants';
import { useStyles } from './Edit.styles';

interface IProps {
  handleClose: () => void;
}

export const Edit: FC<IConfidenceCell & IProps> = ({
  id,
  value = 0,
  handleClose
}) => {
  const styles = useStyles();

  const { errorsEventEmitter } = useContext(ErrorsEmitterContext);

  const dispatch = useDispatch();

  const filter = useSelector(getFilterSettings);

  const [val, setVal] = useState(value);

  const onSubmitHandler = () =>
    updateContact({ confidence: val }, id)
      .then(() => dispatch(getAddContactList(filter)))
      .catch(errors => {
        errorsEventEmitter.emit(SNACKBAR_ERRORS, {
          errorsArray: [DoubleClickError(errors)]
        });
      });

  const onChangeHandler = (newVal: number) => {
    setVal(newVal);
  };

  return (
    <div className={styles.cellEdit}>
      <div className={styles.cellInput}>
        <SliderRange
          min={0}
          max={100}
          value={val}
          onChange={onChangeHandler}
          name='Confidence'
        />
      </div>
      <div className={styles.cellEditInput}>
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
