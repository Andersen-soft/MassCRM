import React, { FC } from 'react';
import { CustomSelect } from 'src/components/common/CustomSelect';

export const ColumnTypeInput: FC<{
  value: string;
  onChange: Function;
}> = ({ value, onChange }) => {
  const onChangeType = (val: string | null) => onChange('type', val);
  const mockData = ['1', '2', '3', '4'];

  return (
    <CustomSelect
      name='type'
      value={value}
      items={mockData}
      onChange={onChangeType}
      placeholder='Column'
    />
  );
};

export default ColumnTypeInput;
