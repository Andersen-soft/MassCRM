import React, { FC, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { getOriginsFilter } from 'src/store/slices';
import { CustomSelect } from 'src/view/atoms';

interface IProps {
  className: string;
  value: string;
  onChange: Function;
}

export const OriginInput: FC<IProps> = ({ className, value, onChange }) => {
  const origins = useSelector(getOriginsFilter);

  const onChangeOrigin = useCallback(val => onChange('origin', val), [
    onChange
  ]);

  return (
    <div className={className}>
      <CustomSelect
        name='origin'
        value={value}
        items={origins}
        onChange={onChangeOrigin}
        multi
        placeholder='Origin'
      />
    </div>
  );
};
