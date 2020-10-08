import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Check, Close } from '@material-ui/icons';
import { CommonIcon, CustomSelect } from 'src/components/common';
import { getAddContactList, updateContact } from 'src/actions';
import { getFilterSettings, getOriginsFilter } from 'src/selectors';
import { styleNames } from 'src/services';
import { IOriginCell, IOriginEdit } from './interfaces/IOriginCell';
import style from '../cell.scss';

const sn = styleNames(style);

export const OriginEdit: FC<IOriginCell & IOriginEdit> = ({
  id,
  value = [],
  handleClose
}) => {
  const dispatch = useDispatch();
  const origins = useSelector(getOriginsFilter);
  const filter = useSelector(getFilterSettings);
  const [val, setVal] = useState<string[]>(value);
  const onSubmitHandler = () =>
    updateContact({ origin: val }, id).then(() =>
      dispatch(getAddContactList(filter))
    );

  const onChangeHandler = (newVal: string[]) => {
    setVal(newVal);
  };

  return (
    <div className={sn('cell-edit')}>
      <CustomSelect
        name='origin'
        value={val}
        items={origins || []}
        onChange={onChangeHandler}
        multi
        placeholder='Origin'
      />
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
