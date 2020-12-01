import React, { FC, useContext, useState } from 'react';
import { Check, Close } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { CommonIcon, SliderRange } from 'src/components/common';
import { getAddContactList, updateContact } from 'src/actions';
import { getFilterSettings } from 'src/selectors';
import { styleNames } from 'src/services';
import { ErrorEmitterContext } from 'src/context';
import style from '../cell.scss';
import { IConfidenceCell, IConfidenceEdit } from './interfaces/IConfidenceCell';
import { DoubleClickError } from '../../../errors';

const sn = styleNames(style);

export const ConfidenceEdit: FC<IConfidenceCell & IConfidenceEdit> = ({
  id,
  value = 0,
  handleClose
}) => {
  const { errorsEventEmitter } = useContext(ErrorEmitterContext);
  const dispatch = useDispatch();
  const filter = useSelector(getFilterSettings);
  const [val, setVal] = useState<number>(value);

  const onSubmitHandler = () =>
    updateContact({ confidence: val }, id)
      .then(() => dispatch(getAddContactList(filter)))
      .catch(errors => {
        errorsEventEmitter.emit('snackBarErrors', {
          errorsArray: [DoubleClickError(errors)]
        });
      });

  const onChangeHandler = (newVal: number) => {
    setVal(newVal);
  };

  return (
    <div className={sn('cell-edit')}>
      <div className={sn('cell-input')}>
        <SliderRange
          min={0}
          max={100}
          value={val}
          onChange={onChangeHandler}
          name='Confidence'
        />
      </div>
      <div className={sn('cell-edit_btn')}>
        <CommonIcon
          onClick={onSubmitHandler}
          IconComponent={Check}
          fontSize='large'
          className={sn('icon')}
        />
        <CommonIcon
          IconComponent={Close}
          onClick={handleClose}
          fontSize='large'
          className={sn('icon')}
        />
      </div>
    </div>
  );
};
