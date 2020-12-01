import React, { FC, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { getCompanyTypesFilter } from 'src/selectors';
import { CustomSelect } from 'src/components/common/CustomSelect';

export const CompanyTypeInput: FC<{
  value: string;
  onChange: Function;
}> = ({ value, onChange }) => {
  const companyTypes = useSelector(getCompanyTypesFilter);

  const onChangeType = useCallback(val => onChange('company_type', val), [
    onChange
  ]);

  return (
    <CustomSelect
      name='company_type'
      value={value}
      items={companyTypes}
      onChange={onChangeType}
      placeholder='Type of company'
    />
  );
};
