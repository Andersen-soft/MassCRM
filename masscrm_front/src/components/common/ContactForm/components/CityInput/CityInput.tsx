import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCitiesListByRegion } from 'src/actions';
import { getCity } from 'src/selectors';
import { SearchInput } from 'src/components/common/SearchInput';

export const CityInput: FC<{
  className: string;
  value: string;
  regionCode: string;
  onChange: Function;
}> = ({ className, value, regionCode, onChange }) => {
  const dispatch = useDispatch();
  const cities = useSelector(getCity);
  const cityItems = cities.map(({ name }) => name);

  useEffect(() => {
    regionCode && dispatch(getCitiesListByRegion(regionCode));
  }, [regionCode]);

  return (
    <div className={className}>
      <SearchInput
        name='city'
        value={value}
        placeholder='City'
        items={cityItems}
        onChange={onChange}
        disabled={!regionCode}
      />
    </div>
  );
};
