import React, { ChangeEvent, FC, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Check, Close } from '@material-ui/icons';
import { CommonIcon, CommonInput } from 'src/components/common';
import { getAddContactList, updateContact, getContact } from 'src/actions';
import { getFilterSettings } from 'src/selectors';
import { styleNames } from 'src/services';
import { SOCIALS_REG_EXP } from 'src/constants/form';
import { ErrorEmitterContext } from 'src/context';
import style from '../cell.scss';
import { INetworkCell, INetworkEdit } from './interfaces/INetworkCell';
import { checkUrl } from '../../../form/chekUrl';
import { createErrorsObject } from '../../../errors';

const sn = styleNames(style);

export const NetworkEdit: FC<INetworkCell & INetworkEdit> = ({
  id,
  value = [],
  handleClose
}) => {
  const dispatch = useDispatch();
  const { errorsEventEmitter } = useContext(ErrorEmitterContext);
  const filter = useSelector(getFilterSettings);
  const [val, setVal] = useState<string>(value?.map(({ link }) => link)[0]);
  const [error, setError] = useState<string>('');

  const errorCallback = (inputValue: string) => (errors: string) => {
    const parseError = JSON.parse(errors);
    const createError = (title: string[]) => (data: any) => {
      const errorsObject = createErrorsObject(title, data);
      errorsEventEmitter.emit('popUpErrors', {
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
    } else {
      setError('');
    }
  };

  return (
    <div className={sn('cell-edit')}>
      <CommonInput
        value={val}
        onChangeValue={onChangeHandler}
        errorMessage={error}
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
