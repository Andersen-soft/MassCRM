import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCitiesListByRegion,
  getRegionListByCountry,
  getRegion
} from 'src/store/slices';
import { IRegion } from 'src/interfaces';
import { SearchInput } from 'src/view/organisms';
import { findSubstr } from 'src/utils';

interface IProps {
  className: string;
  value: string;
  countryCode: string;
  onChange: Function;
}

export const RegionInput: FC<IProps> = ({
  className,
  value,
  countryCode,
  onChange
}) => {
  const dispatch = useDispatch();

  const regions = useSelector(getRegion);

  const [matchedRegions, setMatchedRegions] = useState<IRegion[]>(regions);

  const regionItems = matchedRegions.map(({ name }) => name);

  const onChangeHandler = useCallback(
    (val: string) => {
      const trimmedValue = val && val.trim();

      const foundedRegions = trimmedValue
        ? regions.filter(({ name }: IRegion) => findSubstr(name, trimmedValue))
        : regions;

      setMatchedRegions(foundedRegions);
    },
    [regions]
  );

  const getRegionCode = (region: string) =>
    regions?.find(({ name }: IRegion) => findSubstr(name, region))?.code;

  const onSelectHandler = useCallback(
    (val: string) => {
      const trimmedValue = val && val.trim();

      const regionCode = trimmedValue && getRegionCode(trimmedValue);

      onChange({
        region: val ? val.trim() : '',
        regionCode: trimmedValue ? regionCode : 0,
        city: ''
      });
      regionCode?.length && dispatch(getCitiesListByRegion(regionCode));
    },
    [regions]
  );

  useEffect(() => {
    countryCode && dispatch(getRegionListByCountry(countryCode));
  }, [countryCode]);

  useEffect(() => {
    setMatchedRegions(regions);
    if (value && regions.length && countryCode) {
      onChange({
        regionCode: getRegionCode(value.trim())
      });
    }
  }, [regions]);

  return (
    <div className={className}>
      <SearchInput
        name='region'
        value={value}
        placeholder='Region'
        items={regionItems}
        onChange={onChangeHandler}
        onSelect={onSelectHandler}
        disabled={!countryCode}
      />
    </div>
  );
};
