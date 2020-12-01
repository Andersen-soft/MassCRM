import React, { FC, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { getOriginsFilter } from 'src/selectors';
import { CustomSelect } from 'src/components/common/CustomSelect';

export const OriginInput: FC<{
  className: string;
  value: string;
  onChange: Function;
}> = ({ className, value, onChange }) => {
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
