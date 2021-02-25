import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries, getRegion } from 'src/selectors';
import { SearchInput } from 'src/components/common/SearchInput';
import { ICountry, IRegion } from 'src/interfaces';
import { getCitiesListByRegion, getRegionListByCountry } from 'src/actions';
import { findSubstr } from 'src/utils/string';
import { IFormItem } from '../../interfaces';

export const LocationInput: FC<{
  fieldName: string;
  value: string;
  onChange: Function;
  required?: boolean;
  errorMessage?: string;
  countryCode?: string;
  locationValue?: IFormItem;
  placeholder: string;
}> = ({
  fieldName,
  value,
  onChange,
  required,
  errorMessage,
  countryCode,
  locationValue,
  placeholder
}) => {
  const dispatch = useDispatch();
  const countries = useSelector(getCountries);
  const regions = useSelector(getRegion);
  const isCountry = fieldName.includes('country');
  const [matchedItems, setMatchedItems] = useState<string[]>([]);

  const getAllList = () =>
    isCountry
      ? countries.map(({ name }) => name)
      : regions.map(({ name }) => name);

  const onChangeCountry = useCallback(
    (val: string) => {
      const countryItem = countries?.find(({ name }: ICountry) => name === val);
      const regionItem = regions?.find(({ name }: IRegion) => name === val);

      const trimmedValue = val && val.trim();

      const foundedItems = trimmedValue
        ? getAllList().filter((name: string) => findSubstr(name, trimmedValue))
        : getAllList();

      setMatchedItems(foundedItems);

      onChange({
        country: isCountry ? val : locationValue?.country,
        countryCode: isCountry ? countryItem?.code : locationValue?.countryCode,
        countryId: isCountry ? countryItem?.id : locationValue?.countryId,
        region: isCountry ? '' : val,
        regionCode: regionItem?.code || '',
        regionId: regionItem?.id || '',
        city: ''
      });
      regionItem?.code && dispatch(getCitiesListByRegion(regionItem.code));
    },
    [countries, regions, value]
  );

  useEffect(() => {
    countryCode && dispatch(getRegionListByCountry(countryCode));
  }, [countryCode]);

  useEffect(() => {
    setMatchedItems(getAllList());
  }, [countries, regions]);

  return (
    <div>
      <SearchInput
        width='230px'
        name={fieldName}
        isScrollForm
        value={value}
        required={required}
        placeholder={placeholder}
        items={matchedItems}
        disabled={!countryCode && !isCountry}
        onChange={onChangeCountry}
        errorMessage={errorMessage}
      />
    </div>
  );
};
