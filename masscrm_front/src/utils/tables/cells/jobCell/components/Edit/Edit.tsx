import React, { FC, useContext, useState } from 'react';
import { Check, Close } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAddContactList,
  updateCompany,
  getFilterSettings
} from 'src/store/slices';
import { CommonIcon } from 'src/view/atoms';
import { ContactsJobs, IJobCell } from 'src/interfaces';
import { ErrorsEmitterContext } from 'src/contexts';
import { ContactJobInput } from 'src/view/organisms';
import { DoubleClickError, checkJobUrl } from 'src/utils';
import { SNACKBAR_ERRORS } from 'src/constants';
import { useStyles } from './Edit.styles';

interface IProps {
  handleClose: () => void;
}

export const Edit: FC<IJobCell & IProps> = ({
  idContact,
  companyId,
  value = [],
  handleClose
}) => {
  const styles = useStyles();

  const { errorsEventEmitter } = useContext(ErrorsEmitterContext);

  const [val, setVal] = useState<ContactsJobs>(value);

  const dispatch = useDispatch();

  const filter = useSelector(getFilterSettings);

  const onSubmitHandler = () =>
    updateCompany(companyId, { vacancies: val.map(checkJobUrl) }, idContact)
      .then(() => dispatch(getAddContactList(filter)))
      .catch((errors: string) => {
        errorsEventEmitter.emit(SNACKBAR_ERRORS, {
          errorsArray: [DoubleClickError(errors)]
        });
      });

  const onChangeHandler = (_: string, newVal: ContactsJobs) => {
    setVal(newVal);
  };

  return (
    <div className={styles.cellEdit}>
      <div className={styles.cellInput}>
        <ContactJobInput vacancies={val || []} onChange={onChangeHandler} />
      </div>
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
