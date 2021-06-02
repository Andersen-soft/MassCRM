import React, { FC } from 'react';
import { CustomSelect } from 'src/view/atoms';

interface IProps {
  value: string;
  onChange: Function;
}

export const ColumnTypeInput: FC<IProps> = ({ value, onChange }) => {
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
