import React, { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCitiesListByRegion } from 'src/actions';
import { getCity } from 'src/selectors';
import { SearchInput } from 'src/components/common/SearchInput';
import { IFormItem } from '../../interfaces';

export const CityInput: FC<{
  fieldName: string;
  value: string;
  regionCode: string;
  onChange: Function;
  errorMessage?: string;
  locationValue: IFormItem;
}> = ({
  fieldName,
  value,
  regionCode,
  onChange,
  errorMessage,
  locationValue: { country, region, countryCode, countryId, regionId }
}) => {
  const dispatch = useDispatch();
  const cities = useSelector(getCity);

  const cityItems = cities.map(({ name }) => name);

  const onChangeCity = useCallback(
    (city: string) => {
      onChange({
        city,
        cities,
        country,
        region,
        countryCode,
        countryId,
        regionId,
        regionCode
      });
    },
    [value, regionCode, cities]
  );

  useEffect(() => {
    regionCode && dispatch(getCitiesListByRegion(regionCode));
  }, [regionCode]);

  return (
    <>
      <SearchInput
        width='230px'
        name={fieldName}
        isScrollForm
        value={value}
        placeholder='City'
        items={cityItems}
        onChange={onChangeCity}
        disabled={!regionCode}
        errorMessage={errorMessage}
      />
    </>
  );
};
