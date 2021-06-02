import React, { FC, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Check, Close } from '@material-ui/icons';
import { CommonIcon, CustomSelect } from 'src/view/atoms';
import {
  getAddContactList,
  updateCompany,
  getCompanyTypesFilter,
  getFilterSettings
} from 'src/store/slices';
import { ErrorsEmitterContext } from 'src/contexts';
import { DoubleClickError } from 'src/utils';
import { ITypeCompanyCell } from 'src/interfaces';
import { SNACKBAR_ERRORS } from 'src/constants';
import { useStyles } from './Edit.styles';

interface IProps {
  handleClose: () => void;
}

export const Edit: FC<ITypeCompanyCell & IProps> = ({
  id,
  value = '',
  contactID,
  handleClose
}) => {
  const styles = useStyles();

  const { errorsEventEmitter } = useContext(ErrorsEmitterContext);

  const dispatch = useDispatch();

  const types = useSelector(getCompanyTypesFilter);
  const filter = useSelector(getFilterSettings);

  const [val, setVal] = useState(value);

  const onSubmitHandler = () =>
    updateCompany(id, { type: val }, contactID)
      .then(() => dispatch(getAddContactList(filter)))
      .catch(errors => {
        errorsEventEmitter.emit(SNACKBAR_ERRORS, {
          errorsArray: [DoubleClickError(errors)]
        });
      });

  const onChangeHandler = (newVal: string) => {
    setVal(newVal);
  };

  return (
    <div className={styles.cellEdit}>
      <CustomSelect
        name='origin'
        value={val}
        items={types}
        onChange={onChangeHandler}
        placeholder='Company type'
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
