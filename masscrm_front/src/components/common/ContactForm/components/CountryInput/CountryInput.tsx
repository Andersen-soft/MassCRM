import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries } from 'src/selectors';
import { SearchInput } from 'src/components/common/SearchInput';
import { ICountry } from 'src/interfaces';
import { findSubstr } from 'src/utils/string';
import { getCountryList } from 'src/actions';

export const CountryInput: FC<{
  className: string;
  value: string;
  onChange: Function;
  required?: boolean;
  errorMessage?: string;
}> = ({ className, value, onChange, required, errorMessage }) => {
  const countries = useSelector(getCountries);
  const [matchedCountries, setMatchedCountries] = useState<ICountry[]>(
    countries
  );

  const dispatch = useDispatch();

  const countryItems = matchedCountries.map(({ name }: ICountry) => name);

  const onSelectHandler = useCallback(
    (val: string) => {
      const trimmedValue = val && val.trim();

      onChange({
        country: trimmedValue || '',
        countryCode: trimmedValue
          ? countries.find(({ name }: ICountry) =>
              findSubstr(name, trimmedValue)
            )?.code
          : 0,
        region: '',
        regionCode: '',
        city: ''
      });
    },
    [countries]
  );

  const onChangeHandler = useCallback(
    (val: string) => {
      const trimmedValue = val && val.trim();

      const foundedCountries = trimmedValue
        ? countries.filter(({ name }: ICountry) =>
            findSubstr(name, trimmedValue)
          )
        : countries;

      setMatchedCountries(foundedCountries);
    },
    [countries]
  );

  useEffect(() => {
    !countries.length && dispatch(getCountryList());
  }, []);

  useEffect(() => {
    setMatchedCountries(countries);
  }, [countries]);

  return (
    <div className={className}>
      <SearchInput
        name='country'
        value={value}
        required={required}
        placeholder='Country'
        items={countryItems}
        onSelect={onSelectHandler}
        onChange={onChangeHandler}
        errorMessage={errorMessage}
      />
    </div>
  );
};
