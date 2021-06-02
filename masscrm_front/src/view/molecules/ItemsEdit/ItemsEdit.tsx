import React, { FC, useState } from 'react';
import { Check, Close } from '@material-ui/icons';
import { CommonIcon, CustomSelect } from 'src/view/atoms';
import { useStyles } from './ItemsEdit.styles';

interface IProps {
  value: string | string[];
  items: string[];
  handleClose: () => void;
  sendData: (value: string | string[]) => void;
  multi?: boolean;
}

export const ItemsEdit: FC<IProps> = ({
  value,
  handleClose,
  items,
  sendData,
  multi
}) => {
  const [val, setVal] = useState<string | string[]>(value);

  const onSubmitHandler = () => sendData(val);

  const onChangeHandler = (newVal: string | string[]) => {
    setVal(newVal);
  };

  const styles = useStyles();

  return (
    <div className={styles.cellEdit}>
      <div className={styles.cellEditSearch}>
        <CustomSelect
          value={val}
          onChange={onChangeHandler}
          multi={multi}
          items={items}
          placeholder='Select data'
        />
      </div>
      <div className={styles.cellEditBtn}>
        <CommonIcon
          onClick={onSubmitHandler}
          IconComponent={Check}
          fontSize='large'
          className={styles.cellIcon}
        />
        <CommonIcon
          IconComponent={Close}
          onClick={handleClose}
          fontSize='large'
          className={styles.cellIcon}
        />
      </div>
    </div>
  );
};
