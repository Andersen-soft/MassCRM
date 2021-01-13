import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCitiesListByRegion } from 'src/actions';
import { getCity } from 'src/selectors';
import { SearchInput } from 'src/components/common/SearchInput';
import { ICity } from 'src/interfaces';
import { findSubstr } from 'src/utils/string';

export const CityInput: FC<{
  className: string;
  value: string;
  regionCode: string;
  onChange: Function;
}> = ({ className, value, regionCode, onChange }) => {
  const cities = useSelector(getCity);
  const [matchedCities, setMatchedCities] = useState<ICity[]>(cities);
  const cityItems = matchedCities.map(({ name }: ICity) => name);

  const dispatch = useDispatch();

  const onChangeHandler = useCallback(
    (val: string) => {
      const trimmedValue = val && val.trim();

      const foundedCities = trimmedValue
        ? cities.filter(({ name }: ICity) => findSubstr(name, trimmedValue))
        : cities;

      setMatchedCities(foundedCities);
    },
    [cities]
  );

  const onSelectHandler = useCallback(
    (val: string) => {
      onChange('city', val ? val.trim() : '');
    },
    [cities]
  );

  useEffect(() => {
    regionCode && dispatch(getCitiesListByRegion(regionCode));
  }, [regionCode]);

  useEffect(() => {
    setMatchedCities(cities);
  }, [cities]);

  return (
    <div className={className}>
      <SearchInput
        name='city'
        value={value}
        placeholder='City'
        items={cityItems}
        onChange={onChangeHandler}
        onSelect={onSelectHandler}
        disabled={!regionCode}
      />
    </div>
  );
};
