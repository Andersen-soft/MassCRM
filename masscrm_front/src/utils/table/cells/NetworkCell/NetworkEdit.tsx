import React, { ChangeEvent, FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Check, Close } from '@material-ui/icons';
import { CommonIcon, CommonInput } from 'src/components/common';
import { getAddContactList, updateContact } from 'src/actions';
import { getFilterSettings } from 'src/selectors';
import { styleNames } from 'src/services';
import { URL_REGEX } from 'src/constants/form';
import style from '../cell.scss';
import { INetworkCell, INetworkEdit } from './interfaces/INetworkCell';

const sn = styleNames(style);

export const NetworkEdit: FC<INetworkCell & INetworkEdit> = ({
  id,
  value = [],
  handleClose
}) => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilterSettings);
  const [val, setVal] = useState<string>(value?.map(({ link }) => link)[0]);
  const [error, setError] = useState<string>();

  const onSubmitHandler = () =>
    !error &&
    updateContact({ social_networks: val }, id).then(() =>
      dispatch(getAddContactList(filter))
    );

  const onChangeHandler = ({
    target: { value: newVal }
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (newVal.match(URL_REGEX)) {
      setVal(newVal);
    } else {
      setError('Invalid format');
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
