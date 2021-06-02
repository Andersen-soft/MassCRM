import React, { ChangeEvent, FC, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Check, Close } from '@material-ui/icons';
import { CommonIcon, CommonInput } from 'src/view/atoms';
import { INetworkCell } from 'src/interfaces';
import {
  getAddContactList,
  updateContact,
  getContact,
  getFilterSettings
} from 'src/store/slices';
import { POPUP_ERRORS, SOCIALS_REG_EXP } from 'src/constants';
import { ErrorsEmitterContext } from 'src/contexts';
import { checkUrl, createErrorsObject } from 'src/utils';
import { useStyles } from './Edit.styles';

interface IProps {
  handleClose: () => void;
}

export const Edit: FC<INetworkCell & IProps> = ({
  id,
  value = [],
  handleClose
}) => {
  const styles = useStyles();

  const dispatch = useDispatch();

  const { errorsEventEmitter } = useContext(ErrorsEmitterContext);

  const filter = useSelector(getFilterSettings);

  const [val, setVal] = useState(value?.map(({ link }) => link)[0]);
  const [error, setError] = useState('');

  const errorCallback = (inputValue: string) => (errors: string) => {
    const parseError = JSON.parse(errors);
    const createError = (title: string[]) => (data: any) => {
      const errorsObject = createErrorsObject(title, data);
      errorsEventEmitter.emit(POPUP_ERRORS, {
        errorsArray: [JSON.stringify(errorsObject)]
      });
    };

    if (parseError['social_networks.0'] && value) {
      getContact({
        search: {
          social_networks: checkUrl(inputValue),
          skip_responsibility: 1
        }
      }).then(createError(parseError['social_networks.0']));
    }
  };

  const onSubmitHandler = () =>
    !error &&
    updateContact({ social_networks: [checkUrl(val)] }, id)
      .then(() => dispatch(getAddContactList(filter)))
      .catch(errorCallback(val));

  const onChangeHandler = ({
    target: { value: newVal }
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setVal(newVal);
    if (!newVal.match(SOCIALS_REG_EXP)) {
      setError('Invalid format');
      return;
    }
    setError('');
  };

  return (
    <div className={styles.cellEdit}>
      <CommonInput
        value={val}
        onChangeValue={onChangeHandler}
        errorMessage={error}
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
