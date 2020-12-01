import React, { FC, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { getIndustries } from 'src/selectors';
import { SearchInput } from 'src/components/common/SearchInput';

export const IndustryInput: FC<{
  className: string;
  value: string;
  onChange: Function;
  errorMessage?: string;
}> = ({ className, value, onChange, errorMessage }) => {
  const industries = useSelector(getIndustries);
  const industryItems = industries.map(({ name }) => name);

  const onChangeIndustry = useCallback(
    val => {
      onChange({ industry: val });
    },
    [onChange]
  );

  return (
    <div className={className}>
      <SearchInput
        name='industry'
        value={value}
        items={industryItems}
        onChange={onChangeIndustry}
        multi
        placeholder='Industry'
        required
        errorMessage={errorMessage}
      />
    </div>
  );
};
