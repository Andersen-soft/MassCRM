import React, { ChangeEvent, FC, useState } from 'react';
import { Check, Close } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { CommonIcon, Gender } from 'src/components/common';
import { getAddContactList, updateContact } from 'src/actions';
import { getFilterSettings } from 'src/selectors';
import { styleNames } from 'src/services';
import { IGenderCell, IGenderEdit } from './interfaces';
import style from './GenderCell.scss';

const sn = styleNames(style);

export const GenderEdit: FC<IGenderCell & IGenderEdit> = ({
  id,
  value = '',
  handleClose
}) => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilterSettings);
  const [val, setVal] = useState<string>(value);

  const onSubmitHandler = () =>
    updateContact({ gender: val }, id).then(() =>
      dispatch(getAddContactList(filter))
    );

  const onChangeHandler = ({
    target: { value: newVal }
  }: ChangeEvent<HTMLInputElement>) => {
    setVal(newVal);
  };

  return (
    <div className={sn('wrap')}>
      <div className={sn('gender')}>
        <Gender onChangeHandler={onChangeHandler} value={val} />
      </div>
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
  );
};
