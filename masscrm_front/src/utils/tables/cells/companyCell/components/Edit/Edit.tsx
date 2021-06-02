import React, { FC, useContext, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Check, Close } from '@material-ui/icons';
import { CommonIcon } from 'src/view/atoms';
import {
  getAddContactList,
  updateCompany,
  updateContact,
  getFilterSettings
} from 'src/store/slices';
import { ContactCompany } from 'src/view/organisms';
import { ICompany, ICompanyCell } from 'src/interfaces';
import { ErrorsEmitterContext } from 'src/contexts';
import { DoubleClickError } from 'src/utils';
import { SNACKBAR_ERRORS } from 'src/constants';
import { useStyles } from './Edit.styles';

interface IProps {
  handleClose: () => void;
}

export const Edit: FC<ICompanyCell & IProps> = ({
  id,
  value = [],
  type = '',
  handleClose,
  contactID
}) => {
  const styles = useStyles();

  const { errorsEventEmitter } = useContext(ErrorsEmitterContext);

  const dispatch = useDispatch();

  const filter = useSelector(getFilterSettings);

  const [val, setVal] = useState(value);

  const getCurrentType = useCallback(
    (typeArg: string) => {
      const companyTypes: { [index: string]: string } = {
        Subsidiary: 'Holding',
        Holding: 'Subsidiary',
        default: ''
      };

      return companyTypes[typeArg] || 'default';
    },
    [type]
  );

  const onSubmitHandler = () => {
    const companyChose: number = val.map(({ id: idCompany }) => idCompany)?.[0];

    const errorShow = (errors: string) => {
      errorsEventEmitter.emit(SNACKBAR_ERRORS, {
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
    <div className={styles.cellEdit}>
      <ContactCompany
        name='subsidiaries'
        onSelect={onChangeHandler}
        placeholder={getCurrentType(type) || 'Company'}
        type={getCurrentType(type) ? [getCurrentType(type)] : undefined}
      />
      <div className={styles.cellEditBtn}>
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
