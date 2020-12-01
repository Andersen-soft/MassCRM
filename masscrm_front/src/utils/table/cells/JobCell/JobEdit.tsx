import React, { FC, useContext, useState } from 'react';
import { Check, Close } from '@material-ui/icons';
import { CommonIcon, ContactJobInput } from 'src/components/common';
import { styleNames } from 'src/services';
import { IContactsJobs } from 'src/interfaces/IContactJobInput';
import { useDispatch, useSelector } from 'react-redux';
import { getAddContactList, updateCompany } from 'src/actions';
import { getFilterSettings } from 'src/selectors';
import { ErrorEmitterContext } from 'src/context';
import { IJobCell, INotesEdit } from './IJobCell';
import style from '../cell.scss';
import { DoubleClickError } from '../../../errors';
import { checkJobUrl } from '../../../form/chekUrl';

const sn = styleNames(style);

export const JobEdit: FC<IJobCell & INotesEdit> = ({
  idContact,
  companyId,
  value = [],
  handleClose
}) => {
  const { errorsEventEmitter } = useContext(ErrorEmitterContext);
  const [val, setVal] = useState<IContactsJobs>(value);
  const dispatch = useDispatch();
  const filter = useSelector(getFilterSettings);
  const onSubmitHandler = () =>
    updateCompany(companyId, { vacancies: val.map(checkJobUrl) }, idContact)
      .then(() => dispatch(getAddContactList(filter)))
      .catch(errors => {
        errorsEventEmitter.emit('snackBarErrors', {
          errorsArray: [DoubleClickError(errors)]
        });
      });

  const onChangeHandler = (fieldName: string, newVal: IContactsJobs) => {
    setVal(newVal);
  };

  return (
    <div className={sn('cell-edit')}>
      <div className={sn('cell-input')}>
        <ContactJobInput vacancies={val || []} onChange={onChangeHandler} />
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
