import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Check, Close } from '@material-ui/icons';
import { CommonIcon, CustomSelect } from 'src/components/common';
import { getAddContactList, updateCompany } from 'src/actions';
import { getCompanyTypesFilter, getFilterSettings } from 'src/selectors';
import { styleNames } from 'src/services';
import style from '../cell.scss';
import {
  ITypeCompanyCell,
  ITypeCompanyEdit
} from './interfaces/ITypeCompanyCell';

const sn = styleNames(style);

export const TypeCompanyEdit: FC<ITypeCompanyCell & ITypeCompanyEdit> = ({
  id,
  value = '',
  contactID,
  handleClose
}) => {
  const dispatch = useDispatch();
  const types = useSelector(getCompanyTypesFilter);
  const filter = useSelector(getFilterSettings);
  const [val, setVal] = useState<string>(value);
  const onSubmitHandler = () =>
    updateCompany(id, { type: val }, contactID).then(() =>
      dispatch(getAddContactList(filter))
    );

  const onChangeHandler = (newVal: string) => {
    setVal(newVal);
  };

  return (
    <div className={sn('cell-edit')}>
      <CustomSelect
        name='origin'
        value={val}
        items={types || []}
        onChange={onChangeHandler}
        placeholder='Company type'
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
