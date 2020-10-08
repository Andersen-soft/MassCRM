import React, { FC, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Check, Close } from '@material-ui/icons';
import { CommonIcon, ContactCompany } from 'src/components/common';
import { getAddContactList, updateCompany } from 'src/actions';
import { getFilterSettings } from 'src/selectors';
import { styleNames } from 'src/services';
import { ICompany } from 'src/interfaces';
import style from '../cell.scss';
import {
  ISubsidiaryHoldingCell,
  ISubsidiaryHoldingEdit
} from './interfaces/ISubsidiaryHoldingCell';

const sn = styleNames(style);

export const SubsidiaryHoldingEdit: FC<ISubsidiaryHoldingCell &
  ISubsidiaryHoldingEdit> = ({
  id,
  value = [],
  type,
  handleClose,
  contactID
}) => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilterSettings);
  const [val, setVal] = useState<ICompany[]>(value);
  const currentType = useMemo(
    () => (type === 'Subsidiary' ? 'Holding' : 'Subsidiary'),
    [type]
  );
  const onSubmitHandler = () =>
    updateCompany(
      id,
      { subsidiaries: val.map(({ id: idCompany }) => idCompany) },
      contactID
    ).then(() => dispatch(getAddContactList(filter)));

  const onChangeHandler = (newVal?: ICompany) => {
    setVal(newVal ? [newVal] : []);
  };

  return (
    <div className={sn('cell-edit')}>
      <ContactCompany
        name='subsidiaries'
        onSelect={onChangeHandler}
        placeholder={currentType}
        type={[currentType]}
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
