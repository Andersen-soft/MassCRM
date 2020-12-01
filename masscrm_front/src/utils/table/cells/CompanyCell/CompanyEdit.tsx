import React, { FC, useContext, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Check, Close } from '@material-ui/icons';
import { CommonIcon, ContactCompany } from 'src/components/common';
import { getAddContactList, updateCompany, updateContact } from 'src/actions';
import { getFilterSettings } from 'src/selectors';
import { styleNames } from 'src/services';
import { ICompany } from 'src/interfaces';
import { ErrorEmitterContext } from 'src/context';
import style from '../cell.scss';
import {
  ICompanyCell,
  ISubsidiaryHoldingEdit
} from './interfaces/ICompanyCell';
import { DoubleClickError } from '../../../errors';

const sn = styleNames(style);

export const CompanyEdit: FC<ICompanyCell & ISubsidiaryHoldingEdit> = ({
  id,
  value = [],
  type,
  handleClose,
  contactID
}) => {
  const { errorsEventEmitter } = useContext(ErrorEmitterContext);
  const dispatch = useDispatch();
  const filter = useSelector(getFilterSettings);
  const [val, setVal] = useState<ICompany[]>(value);
  const currentType = useMemo(() => {
    switch (type) {
      case 'Subsidiary':
        return 'Holding';
      case 'Holding':
        return 'Subsidiary';
      default:
        return undefined;
    }
  }, [type]);

  const onSubmitHandler = () => {
    const companyChose: number = val.map(({ id: idCompany }) => idCompany)?.[0];

    const errorShow = (errors: string) => {
      errorsEventEmitter.emit('snackBarErrors', {
        errorsArray: [DoubleClickError(errors)]
      });
    };

    return type !== 'name'
      ? updateCompany(id, { subsidiaries: [companyChose] }, contactID)
          .then(() => dispatch(getAddContactList(filter)))
          .catch(errorShow)
      : updateContact({ company_id: companyChose || id }, contactID)
          .then(() => dispatch(getAddContactList(filter)))
          .catch(errorShow);
  };

  const onChangeHandler = (newVal?: ICompany) => {
    setVal(newVal ? [newVal] : []);
  };

  return (
    <div className={sn('cell-edit')}>
      <ContactCompany
        name='subsidiaries'
        onSelect={onChangeHandler}
        placeholder={currentType || 'Company'}
        type={currentType && [currentType]}
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
