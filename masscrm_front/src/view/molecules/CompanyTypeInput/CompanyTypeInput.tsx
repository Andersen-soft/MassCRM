import React, { FC, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { getCompanyTypesFilter } from 'src/store/slices';
import { CustomSelect } from 'src/view/atoms';

interface IProps {
  value: string;
  onChange: Function;
  name: string;
}

export const CompanyTypeInput: FC<IProps> = ({ value, onChange, name }) => {
  const companyTypes = useSelector(getCompanyTypesFilter);

  const onChangeType = useCallback(val => onChange(name, val), [onChange]);

  return (
    <CustomSelect
      name={name}
      value={value}
      items={companyTypes}
      onChange={onChangeType}
      placeholder='Type of company'
    />
  );
};
