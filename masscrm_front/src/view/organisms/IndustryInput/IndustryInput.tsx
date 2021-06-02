import React, { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchInput } from 'src/view/organisms';
import { getIndustries, fetchIndustriesList } from 'src/store/slices';

interface IProps {
  className: string;
  value: string;
  onChange: Function;
  errorMessage?: string;
}

export const IndustryInput: FC<IProps> = ({
  className,
  value,
  onChange,
  errorMessage
}) => {
  const industries = useSelector(getIndustries);

  const industryItems = industries.map(({ name }) => name);

  const dispatch = useDispatch();

  const onChangeIndustry = useCallback(
    val => {
      onChange({ industry: val });
    },
    [onChange]
  );

  useEffect(() => {
    !industries.length && dispatch(fetchIndustriesList());
  }, []);

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
