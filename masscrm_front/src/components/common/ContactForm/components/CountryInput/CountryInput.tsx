import React, { FC, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { getCountries } from 'src/selectors';
import { SearchInput } from 'src/components/common/SearchInput';
import { ICountry } from 'src/interfaces';

export const CountryInput: FC<{
  className: string;
  value: string;
  onChange: Function;
  required?: boolean;
  errorMessage?: string;
}> = ({ className, value, onChange, required, errorMessage }) => {
  const countries = useSelector(getCountries);
  const cityItems = countries.map(({ name }) => name);

  const onChangeCountry = useCallback(
    (val: string) => {
      onChange({
        country: val,
        countryCode: countries?.find(({ name }: ICountry) => name === val)
          ?.code,
        region: '',
        regionCode: '',
        city: ''
      });
    },
    [countries]
  );

  return (
    <div className={className}>
      <SearchInput
        name='country'
        value={value}
        required={required}
        placeholder='Country'
        items={cityItems}
        onChange={onChangeCountry}
        errorMessage={errorMessage}
      />
    </div>
  );
};
