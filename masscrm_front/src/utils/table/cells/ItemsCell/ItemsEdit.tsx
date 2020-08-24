import React, { FC, useState } from 'react';
import { Check, Close } from '@material-ui/icons';
import { CommonIcon, CustomSelect } from 'src/components/common';
import { styleNames } from 'src/services';
import { IItemsEdit } from './interfaces';
import style from '../cell.scss';

const sn = styleNames(style);

export const ItemsEdit: FC<IItemsEdit> = ({
  value,
  handleClose,
  items,
  sendData,
  multi
}) => {
  const [val, setVal] = useState<string | Array<string>>(value);

  const onSubmitHandler = () => sendData(val);

  const onChangeHandler = (newVal: string | Array<string>) => {
    setVal(newVal);
  };

  return (
    <div className={sn('cell-edit')}>
      <div className={sn('cell-edit_search')}>
        <CustomSelect
          value={val}
          onChange={onChangeHandler}
          multi={multi}
          items={items}
          placeholder='Select data'
        />
      </div>
      <div className={sn('cell-edit_btn')}>
        <CommonIcon
          onClick={onSubmitHandler}
          IconComponent={Check}
          fontSize='large'
          className={sn('cell-icon')}
        />
        <CommonIcon
          IconComponent={Close}
          onClick={handleClose}
          fontSize='large'
          className={sn('cell-icon')}
        />
      </div>
    </div>
  );
};
