import React, { FC, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { getCompanyTypesFilter } from 'src/selectors';
import { CustomSelect } from 'src/components/common/CustomSelect';

export const CompanyTypeInput: FC<{
  value: string;
  onChange: Function;
  name: string;
}> = ({ value, onChange, name }) => {
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