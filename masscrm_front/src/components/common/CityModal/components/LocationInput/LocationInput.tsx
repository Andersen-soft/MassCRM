import React, { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries, getRegion } from 'src/selectors';
import { SearchInput } from 'src/components/common/SearchInput';
import { ICountry, IRegion } from 'src/interfaces';
import { getCitiesListByRegion, getRegionListByCountry } from 'src/actions';
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
  const getAutoComplete = () =>
    isCountry
      ? countries.map(({ name }) => name)
      : regions.map(({ name }) => name);

  const onChangeCountry = useCallback(
    (val: string) => {
      const countryItem = countries?.find(({ name }: ICountry) => name === val);
      const regionItem = regions?.find(({ name }: IRegion) => name === val);

      onChange({
        country: isCountry ? val : locationValue?.country,
        countryCode: countryItem?.code || locationValue?.countryCode,
        countryId: countryItem?.id || locationValue?.countryId,
        region: !isCountry ? val : '',
        regionCode: regionItem?.code || '',
        regionId: regionItem?.id || '',
        city: ''
      });
      regionItem?.code && dispatch(getCitiesListByRegion(regionItem.code));
    },
    [countries, regions]
  );

  useEffect(() => {
    countryCode && dispatch(getRegionListByCountry(countryCode));
  }, [countryCode]);

  return (
    <div>
      <SearchInput
        width='230px'
        name={fieldName}
        isScrollForm
        value={value}
        required={required}
        placeholder={placeholder}
        items={getAutoComplete()}
        disabled={!countryCode && !isCountry}
        onChange={onChangeCountry}
        errorMessage={errorMessage}
      />
    </div>
  );
};
