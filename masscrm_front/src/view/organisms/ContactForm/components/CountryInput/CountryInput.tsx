import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchInput } from 'src/view/organisms';
import { getCountries, getCountryList } from 'src/store/slices';
import { ICountry } from 'src/interfaces';
import { findSubstr } from 'src/utils';

interface IProps {
  className: string;
  value: string;
  onChange: Function;
  required?: boolean;
  errorMessage?: string;
}

export const CountryInput: FC<IProps> = ({
  className,
  value,
  onChange,
  required,
  errorMessage
}) => {
  const countries = useSelector(getCountries);

  const [matchedCountries, setMatchedCountries] = useState<ICountry[]>(
    countries
  );

  const dispatch = useDispatch();

  const countryItems = matchedCountries.map(({ name }: ICountry) => name);

  const getCountryCode = (country: string) => {
    return country
      ? countries.find(({ name }: ICountry) => findSubstr(name, country))?.code
      : 0;
  };

  const onSelectHandler = useCallback(
    (val: string) => {
      const trimmedValue = val && val.trim();

      onChange({
        country: trimmedValue || '',
        countryCode: getCountryCode(trimmedValue) || '',
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

    if (value) {
      onChange({
        countryCode: getCountryCode(value)
      });
    }
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
