import React, { FC, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getCompanySizeFilter } from 'src/selectors';
import { SearchInput } from 'src/components/common/SearchInput';
import { ICompanySize } from 'src/interfaces';

export const CompanySizeInput: FC<{
  className: string;
  value: string;
  onChange: Function;
}> = ({ className, value, onChange }) => {
  const companySizeFilter = useSelector(getCompanySizeFilter);
  const sizeItems = companySizeFilter.map(({ name }) => name);

  const onChangeSize = useCallback(
    val => {
      onChange({ companySize: val });
    },
    [onChange]
  );

  useEffect(() => {
    const { min: min_employees, max: max_employees } =
      companySizeFilter?.find(
        ({ name, min }: ICompanySize) => name === value || Number(value) >= min
      ) ?? {};
    onChange({ min_employees, max_employees });
  }, [value]);

  return (
    <div className={className}>
      <SearchInput
        name='companySize'
        value={value}
        placeholder='Company size'
        items={sizeItems}
        onChange={onChangeSize}
      />
    </div>
  );
};
