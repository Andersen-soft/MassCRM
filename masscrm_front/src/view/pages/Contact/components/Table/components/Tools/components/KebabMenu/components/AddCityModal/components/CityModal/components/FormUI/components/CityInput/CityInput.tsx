import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchInput } from 'src/view/organisms';
import { getCity, getCitiesListByRegion } from 'src/store/slices';
import { findSubstr } from 'src/utils';
import { IFormItem } from 'src/interfaces';

interface IProps {
  fieldName: string;
  value: string;
  regionCode: string;
  onChange: Function;
  errorMessage?: string;
  locationValue: IFormItem;
}

export const CityInput: FC<IProps> = ({
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

  const [matchedItems, setMatchedItems] = useState<string[]>([]);

  const onChangeCity = useCallback(
    (city: string) => {
      const trimmedValue = city && city.trim();

      const foundedItems = trimmedValue
        ? cityItems.filter((name: string) => findSubstr(name, trimmedValue))
        : cityItems;

      setMatchedItems(foundedItems);

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

  useEffect(() => {
    setMatchedItems(cityItems);
  }, [cities]);

  return (
    <>
      <SearchInput
        width='230px'
        name={fieldName}
        isScrollForm
        value={value}
        placeholder='City'
        items={matchedItems}
        onChange={onChangeCity}
        disabled={!regionCode}
        errorMessage={errorMessage}
      />
    </>
  );
};
